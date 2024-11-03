import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.logout.title,
  description: labels.pages.logout.description,
};

export type LogoutLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function LogoutLayout({ children }: LogoutLayoutProps) {
  return children;
}
