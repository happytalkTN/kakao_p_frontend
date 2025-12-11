"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const generateRandomState = (): string =>
  Math.random().toString(36).substring(2, 15);

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 로그인 상태 확인
  const checkLoginStatus = async () => {
    try {
      await axios.get(`${BACKEND_API_URL}/api/auth/status`, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 카카오 로그인 버튼 클릭
  const handleKakaoLogin = () => {
    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      alert("카카오 환경 변수가 비어 있습니다.");
      return;
    }

    const SCOPES = "profile_nickname,profile_image";

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=${generateRandomState()}&scope=${SCOPES}`;

    router.push(kakaoAuthUrl);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        상태 확인 중...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          카카오 간편 로그인
        </h1>

        {isLoggedIn ? (
          <div className="space-y-4">
            <p className="text-lg text-green-600 font-semibold">
              ✅ 로그인 상태입니다!
            </p>
            <button
              onClick={() => router.push("/profile")}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150"
            >
              내 프로필 보기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              카카오 계정으로 간편 로그인하세요.
            </p>
            <button
              onClick={handleKakaoLogin}
              className="w-full flex items-center justify-center py-3 bg-[#FEE500] text-black font-bold rounded-lg hover:bg-[#ffe033] transition duration-150 shadow-md"
            >
              <span className="ml-2">카카오 로그인</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
