'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserProfile {
    id: string;
    provider: string;
    email: string;
    nickname: string;
    createdAt: string;
}

interface ProfileResponse {
    message: string;
    user: UserProfile;
}


const USER_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/profile`; 
const LOGOUT_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`; 

export default function ProfilePage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await axios.post(LOGOUT_API_URL, {}, { withCredentials: true });
            alert('로그아웃되었습니다.');
            router.push('/');
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert('로그아웃 처리 중 오류가 발생했습니다.');
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<ProfileResponse>(USER_API_URL, {
                    withCredentials: true, 
                });
                
                setUserProfile(response.data.user); 
            } catch (error) {
                console.error('프로필 정보 로드 실패:', error);
                alert('인증 정보가 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
                router.replace('/'); 
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchProfile();
    }, [router]);
    
    if (isLoading) {
        return <div className="p-8 text-center">프로필 로딩 중...</div>;
    }
    
    if (!userProfile) {
        return null; 
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-indigo-700">
                    🔑 개인정보 확인 페이지
                </h2>
                <p className="text-gray-600 mb-8">
                    수집되어 DB에 저장되고 있는 개인정보 목록입니다.
                </p>
                
                <ul className="space-y-4 text-left">
                    <li className="p-3 border-b">
                        <span className="font-semibold w-24 inline-block text-gray-700">제공자</span>
                        <span className="text-indigo-500">{userProfile.provider}</span>
                    </li>
                    <li className="p-3 border-b">
                        <span className="font-semibold w-24 inline-block text-gray-700">DB ID</span>
                        <span>{userProfile.id}</span>
                    </li>
                    <li className="p-3 border-b">
                        <span className="font-semibold w-24 inline-block text-gray-700">이메일</span>
                        <span>{userProfile.email || '제공되지 않음'}</span>
                    </li>
                    <li className="p-3 border-b">
                        <span className="font-semibold w-24 inline-block text-gray-700">닉네임</span>
                        <span>{userProfile.nickname}</span>
                    </li>
                    <li className="p-3">
                        <span className="font-semibold w-24 inline-block text-gray-700">가입일</span>
                        <span>{new Date(userProfile.createdAt).toLocaleDateString()}</span>
                    </li>
                </ul>
                
                <button 
                    onClick={handleLogout}
                    className="w-full mt-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-150"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}