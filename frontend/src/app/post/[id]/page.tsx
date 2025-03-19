import { Metadata } from "next";

import { cookies } from "next/headers";

import client from "@/lib/backend/client";

import ClientPage from "./ClientPage";

async function getPost(id: string) {
  try {
    const res = await client.GET("/api/v1/posts/{id}", {
      params: {
        path: {
          id: parseInt(id),
        },
      },
      headers: {
        cookie: (await cookies()).toString(),
      },
    });

    return res.data ?? null;
  } catch (error) {
    console.error("게시글 조회 중 오류 발생:", error);
    return null;
  }
}

function processMarkdown(input: string) {
  // 1. $$...$$ 또는 ```...``` 내용을 제거
  const clientContext = input.replace(/(\$\$[\s\S]*?\$\$|```[\s\S]*?```)/g, "");

  // 2. 영어, 소괄호, 한글(자음/모음 포함), 띄어쓰기, 줄바꿈 외의 모든 문자 제거
  // 3. 연속된 공백과 줄바꿈을 하나의 공백으로 변경하고 앞뒤 공백 제거
  return clientContext
    .replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9()\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetaData({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "게시글 없음",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title,
    description: processMarkdown(post.content),
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return <ClientPage post={post}></ClientPage>;
}
