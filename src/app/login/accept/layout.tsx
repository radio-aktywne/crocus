import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.login.pages.accept.title,
  description: labels.pages.login.pages.accept.description,
};

export type LoginAcceptLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function LoginAcceptLayout({
  children,
}: LoginAcceptLayoutProps) {
  return children;
}
