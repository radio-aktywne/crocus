export type RejectLoginRequestProps = {
  challenge: string;
  error?: string;
  errorDebug?: string;
  errorDescription?: string;
  errorHint?: string;
  statusCode?: number;
};
