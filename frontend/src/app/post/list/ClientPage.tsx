"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { components } from "@/lib/backend/apiV1/schema";
import PaginationType1Responsive from "@/lib/business/components/PaginationType1Responsive";

import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <h1 className="text-2xl font-bold text-center my-4">공개글</h1>
      <form
        className="flex flex-col gap-6"
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
        <FormItem>
          <Label>페이지 당 행 수</Label>

          <Select name="pageSize" defaultValue={pageSize.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="페이지 당 행 수" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10개씩 보기</SelectItem>
                <SelectItem value="30">30개씩 보기</SelectItem>
                <SelectItem value="50">50개씩 보기</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <Label>검색어 타입</Label>

          <Select name="searchKeywordType" defaultValue={searchKeywordType}>
            <SelectTrigger>
              <SelectValue placeholder="검색어 타입" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="content">내용</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <Label>검색어</Label>

          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            name="searchKeyword"
            defaultValue={searchKeyword}
          />
        </FormItem>

        <Button type="submit">검색</Button>
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
