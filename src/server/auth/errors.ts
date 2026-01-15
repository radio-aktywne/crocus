import "server-only";

import { CustomError } from "../../common/generic/errors";

export class AuthError extends CustomError {}

export class DecryptionError extends AuthError {}

export class EncryptionError extends AuthError {}
