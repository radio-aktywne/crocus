import type { UserConfig } from "@hey-api/openapi-ts";

import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig(
  [
    {
      name: "icanhazdadjoke",
    },
    {
      name: "scorpion",
    },
  ].map(
    ({ name }) =>
      ({
        input: {
          path: `./openapi/${name}.yaml`,
        },

        output: {
          fileName: {
            // Custom file name mappings
            name: (name) => {
              switch (name) {
                case "client":
                  return "clnt";
                case "zod":
                  return "schemas";
                default:
                  return name;
              }
            },

            // Don't add any suffix to generated files
            suffix: null,
          },

          // Don't generate index file
          indexFile: false,

          path: `./src/common/apis/${name}`,
        },

        parser: {
          filters: {
            // Exclude deprecated resources
            deprecated: false,

            // Exclude orphaned resources
            orphans: false,
          },
        },

        plugins: [
          // Generate types
          {
            definitions: {
              name: "{{name}}",
            },

            errors: {
              error: "{{name}}Error",
              name: "{{name}}Errors",
            },

            name: "@hey-api/typescript",

            requests: {
              name: "{{name}}Request",
            },

            responses: {
              name: "{{name}}Responses",
              response: "{{name}}Response",
            },
          },

          // Generate Zod schemas
          {
            // Use PascalCase for schema names
            case: "PascalCase",

            definitions: {
              name: "{{name}}Schema",
            },

            // Include metadata in schemas
            metadata: true,

            name: "zod",

            requests: {
              name: "{{name}}RequestSchema",
            },

            responses: {
              name: "{{name}}ResponseSchema",
            },
          },

          // Generate Fetch API client
          {
            name: "@hey-api/client-fetch",
          },

          // Generate SDK
          {
            // Generate SDK class
            asClass: true,

            // Don't use generated client by default
            client: false,

            // Make SDK class instantiable
            instance: true,

            name: "@hey-api/sdk",

            // Use generated schemas for validation
            validator: true,
          },
        ],
      }) satisfies UserConfig,
  ),
);
