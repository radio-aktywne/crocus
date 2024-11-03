import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.login.pages.auth.title,
  description: labels.pages.login.pages.auth.description,
};

export type LoginAuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function LoginAuthLayout({ children }: LoginAuthLayoutProps) {
  return children;
}
