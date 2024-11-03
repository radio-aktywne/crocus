import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.default.title,
  description: labels.pages.default.description,
};

export type DefaultLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return children;
}
