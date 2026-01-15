import { msg } from "@lingui/core/macro";
import { connection } from "next/server";

import type {
  PageInput,
  PageMetadataInput,
  PageMetadataUtilityInput,
} from "../../../types";
import type { Schemas } from "./schemas";
import type { Keys } from "./types";

import { Metadata } from "../../../../isomorphic/metadata/components/metadata";
import { createMetadata } from "../../../../server/metadata/lib/create-metadata";
import { DefaultPageView } from "./page.view";

async function getTitle({}: PageMetadataUtilityInput<
  typeof Schemas.Path,
  typeof Schemas.Query
>) {
  return msg({ message: "crocus" });
}

export async function generateMetadata({}: PageMetadataInput<
  Keys.Path,
  Keys.Query
>) {
  return await createMetadata({
    title: await getTitle({}),
  });
}

export default async function DefaultPage({}: PageInput<
  Keys.Path,
  Keys.Query
>) {
  await connection();

  return (
    <>
      <Metadata title={await getTitle({})} />
      <DefaultPageView />
    </>
  );
}
