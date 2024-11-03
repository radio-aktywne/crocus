import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.login.title,
  description: labels.pages.login.description,
};

export type LoginLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function LoginLayout({ children }: LoginLayoutProps) {
  return children;
}
