import { ScorpionError } from "../errors";

export class ConsentRequestGoneError extends ScorpionError {
  constructor(public redirect: string) {
    super();
  }
}
