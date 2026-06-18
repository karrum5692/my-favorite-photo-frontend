'use client';

import React, { useState } from 'react';
import { useProfile } from '../hooks/useUser';

export default function ProfileCard() {
  const { data: profile, isLoading, isError } = useProfile();
  const { nickname, setNickname } = useState('');
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
          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-700">
            <img
              src={profile.user?.profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className="bg-white text-black font-medium px-6 py-2 rounded-sm cursor-not-allowed opacity-80"
          >
            파일 업로드
          </button>
        </div>

        {/* [중단 섹션] 백엔드에서 가져온 진짜 닉네임 보여주기 */}
        <div className="flex items-center gap-4 w-full max-w-[650px] mx-auto">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="flex-1 bg-white text-black px-4 py-3 rounded-sm text-lg font-medium min-h-[52px]"
            placeholder="닉네임을 입력해 주세요"
          />
          <button
            type="button"
            className="bg-white text-black font-medium px-6 py-3 rounded-sm cursor-not-allowed opacity-80"
          >
            수정
          </button>
        </div>

        <div className="absolute bottom-8 right-8 flex gap-4">
          <button
            type="button"
            className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-md text-md cursor-not-allowed opacity-80"
          >
            완료
          </button>
          <button
            type="button"
            className="bg-white text-black font-bold px-8 py-3 rounded-md text-md cursor-not-allowed opacity-80"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
