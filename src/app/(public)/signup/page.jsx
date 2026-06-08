'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const trimmedEmail = email.trim();
  const trimmedNickname = nickname.trim();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!trimmedEmail || !trimmedNickname || !password || !passwordConfirm) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (/\s/.test(email)) {
      alert('이메일에는 공백을 사용할 수 없습니다.');
      return;
    }

    if (nickname !== nickname.trim()) {
      alert('닉네임 앞뒤 공백은 사용할 수 없습니다.');
      return;
    }

    if (/\s/.test(password)) {
      alert('비밀번호에는 공백을 사용할 수 없습니다.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          nickname: trimmedNickname,
          password,
          passwordConfirm,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '회원가입에 실패했습니다.');
      }

      alert('회원가입이 완료되었습니다.');
      router.replace('/login');
    } catch (error) {
      console.log(error);
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

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이메일 입력 */}
          <div className=" space-y-[10px]">
            {' '}
            <label className="block text-sm font-bold text-white">이메일</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요"
              className="w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] border border-white rounded-[2px] focus:border-[#eaff00] focus:outline-none text-sm placeholder:text-[#555555]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* 닉네임 입력 */}
          <div className="space-y-[10px]">
            <label className="block text-sm font-bold">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요"
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
                placeholder="8자 이상 입력해 주세요"
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

          {/* 비밀번호 확인 입력 */}
          <div className="space-y-[10px]">
            <label className="block text-sm font-bold">비밀번호 확인</label>
            <div className="relative flex items-center">
              <input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해 주세요"
                className="w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] border border-white rounded-[2px] focus:border-[#eaff00] focus:outline-none text-sm placeholder:text-[#555555]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-neutral-500 hover:text-neutral-300 transition-colors"
                aria-label="비밀번호 확인 보기 토글"
              >
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

          {/* 가입하기 버튼 */}
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-[#eaff00] text-black font-bold rounded text-base hover:bg-[#d8ec00] transition-colors mb-[16px]"
            disabled={loading}
          >
            {loading ? '가입 중...' : '가입하기'}
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

        {/* 하단 링크 */}
        <div className="flex justify-center items-center gap-[10px] text-xs text-neutral-400 mt-8">
          <span>이미 최애의 포토 회원이신가요?</span>
          <Link href="/login" className="text-[#eaff00] font-bold underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
