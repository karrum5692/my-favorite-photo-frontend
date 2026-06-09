'use client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL 환경변수가 필요합니다.');
}

// 1. 회원가입 Action
export async function signupAction(data) {
  const { email, nickname, password, passwordConfirm } = data;

  const trimmedEmail = email.trim();
  const trimmedNickname = nickname.trim();

  if (!trimmedEmail && !trimmedNickname && !password && !passwordConfirm) {
    return {
      success: false,
      alert: true,
      message: '모든 항목을 입력해주세요.',
    };
  }

  if (!trimmedEmail) {
    return {
      success: false,
      field: 'email',
      message: '이메일을 입력해주세요.',
    };
  }

  if (!trimmedNickname) {
    return {
      success: false,
      field: 'nickname',
      message: '닉네임을 입력해주세요.',
    };
  }

  if (!password) {
    return {
      success: false,
      field: 'password',
      message: '비밀번호를 입력해주세요.',
    };
  }

  if (!passwordConfirm) {
    return {
      success: false,
      field: 'passwordConfirm',
      message: '비밀번호 확인을 입력해주세요.',
    };
  }

  //  이메일 공백 검사
  if (/\s/.test(email)) {
    return {
      success: false,
      message: '이메일에는 공백을 사용할 수 없습니다.',
      field: 'email',
    };
  }

  //  이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: '올바른 이메일 형식이 아닙니다.',
      field: 'email',
    };
  }

  //  닉네임 공백 검사
  if (nickname !== trimmedNickname) {
    return {
      success: false,
      message: '닉네임 앞뒤 공백은 사용할 수 없습니다.',
      field: 'nickname',
    };
  }

  //  비밀번호 공백 검사
  if (/\s/.test(password)) {
    return {
      success: false,
      message: '비밀번호에는 공백을 사용할 수 없습니다.',
      field: 'password',
    };
  }

  //  비밀번호 길이 검사
  if (password.length < 8) {
    return {
      success: false,
      message: '비밀번호는 8자 이상이어야 합니다.',
      field: 'password',
    };
  }

  //  비밀번호 확인 일치 검사
  if (password !== passwordConfirm) {
    return {
      success: false,
      message: '비밀번호가 일치하지 않습니다.',
      field: 'passwordConfirm',
    };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
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

      return {
        success: false,
        message: '회원가입에 실패했습니다.',
        field: error.field,
        alert: !error.field,
      };
    }
    return { success: true, message: '회원가입이 완료되었습니다.' };
  } catch (error) {
    return {
      success: false,
      alert: true,
      message: '서버와 통신 중 오류가 발생했습니다.',
    };
  }
}

// 2. 로그인 Action
export async function loginAction(data) {
  const { email, password } = data;

  if (!email && !password) {
    return {
      success: false,
      alert: true,
      message: '이메일과 비밀번호를 모두 입력해주세요.',
    };
  }

  if (!email) {
    return {
      success: false,
      field: 'email',
      message: '이메일을 입력해주세요.',
    };
  }

  if (!password) {
    return {
      success: false,
      field: 'password',
      message: '비밀번호를 입력해주세요.',
    };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || '로그인에 실패했습니다.',
        field: result.field,
        alert: !result.field,
      };
    }

    return {
      success: true,
      message: '로그인 성공!',
      accessToken: result.accessToken,
    };
  } catch (error) {
    return {
      success: false,
      alert: true,
      message: '서버와 통신 중 오류가 발생했습니다.',
    };
  }
}

// 3. 구글 소셜 로그인 Action
export function googleLoginAction() {
  window.location.href = `${BACKEND_URL}/auth/oauth/google`;
}
