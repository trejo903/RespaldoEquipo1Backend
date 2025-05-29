import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CreateAccountModule } from './create-account/create-account.module';
import { EnviarCorreosService } from './enviar-correos/enviar-correos.service';


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
    TransactionsModule,
    CreateAccountModule
  ],
  controllers: [AppController],
  providers: [AppService, EnviarCorreosService],
})
export class AppModule {}
