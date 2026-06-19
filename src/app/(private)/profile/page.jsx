'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  useProfile,
  useUpdateProfile,
  usePointHistory,
} from '@/features/user/hooks/useProfile';
import profileIcon from '@/assets/icons/icon-profile.png';

const POINT_TYPE = {
  RANDOM_BOX: { label: '랜덤 박스', sign: '+' },
  SALE: { label: '판매 수익', sign: '+' },
  PURCHASE: { label: '구매 사용', sign: '-' },
};

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function ProfilePage() {
  const { data: user, isLoading } = useProfile();
  const { mutate: update, isPending } = useUpdateProfile();
  const { data: history = [], isLoading: historyLoading } = usePointHistory();

  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    queueMicrotask(() => {
      setNickname(user.nickname ?? '');
      setImageUrl(user.profileImageUrl ?? '');
    });
  }, [user]);

  // 파일 선택 → 미리보기(브라우저 임시 URL). 실제 업로드 호스팅은 추후 연동.
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImageUrl(preview);
    setMessage('미리보기입니다. 저장하려면 이미지 호스팅 연동이 필요합니다.');
  };

  const handleSave = () => {
    setMessage('');
    update(
      { nickname: nickname.trim(), profileImageUrl: imageUrl || undefined },
      {
        onSuccess: () => {
          setEditing(false);
          setMessage('프로필이 저장되었습니다.');
        },
        onError: (err) => setMessage(err.message),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-300">
        불러오는 중…
      </div>
    );
  }

  const avatar = imageUrl || user?.profileImageUrl || profileIcon;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[560px]">
        <h1 className="text-2xl font-display mb-8">내 프로필</h1>

        {/* 프로필 카드 */}
        <section className="bg-gray-500 rounded-2xl p-6 md:p-8 flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <Image
                src={avatar}
                alt="프로필 이미지"
                width={112}
                height={112}
                className={
                  user?.profileImageUrl ||
                  (imageUrl && !imageUrl.startsWith('blob'))
                    ? 'w-full h-full object-cover'
                    : 'w-14 h-14 object-contain'
                }
                unoptimized={
                  typeof avatar === 'string' && avatar.startsWith('blob')
                }
              />
            </div>
            {editing && (
              <label className="absolute bottom-0 right-0 bg-main text-black text-xs font-bold rounded-full px-2 py-1 cursor-pointer">
                변경
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* 닉네임 */}
          <div className="mt-5 w-full">
            {editing ? (
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-black border border-gray-400 rounded-lg px-4 py-2 text-center text-lg focus:border-main outline-none"
                placeholder="닉네임"
                maxLength={20}
              />
            ) : (
              <p className="text-center text-xl font-display">
                {user?.nickname}
              </p>
            )}
          </div>

          {/* 포인트 잔액 */}
          <div className="mt-4 flex items-center gap-2 text-gray-300">
            <span className="text-sm">보유 포인트</span>
            <span className="text-main font-bold text-lg">
              {(user?.point?.balance ?? 0).toLocaleString()} P
            </span>
          </div>

          {/* 버튼 */}
          <div className="mt-6 w-full">
            {editing ? (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditing(false);
                    setMessage('');
                  }}
                  className="flex-1 py-2 rounded-lg border border-gray-400 text-gray-300 hover:text-white"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex-1 py-2 rounded-lg bg-main text-black font-bold disabled:opacity-50"
                >
                  {isPending ? '저장 중…' : '저장'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full py-2 rounded-lg border border-main text-main font-bold hover:bg-main hover:text-black transition-colors"
              >
                프로필 수정
              </button>
            )}
          </div>

          {message && (
            <p className="mt-3 text-xs text-gray-300 text-center">{message}</p>
          )}
        </section>

        {/* 포인트 내역 */}
        <section className="mt-8">
          <h2 className="text-lg font-display mb-4">포인트 내역</h2>
          {historyLoading ? (
            <p className="text-gray-400 text-sm">불러오는 중…</p>
          ) : history.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center bg-gray-500 rounded-xl">
              아직 포인트 내역이 없습니다.
            </p>
          ) : (
            <ul className="space-y-2">
              {history.map((h) => {
                const meta = POINT_TYPE[h.type] ?? { label: h.type, sign: '' };
                const positive = meta.sign === '+';
                return (
                  <li
                    key={h.id}
                    className="flex items-center justify-between bg-gray-500 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-sm">{meta.label}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(h.createdAt)}
                      </p>
                    </div>
                    <span
                      className={
                        positive
                          ? 'text-main font-bold'
                          : 'text-gray-300 font-bold'
                      }
                    >
                      {meta.sign}
                      {Math.abs(h.amount).toLocaleString()} P
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
