type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json | undefined };

export type AcceptConsentRequestProps = {
  challenge: string;
  grantAudience?: string[];
  grantScope?: string[];
  accessToken?: { [key: string]: Json | undefined };
  idToken?: { [key: string]: Json | undefined };
  context?: { [key: string]: Json | undefined };
  handledAt?: string;
  remember?: boolean;
  rememberFor?: number;
};
