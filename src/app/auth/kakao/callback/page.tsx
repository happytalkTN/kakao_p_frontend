'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const handleAuthCode = useCallback(
    async (code: string) => {
      if (!BACKEND_API_URL)
        return router.replace(
          "/error?message=백엔드 API 설정이 누락되었습니다."
        );

      try {
        await axios.post(
          `${BACKEND_API_URL}/api/auth/kakao/login`,
          {
            code,
          },
          {
            withCredentials: true,
          }
        );

        router.replace("/profile");
      } catch (err) {
        router.replace(
          "/error?message=로그인 처리 중 문제가 발생했습니다. 백엔드 서버 상태를 확인해 주세요."
        );
      }
    },
    [router]
  );

  useEffect(() => {
    if (error) {
      router.replace(`/error?message=카카오 인증 중 오류 발생: ${error}`);
      return;
    }
    
    if (code) {
      handleAuthCode(code); 
    } else {
      router.replace('/error?message=유효한 인증 코드가 없습니다.');
    }
  }, [code, error, router, handleAuthCode]); 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-700">
          카카오 인증 처리 중...
        </h1>
        <p className="mt-4 text-gray-500">
          백엔드 서버에서 사용자 인증을 완료하고 있습니다.
        </p>
      </div>
    </div>
  );
}