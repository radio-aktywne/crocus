import type { LocaleMiddlewareOutputContext } from "./types";

import { getAcceptedLocales } from "../../../../../common/localization/lib/get-accepted-locales";
import { getSupportedLocale } from "../../../../../common/localization/lib/get-supported-locale";
import { headersMiddleware } from "../headers";
import { isExecuted } from "./utils";

export const localeMiddleware = headersMiddleware.concat(
  async ({ context, next }) => {
    if (isExecuted(context))
      return next({
        context: {
          localeMiddleware: {
            executed: context.localeMiddleware.executed,
            locale: context.localeMiddleware.locale,
          },
        } satisfies LocaleMiddlewareOutputContext as LocaleMiddlewareOutputContext,
      });

    const headers = context.headersMiddleware.headers;

    const { locales } = getAcceptedLocales({ headers: headers });
    const { locale } = getSupportedLocale({ locales: locales });

    return next({
      context: {
        localeMiddleware: {
          executed: true,
          locale: locale,
        },
      } satisfies LocaleMiddlewareOutputContext as LocaleMiddlewareOutputContext,
    });
  },
);
