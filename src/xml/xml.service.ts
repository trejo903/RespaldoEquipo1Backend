import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseStringPromise, Builder } from 'xml2js';
import { Xml } from './entities/xml.entity';
import { CreateXmlDto } from './dto/create-xml.dto';

@Injectable()
export class XmlDbService {
  constructor(
    @InjectRepository(Xml)
    private readonly productoRepo: Repository<Xml>,
  ) {}

  
  async exportarProductosAXml(): Promise<string> {
    const productos = await this.productoRepo.find();

    const estructuraJs = {
      productos: {
        producto: productos.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
        })),
      },
    };

    const builder = new Builder({ headless: false, renderOpts: { pretty: true } });
    const xml = builder.buildObject(estructuraJs);

    return xml;
  }

  
  async importarProductosDesdeXmlString(xml: string): Promise<{ creados: number; actualizados: number }> {
    const resultadoParse: any = await parseStringPromise(xml, {
      explicitArray: false, 
      mergeAttrs: true,     
    });

    
    let lista: any[] = [];
    const nodoProducto = resultadoParse.productos?.producto;
    if (!nodoProducto) {
      
      return { creados: 0, actualizados: 0 };
    }
    if (Array.isArray(nodoProducto)) {
      lista = nodoProducto;
    } else {
      
      lista = [nodoProducto];
    }

    
    let creados = 0;
    let actualizados = 0;

    for (const prodXml of lista) {
      
      const idNum = prodXml.id ? parseInt(prodXml.id, 10) : NaN;
      let productoExistente: Xml | null = null;
      if (!isNaN(idNum)) {
        productoExistente = await this.productoRepo.findOne({ where: { id: idNum } });
      }

      if (productoExistente) {
        if (prodXml.nombre) {
          productoExistente.nombre = prodXml.nombre;
        }
        if (prodXml.precio) {
          productoExistente.precio = parseFloat(prodXml.precio);
        }
        await this.productoRepo.save(productoExistente);
        actualizados++;
      } else {
        const nuevoProd: CreateXmlDto = {
          nombre: prodXml.nombre,
          precio: parseFloat(prodXml.precio),
        };
        await this.productoRepo.save(nuevoProd as any);
        creados++;
      }
    }

    
    return { creados, actualizados };
  }
}
