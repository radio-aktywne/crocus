import { createSecretKey } from "crypto";
import { EncryptJWT, jwtDecrypt, JWTPayload } from "jose";

const keyManagementAlgorithm = "dir";
const contentEncryptionAlgorithm = "A256GCM";

function getSecret() {
  const secret =
    process.env.CROCUS__SECRETS__SHARED || "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  if (!secret) throw new Error("Secret not found.");
  return secret;
}

function getSecretKey() {
  const secret = getSecret();
  return createSecretKey(secret, "utf8");
}

export async function encrypt(data: JWTPayload) {
  const jwt = new EncryptJWT(data).setProtectedHeader({
    alg: keyManagementAlgorithm,
    enc: contentEncryptionAlgorithm,
  });

  const key = getSecretKey();

  return await jwt.encrypt(key);
}

export async function decrypt(data: string) {
  const key = getSecretKey();

  const { payload } = await jwtDecrypt(data, key, {
    keyManagementAlgorithms: [keyManagementAlgorithm],
    contentEncryptionAlgorithms: [contentEncryptionAlgorithm],
  });

  return payload;
}
