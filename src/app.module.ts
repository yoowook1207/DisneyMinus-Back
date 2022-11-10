import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmdbModule } from './tmdb/tmdb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
// import { configValidationSchema } from './config/config.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 4231,
      username: 'root',
      url: 'mongodb+srv://yoowook1207:Dbtjddnr9395@cluster0.6emsa.mongodb.net/?retryWrites=true&w=majority',
      database: 'disneyMinus',
      entities: [UserEntity],
      synchronize: true,
    }),

    TmdbModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
