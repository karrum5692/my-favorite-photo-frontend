'use client';

const BACKEND_URL = 'http://localhost:4000'; // 본인의 Node.js 서버 주소

// 1. 회원가입 Action
export async function signupAction(data) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || '회원가입에 실패했습니다.',
      };
    }

    return { success: true, message: '회원가입 성공!' };
  } catch (error) {
    return { success: false, message: '서버와 통신 중 오류가 발생했습니다.' };
  }
}

// 2. 로그인 Action
export async function loginAction(data) {
  try {
    const response = await fetch(`http://localhost:4000/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || '로그인에 실패했습니다.',
      };
    }

    if (typeof window !== 'undefined' && result.accessToken) {
      localStorage.setItem('token', result.data.accessToken);
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: '서버와 통신 중 오류가 발생했습니다.' };
  }
}

// ⭐ 3. 구글 소셜 로그인 Action (추가된 부분)
export function googleLoginAction() {
  console.log('googleLoginAction 실행됨: 구글 로그인 창으로 이동합니다.');

  // Passport 백엔드의 로그인 시작 라우터로 브라우저 창을 강제 이동시킵니다.
  // 이 주소로 가야 백엔드(Passport)가 구글 로그인 화면을 띄워줍니다.
  window.location.href = `${BACKEND_URL}/auth/oauth/google`;
}
