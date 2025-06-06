import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('producto')
export class Xml {
     @PrimaryGeneratedColumn()            
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;
}
