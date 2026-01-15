import "server-only";

import { CustomError } from "../../common/generic/errors";

export class CryptoError extends CustomError {}

export class DecryptionError extends CryptoError {}

export class EncryptionError extends CryptoError {}
