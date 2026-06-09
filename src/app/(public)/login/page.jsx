'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  loginAction,
  googleLoginAction,
} from '../../../features/auth/api/authApi';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({
      email: '',
      password: '',
    });

    setLoading(true);

    const result = await loginAction({ email, password });

    setLoading(false);

    if (!result.success) {
      if (result.alert) {
        alert(result.message);
        return;
      }

      setErrors((prev) => ({
        ...prev,
        [result.field]: result.message,
      }));

      return;
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    await queryClient.invalidateQueries({ queryKey: ['user'] });
    router.push('/');
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  email: '',
                }));
              }}
              type="text"
              placeholder="이메일을 입력해 주세요"
              className={`w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] rounded-[2px] focus:outline-none text-sm placeholder:text-[#555555] ${
                errors.email
                  ? 'border border-red-500'
                  : 'border border-white focus:border-[#eaff00]'
              }`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-[10px]">
            <label className="block text-sm font-bold">비밀번호</label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    password: '',
                  }));
                }}
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요"
                className={`w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] rounded-[2px] focus:outline-none text-sm placeholder:text-[#555555] ${
                  errors.password
                    ? 'border border-red-500'
                    : 'border border-white focus:border-[#eaff00]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-neutral-500 hover:text-neutral-300 transition-colors"
                aria-label="비밀번호 보기 토글"
              >
                <Image
                  src={
                    showPassword
                      ? '/images/open_eye.png'
                      : '/images/close_eye.png'
                  }
                  width={20}
                  height={20}
                  alt={showPassword ? 'open_eye' : 'close_eye'}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
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
            onClick={googleLoginAction}
            className="w-full py-4 bg-white text-black font-bold rounded text-base flex justify-center items-center gap-2.5 hover:bg-neutral-100 transition-colors"
          >
            <Image
              src="/images/google.png"
              width={20}
              height={20}
              alt="google"
            />
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
