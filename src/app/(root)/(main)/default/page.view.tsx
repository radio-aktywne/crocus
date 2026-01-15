import { MdOutlineSentimentSatisfied } from "react-icons/md";

import type { PageViewInput } from "../../../types";
import type { Schemas } from "./schemas";

export async function DefaultPageView({}: PageViewInput<
  typeof Schemas.Path,
  typeof Schemas.Query
>) {
  return (
    <MdOutlineSentimentSatisfied
      color="var(--mantine-primary-color-filled)"
      size="10em"
    />
  );
}
