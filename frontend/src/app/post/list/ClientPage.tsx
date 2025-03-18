"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { components } from "@/lib/backend/apiV1/schema";
import PaginationType1Responsive from "@/lib/business/components/PaginationType1Responsive";

export default function ClientPage({
  searchKeyword,
  searchKeywordType,
  pageSize,
  itemPage,
}: {
  searchKeyword: string;
  searchKeywordType: string;
  page: number;
  pageSize: number;
  itemPage: components["schemas"]["PageDtoPostDto"];
}) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">공개글 목록</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const searchKeyword = formData.get("searchKeyword") as string;
          const searchKeywordType = formData.get("searchKeywordType") as string;
          const page = formData.get("page") as string;
          const pageSize = formData.get("pageSize") as string;

          router.push(
            `?page=${page}&pageSize=${pageSize}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`,
          );
        }}
      >
        <input type="hidden" name="page" value="1" />
        <select name="pageSize" defaultValue={pageSize}>
          <option disabled>페이당 행 수</option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <select name="searchKeywordType" defaultValue={searchKeywordType}>
          <option disabled>검색어 타입</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input
          placeholder="검색어를 입력해주세요."
          type="text"
          name="searchKeyword"
          defaultValue={searchKeyword}
        />
        <button type="submit">검색</button>
      </form>

      <PaginationType1Responsive
        className="my-2 sm:hidden"
        baseQueryString={`pageSize=${pageSize}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`}
        totalPages={itemPage.totalPages}
        currentPageNumber={itemPage.currentPageNumber}
      />

      <ul>
        {itemPage.items.map((item) => (
          <li key={item.id} className="border-[2px] border-[red] my-3">
            <Link className="block" href={`/post/${item.id}`}>
              <div>id : {item.id}</div>
              <div>createDate : {item.createDate}</div>
              <div>modifyDate : {item.modifyDate}</div>
              <div>authorId : {item.authorId}</div>
              <div>authorName : {item.authorName}</div>
              <div>title : {item.title}</div>
              <div>published : {`${item.published}`}</div>
              <div>listed : {`${item.listed}`}</div>
            </Link>
          </li>
        ))}
      </ul>

      <PaginationType1Responsive
        className="my-2 hidden sm:flex"
        baseQueryString={`pageSize=${pageSize}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`}
        totalPages={itemPage.totalPages}
        currentPageNumber={itemPage.currentPageNumber}
      />
    </div>
  );
}
