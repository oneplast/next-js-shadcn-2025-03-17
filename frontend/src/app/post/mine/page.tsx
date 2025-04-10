import { cookies } from "next/headers";

import client from "@/lib/backend/client";

import ClientPage from "./ClientPage";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    searchKeywordType?: "title" | "content";
    searchKeyword?: string;
    pageSize?: number;
    page?: number;
  };
}) {
  const {
    searchKeyword = "",
    searchKeywordType = "title",
    pageSize = 30,
    page = 1,
  } = await searchParams;

  const response = await client.GET("/api/v1/posts/mine", {
    params: {
      query: {
        searchKeyword,
        searchKeywordType,
        pageSize,
        page,
      },
    },
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  const itemPage = response.data!;

  return (
    <>
      <ClientPage
        searchKeyword={searchKeyword}
        searchKeywordType={searchKeywordType}
        page={page}
        pageSize={pageSize}
        itemPage={itemPage}
      />
    </>
  );
}
