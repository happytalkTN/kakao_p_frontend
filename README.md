This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



카카오 로그인 시작: 카카오 인증 서버로 사용자를 보내 인가 코드를 요청합니다.

인증 코드 백엔드 전송: 카카오에게 받은 코드를 백엔드로 보내 최종 로그인을 요청합니다.

보안 쿠키 자동 사용: 모든 API 요청에 HttpOnly 보안 쿠키를 자동으로 첨부하여 인증합니다.

로그인 상태 확인: 현재 사용자가 로그인 상태인지 백엔드 API를 통해 확인합니다.

사용자 정보 조회: 로그인 후 보호된 API를 통해 프로필 정보를 조회합니다.

로그아웃 처리: 백엔드에 요청하여 보안 쿠키를 즉시 삭제하고 로그아웃합니다
