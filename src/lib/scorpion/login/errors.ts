import { ScorpionError } from "../errors";

export class LoginRequestGoneError extends ScorpionError {
  constructor(public redirect: string) {
    super();
  }
}
