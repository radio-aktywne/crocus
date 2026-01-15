import type { SerializedData } from "./types";

import { serializer } from "./vars";

export function serialize(data: unknown) {
  const [json, metadata] = serializer.serialize(data);
  return { json: json, metadata: metadata } satisfies SerializedData;
}

export function deserialize(data: SerializedData) {
  return serializer.deserialize(data.json, data.metadata);
}

export function hashKey(key: unknown) {
  const [json, metadata] = serializer.serialize(key);
  const data = {
    json: json,
    metadata: metadata,
  } satisfies SerializedData;
  return JSON.stringify(data);
}
