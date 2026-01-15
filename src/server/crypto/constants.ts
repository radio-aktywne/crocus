import "server-only";

export const constants = {
  contentEncryptionAlgorithm: "A256GCM",
  keyEncoding: "utf-8",
  keyManagementAlgorithm: "dir",
} as const;
