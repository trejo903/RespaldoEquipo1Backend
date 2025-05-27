import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id:number

    @Column('decimal')
    total:number

    @Column({type:'timestamp',default:()=>"CURRENT_TIMESTAMP(6)"})
    diaTransaccion:Date

    @OneToMany(()=>TransactionContents,(transaction)=>transaction.transaction)
    contenidos:TransactionContents[]
}

@Entity()
export class TransactionContents{
    @PrimaryGeneratedColumn()
    id:number

    @Column('decimal')
    precio:number

    @Column('int')
    cantidad:number

    @ManyToOne(()=>Product,(product)=>product.id,{eager:true,cascade:true})
    producto:Product

    @ManyToOne(()=>Transaction,(transaction)=>transaction.contenidos,{cascade:true})
    transaction:Transaction

}