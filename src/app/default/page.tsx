import { MdOutlineSentimentSatisfied } from "react-icons/md";

import { DefaultPageInput } from "./types";

export default function DefaultPage({}: DefaultPageInput) {
  return (
    <MdOutlineSentimentSatisfied
      color="var(--mantine-primary-color-filled)"
      size="10em"
    />
  );
}
