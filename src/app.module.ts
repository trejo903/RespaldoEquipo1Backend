import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useFactory:typeOrmConfig,
      inject:[ConfigService]
    }),
    ProfileModule,
    ProductsModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
