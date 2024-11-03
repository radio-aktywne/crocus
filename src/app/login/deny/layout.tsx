import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.login.pages.deny.title,
  description: labels.pages.login.pages.deny.description,
};

export type LoginDenyLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function LoginDenyLayout({ children }: LoginDenyLayoutProps) {
  return children;
}
