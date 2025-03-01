"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Stack, Text, Title } from "@mantine/core";

import { ErrorPageViewInput } from "./types";

export function ErrorPageView({
  debug,
  description,
  hint,
}: ErrorPageViewInput) {
  const { _ } = useLingui();

  return (
    <Stack align="center">
      <Title>{_(msg({ message: "Error in OIDC flow" }))}</Title>
      {description && <Text>{description}</Text>}
      {hint && <Text>{hint}</Text>}
      {debug && <Text c="dimmed">{debug}</Text>}
    </Stack>
  );
}
