import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

import type { CreateQueryClientInput, CreateQueryClientOutput } from "./types";

import { constants } from "./constants";
import { deserialize, hashKey, serialize } from "./utils";

export function createQueryClient({}: CreateQueryClientInput = {}): CreateQueryClientOutput {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: () => false,
      },
      hydrate: {
        deserializeData: deserialize,
      },
      queries: {
        queryKeyHashFn: hashKey,
        refetchInterval: constants.times.refetch,
        staleTime: constants.times.stale,
      },
    },
  });

  return { queryClient: queryClient };
}
