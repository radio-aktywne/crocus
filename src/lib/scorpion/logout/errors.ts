import { ScorpionError } from "../errors";

export class LogoutRequestGoneError extends ScorpionError {
  constructor(public redirect: string) {
    super();
  }
}
