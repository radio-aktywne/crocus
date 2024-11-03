import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.flowError.title,
  description: labels.pages.flowError.description,
};

export type FlowErrorLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function FlowErrorLayout({ children }: FlowErrorLayoutProps) {
  return children;
}
