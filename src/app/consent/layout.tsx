import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.consent.title,
  description: labels.pages.consent.description,
};

export type ConsentLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function ConsentLayout({ children }: ConsentLayoutProps) {
  return children;
}
