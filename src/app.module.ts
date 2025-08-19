import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { ENVS } from './CONFIG/envs';

@Module({
  imports: [
    GraphQLRequestModule.forRoot({
      endpoint: ENVS.HASURA_GRAPHQL_URL,
      options: {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': ENVS.HASURA_ADMIN_SECRET,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
