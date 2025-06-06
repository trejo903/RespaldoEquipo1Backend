import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Xml } from './entities/xml.entity';
import { XmlDbController } from './xml.controller';
import { XmlDbService } from './xml.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Xml]),
  ],
  controllers: [XmlDbController],
  providers: [XmlDbService],
})
export class XmlModule {}
