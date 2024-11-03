type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json | undefined };

export type AcceptLoginRequestProps = {
  challenge: string;
  subject: string;
  acr?: string;
  amr?: string[];
  context?: { [key: string]: Json | undefined };
  extendSessionLifespan?: boolean;
  identityProviderSessionID?: string;
  remember?: boolean;
  rememberFor?: number;
};
