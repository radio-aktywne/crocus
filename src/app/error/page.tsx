import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { MainLayout } from "@radio-aktywne/ui";
import { Metadata } from "next";

import { ErrorPageMetadata } from "../../components/metadata/error/error-page-metadata";
import { ErrorPageView } from "../../components/views/error/error-page-view";
import { getLanguage } from "../../lib/i18n/get-language";
import { loadLocale } from "../../lib/i18n/load-locale";
import { parseQueryParams } from "../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { ErrorPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "crocus" })),
    title: i18n._(msg({ message: "Error • crocus" })),
  };
}

export default function ErrorPage({ searchParams }: ErrorPageInput) {
  const { data: params, error: paramsError } = parseQueryParams({
    params: new URLSearchParams(searchParams),
    schema: searchParamsSchema,
  });

  if (paramsError) throw new Error("Invalid query parameters");

  const {
    error,
    error_debug: debug,
    error_description: description,
    error_hint: hint,
  } = params;

  return (
    <MainLayout>
      <ErrorPageMetadata />
      <ErrorPageView
        debug={debug}
        description={description}
        error={error}
        hint={hint}
      />
    </MainLayout>
  );
}
