'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '로그인에 실패했습니다.');
      }

      localStorage.setItem('accessToken', result.accessToken);

      alert('로그인 성공!');
      router.replace('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[520px]">
        {/* 로고 타이틀 */}
        <div className="mb-[60px] flex justify-center">
          <Image
            src="/images/logo.png"
            alt="최애의 포토"
            width={331}
            height={60}
          />
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이메일 입력 */}
          <div className=" space-y-[10px]">
            {' '}
            <label className="block text-sm font-bold text-white">이메일</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="이메일을 입력해 주세요"
              className="w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] border border-white rounded-[2px] focus:border-[#eaff00] focus:outline-none text-sm placeholder:text-[#555555]"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-[10px]">
            <label className="block text-sm font-bold">비밀번호</label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요"
                className="w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] border border-white rounded-[2px] focus:border-[#eaff00] focus:outline-none text-sm placeholder:text-[#555555]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-neutral-500 hover:text-neutral-300 transition-colors"
                aria-label="비밀번호 보기 토글"
              >
                {/* 눈 모양 아이콘 (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-[#eaff00] text-black font-bold rounded text-base hover:bg-[#d8ec00] transition-colors mb-[16px]"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          {/* Google 로그인 버튼 */}
          <button
            type="button"
            className="w-full py-4 bg-white text-black font-bold rounded text-base flex justify-center items-center gap-2.5 hover:bg-neutral-100 transition-colors"
          >
            {/* Google 공식 아이콘 SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google로 시작하기
          </button>
        </form>

        <div className="flex justify-center items-center gap-[10px] text-xs text-neutral-400 mt-8">
          <span>최애의 포토가 처음이신가요?</span>
          <Link href="/signup" className="text-[#eaff00] font-bold underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
