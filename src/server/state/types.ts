import "server-only";

import type { Sdk as ICanHazDadJokeSDK } from "../../common/apis/icanhazdadjoke/sdk";
import type { Sdk as ScorpionSDK } from "../../common/apis/scorpion/sdk";
import type { Config } from "../config/types";

export type APIs = {
  icanhazdadjoke: ICanHazDadJokeSDK;
  scorpion: ScorpionSDK;
};

export type State = {
  apis: APIs;
  config: Config;
};
