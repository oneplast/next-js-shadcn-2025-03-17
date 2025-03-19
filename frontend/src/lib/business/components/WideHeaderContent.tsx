"use client";

import { use } from "react";

import Link from "next/link";

import { LoginMemberContext } from "@/stores/auth/loginMember";

import { Button } from "@/components/ui/button";

import { NotebookTabs, Pencil, TableOfContents } from "lucide-react";

import LoginButton from "./LoginButton";
import Logo from "./Logo";
import MeMenuButton from "./MeMenuButton";
import ThemeToggleButton from "./ThemeToggleButton";

export default function WideHeaderContent({
  className,
}: {
  className?: string;
}) {
  const { isLogin } = use(LoginMemberContext);

  return (
    <div className={`${className}  container mx-auto py-1`}>
      <Button variant="link" asChild>
        <Logo text />
      </Button>
      <Button variant="link" asChild>
        <Link href="/post/list">
          <TableOfContents />글
        </Link>
      </Button>
      {isLogin && (
        <Button variant="link" asChild>
          <Link href="/post/write">
            <Pencil />
            작성
          </Link>
        </Button>
      )}
      {isLogin && (
        <Button variant="link" asChild>
          <Link href="/post/mine">
            <NotebookTabs />
            내글
          </Link>
        </Button>
      )}
      <div className="flex-grow"></div>
      {!isLogin && <LoginButton />}
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  );
}
