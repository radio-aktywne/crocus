import { orpcContractBuilder } from "../../builder";
import { Schemas } from "./schemas";

export const orpcContractRootBase = orpcContractBuilder.errors({
  BAD_REQUEST: { data: Schemas.Errors.BadRequest },
});
