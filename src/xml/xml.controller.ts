import { Controller, Get, Post, Body, Res, HttpStatus, Header } from '@nestjs/common';
import { Response } from 'express';
import { XmlDbService } from './xml.service';

@Controller('xml-db')
export class XmlDbController {
  constructor(private readonly xmlDbService: XmlDbService) {}

  @Get('exportar')
  async exportar(@Res() res: Response) {
    try {
      const contenidoXml = await this.xmlDbService.exportarProductosAXml();
      return res
        .status(HttpStatus.OK)
        .header('Content-Type', 'application/xml; charset=utf-8')
        .send(contenidoXml);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error al generar el XML', detalles: err.message });
    }
  }

  
  @Post('importar')
  @Header('Content-Type', 'application/json')
  async importar(@Body() xml: string, @Res() res: Response) {
    try {
      
      const resultado = await this.xmlDbService.importarProductosDesdeXmlString(xml);
      return res.status(HttpStatus.OK).json({
        mensaje: 'Importación desde XML completada',
        creados: resultado.creados,
        actualizados: resultado.actualizados,
      });
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error al procesar el XML', detalles: err.message });
    }
  }
}
