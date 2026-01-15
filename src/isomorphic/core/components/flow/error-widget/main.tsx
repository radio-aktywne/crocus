"use client";

import { msg } from "@lingui/core/macro";
import { Stack, Text, Title } from "@mantine/core";

import type { ErrorWidgetInput } from "./types";

import { useLocalization } from "../../../../../isomorphic/localization/hooks/use-localization";

export function ErrorWidget({ debug, description, hint }: ErrorWidgetInput) {
  const { localization } = useLocalization();

  return (
    <Stack align="center">
      <Title>
        {localization.localize(msg({ message: "Error in OIDC flow" }))}
      </Title>
      {description && <Text>{description}</Text>}
      {hint && <Text>{hint}</Text>}
      {debug && <Text c="dimmed">{debug}</Text>}
    </Stack>
  );
}
