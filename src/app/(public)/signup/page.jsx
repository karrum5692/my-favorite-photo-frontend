'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  signupAction,
  googleLoginAction,
} from '../../../features/auth/api/authApi.js';
import Modal from '../../../components/ui/AuthModal.jsx';

export default function SignUpPage() {
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
  const [modal, setModal] = useState({
    open: false,
    message: '',
    redirectTo: null,
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    });

    setLoading(true);

    const formData = { email, nickname, password, passwordConfirm };

    const result = await signupAction(formData);

    setLoading(false);

    if (result.success) {
      setModal({ open: true, message: result.message, redirectTo: '/login' });
    } else {
      if (result.alert) {
        setModal({ open: true, message: result.message });
        return;
      }

      setErrors((prev) => ({ ...prev, [result.field]: result.message }));
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col justify-center items-center px-4">
      <Modal
        open={modal.open}
        message={modal.message}
        onClose={() => {
          const redirectTo = modal.redirectTo;

          setModal({
            open: false,
            message: '',
            redirectTo: null,
          });

          if (redirectTo) {
            router.push(redirectTo);
          }
        }}
      />

      <div className="w-full max-w-[520px]">
        {/* 로고 타이틀 */}
        <div className="mb-[60px] flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="최애의 포토"
              width={331}
              height={60}
            />
          </Link>
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="이메일을 입력해 주세요"
              className={`w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] rounded-[2px] focus:outline-none text-sm placeholder:text-[#555555] ${
                errors.email
                  ? 'border border-red-500'
                  : 'border border-white focus:border-[#eaff00]'
              }`}
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
              onChange={(e) => {
                setNickname(e.target.value);
                setErrors((prev) => ({ ...prev, nickname: '' }));
              }}
              placeholder="닉네임을 입력해 주세요"
              className={`w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] rounded-[2px] focus:outline-none text-sm placeholder:text-[#555555] ${
                errors.nickname
                  ? 'border border-red-500'
                  : 'border border-white focus:border-[#eaff00]'
              }`}
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-[10px]">
            <label className="block text-sm font-bold">비밀번호</label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                type={showPassword ? 'text' : 'password'}
                placeholder="8자 이상 입력해 주세요"
                className={`w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] rounded-[2px] focus:outline-none text-sm placeholder:text-[#555555] ${
                  errors.password
                    ? 'border border-red-500'
                    : 'border border-white focus:border-[#eaff00]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-neutral-500 "
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
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="space-y-[10px]">
            <label className="block text-sm font-bold">비밀번호 확인</label>
            <div className="relative flex items-center">
              <input
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
                }}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해 주세요"
                className={`w-full max-w-[520px] h-[60px] px-5 py-[18px] bg-[#0f0f0f] rounded-[2px] focus:outline-none text-sm placeholder:text-[#555555] ${
                  errors.passwordConfirm
                    ? 'border border-red-500'
                    : 'border border-white focus:border-[#eaff00]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-neutral-500"
                aria-label="비밀번호 확인 보기 토글"
              >
                <Image
                  src={
                    showConfirmPassword
                      ? '/images/open_eye.png'
                      : '/images/close_eye.png'
                  }
                  width={20}
                  height={20}
                  alt={showConfirmPassword ? 'open_eye' : 'close_eye'}
                />
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* 가입하기 버튼 */}
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-[#eaff00] text-black font-bold rounded text-base hover:bg-[#d8ec00] transition-colors mb-[16px] cursor-pointer"
            disabled={loading}
          >
            {loading ? '가입 중...' : '가입하기'}
          </button>

          {/* Google 로그인 버튼 */}
          <button
            type="button"
            onClick={googleLoginAction}
            className="w-full py-4 bg-white text-black font-bold rounded text-base flex justify-center items-center gap-2.5 hover:bg-neutral-100 transition-colors cursor-pointer"
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
