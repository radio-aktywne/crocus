---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `CROCUS__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `CROCUS__SERVER__PORT` -
  port to run the server on
  (default: `20020`)
- `CROCUS__SECRETS__SHARED` -
  shared secret for the app containing 32 characters
  (default: `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
- `CROCUS__SCORPION__ADMIN__SCHEME`
  scheme of the admin API of the scorpion service
  (default: `http`)
- `CROCUS__SCORPION__ADMIN__HOST`
  host of the admin API of the scorpion service
  (default: `localhost`)
- `CROCUS__SCORPION__ADMIN__PORT`
  port of the admin API of the scorpion service
  (default: `20001`)
- `CROCUS__SCORPION__ADMIN__PATH`
  path of the admin API of the scorpion service
  (default: ``)
