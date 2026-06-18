'use client';

import React, { useRef, useState } from 'react';
import { useProfile, useUpdateProfile } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfileCard() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const { data: profile, isLoading, isError } = useProfile();
  const updatemutation = useUpdateProfile();

  const [inputNickname, setInputNickname] = useState('');
  const [confirmedNickname, setConfirmedNickname] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState(null);

  const finalNickname = confirmedNickname || profile?.nickname || '';
  const finalImageUrl = customImageUrl || profile?.profileImageUrl || null;

  const handleFileChange = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const fakeUrl = URL.createObjectURL(file);
    setCustomImageUrl(fakeUrl);
  };

  const handlePatch = async function () {
    if (!inputNickname.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }
    setConfirmedNickname(inputNickname);
    alert('닉네임이 수정되었습니다. 하단의 완료 버튼을 눌러 저장해 주세요.');
  };

  const handleComplete = function () {
    if (!finalNickname.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    updatemutation.mutate(
      {
        nickname: finalNickname,
        profileImageUrl: finalImageUrl,
      },
      {
        onSuccess: () => {
          alert('프로필 수정이 완료되었습니다!');
          router.back();
        },
      }
    );
  };

  if (isLoading)
    return <div className="text-white text-center py-10">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center py-10">프로필 로드 실패</div>
    );

  return (
    <div className="w-full max-w-[800px] mx-auto bg-black text-white p-8 rounded-lg relative min-h-[500px] flex flex-col justify-between">
      <div className="flex flex-col gap-12 mt-8">
        <div className="flex items-center gap-12 pl-12">
          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-700 relative">
            {finalImageUrl ? (
              <Image
                src={finalImageUrl}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="text-gray-400 text-sm">No Image</div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-white text-black font-medium px-6 py-2 rounded-sm hover:bg-gray-200 transition-colors"
          >
            파일 업로드
          </button>
        </div>
        <div className="flex items-center gap-4 w-full max-w-[650px] mx-auto">
          <h1>{finalNickname || profile?.nickname}</h1>
          <input
            type="text"
            value={inputNickname}
            onChange={(e) => setInputNickname(e.target.value)}
            className="flex-1 bg-white text-black px-4 py-3 rounded-sm text-lg font-medium min-h-[52px]"
            placeholder="닉네임을 입력해 주세요"
          />
          <button
            type="button"
            className="bg-white text-black font-medium px-6 py-3 rounded-sm hover:bg-gray-200 transition-colors"
            onClick={handlePatch}
          >
            수정
          </button>
        </div>

        <div className="absolute bottom-8 right-8 flex gap-4">
          <button
            type="button"
            onClick={handleComplete}
            disabled={updatemutation.isPending}
            className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-md text-md hover:bg-yellow-500 disabled:opacity-50 transition-colors"
          >
            {updatemutation.isPending ? '저장 중...' : '완료'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white text-black font-bold px-8 py-3 rounded-md text-md hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
