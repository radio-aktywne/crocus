import { createClient as createICanHazDadJokeClient } from "./common/apis/icanhazdadjoke/client";
import { Sdk as ICanHazDadJokeSDK } from "./common/apis/icanhazdadjoke/sdk";
import { createClient as createScorpionClient } from "./common/apis/scorpion/client";
import { Sdk as ScorpionSDK } from "./common/apis/scorpion/sdk";
import { createUrl } from "./common/generic/lib/create-url";
import { loadConfig } from "./server/config/lib/load-config";
import { state } from "./server/state/vars/state";

export async function register() {
  const { config } = await loadConfig();

  const apis = {
    icanhazdadjoke: new ICanHazDadJokeSDK({
      client: createICanHazDadJokeClient({
        baseUrl: createUrl({
          host: config.apis.icanhazdadjoke.host,
          path: config.apis.icanhazdadjoke.path,
          port: config.apis.icanhazdadjoke.port,
          scheme: config.apis.icanhazdadjoke.scheme,
        }).url,
      }),
    }),

    scorpion: new ScorpionSDK({
      client: createScorpionClient({
        baseUrl: createUrl({
          host: config.apis.scorpion.host,
          path: config.apis.scorpion.path,
          port: config.apis.scorpion.port,
          scheme: config.apis.scorpion.scheme,
        }).url,
      }),
    }),
  };

  state.current = {
    apis: apis,
    config: config,
  };
}
