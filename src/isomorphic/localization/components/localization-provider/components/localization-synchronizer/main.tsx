import { useWindowEvent } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { LocalizationSynchronizerInput } from "./types";

import { orpcClientSideQueryClient } from "../../../../../../client/orpc/vars/clients";
import { useLocalization } from "../../../../hooks/use-localization";

export function LocalizationSynchronizer({}: LocalizationSynchronizerInput) {
  const { localization } = useLocalization();

  const { data, refetch } = useQuery(
    orpcClientSideQueryClient.localization.resolveLocale.queryOptions({
      refetchInterval: 0,
      staleTime: 0,
    }),
  );

  useEffect(() => {
    if (data === undefined) return;
    if (data.locale === localization.locale) return;

    localization.lingui.activate(data.locale);
  }, [data, localization.locale, localization.lingui]);

  useWindowEvent("languagechange", async () => await refetch());

  return null;
}
