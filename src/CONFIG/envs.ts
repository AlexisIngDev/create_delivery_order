import 'dotenv/config';

export const ENVS = {
  PORT: process.env.PORT || 8080,
  HASURA_GRAPHQL_URL: process.env.HASURA_GRAPHQL_URL || '',
  HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET || '',
};
