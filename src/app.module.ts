import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MovieModule,GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
