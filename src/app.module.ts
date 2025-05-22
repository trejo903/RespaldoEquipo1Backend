import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilModule } from './perfil/perfil.module';

@Module({
  imports: [PerfilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
