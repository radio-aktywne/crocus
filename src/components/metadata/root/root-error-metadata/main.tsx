"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { RootErrorMetadataInput } from "./types";

export function RootErrorMetadata({}: RootErrorMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "crocus" })),
    title: _(msg({ message: "Error • crocus" })),
  });

  return null;
}
