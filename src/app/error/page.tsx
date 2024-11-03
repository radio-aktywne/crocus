import { Stack, Text, Title } from "@mantine/core";
import { labels } from "../../config/labels";

export type FlowErrorPageSearchParams = Readonly<{
  error?: string;
  error_description?: string;
  error_hint?: string;
  error_debug?: string;
}>;

export type FlowErrorPageProps = Readonly<{
  searchParams: FlowErrorPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function FlowErrorPage({
  searchParams,
}: FlowErrorPageProps) {
  const {
    error,
    error_description: description,
    error_hint: hint,
    error_debug: debug,
  } = searchParams;

  if (!error) throw new Error("Missing error query parameter.");

  return (
    <Stack align="center">
      <Title>{labels.pages.flowError.text}</Title>
      {description && <Text>{description}</Text>}
      {hint && <Text>{hint}</Text>}
      {debug && <Text c="dimmed">{debug}</Text>}
    </Stack>
  );
}
