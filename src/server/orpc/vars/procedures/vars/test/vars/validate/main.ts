import { msg } from "@lingui/core/macro";

import { getLocalization } from "../../../../../../../localization/lib/get-localization";
import { state } from "../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../bases/root";
import { localeMiddleware } from "../../../../../middleware/locale";

export const validate = orpcServerRootBase.test.validate
  .use(localeMiddleware)
  .handler(async ({ context, input }) => {
    const { localization } = getLocalization({
      locale: context.localeMiddleware.locale,
    });

    const { data: getRandomJokeData } =
      await state.current.apis.icanhazdadjoke.getRandomJoke({
        headers: {
          Accept: "application/json",
        },
        throwOnError: true,
      });

    return {
      message:
        context.localeMiddleware.locale === "en"
          ? getRandomJokeData.joke
          : localization.localize(
              msg({
                message:
                  "Why did the chicken cross the road? To get to the other side.",
              }),
            ),
      value: input.value,
    };
  });
