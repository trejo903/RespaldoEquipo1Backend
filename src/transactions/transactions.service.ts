import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ){

  }
  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(async(transactionEntityManager)=>{
      const transaction = new Transaction()
      const total = createTransactionDto.contenidos.reduce((total,item)=>(item.cantidad*item.precio)+total,0)
      transaction.total = total
  
      for(const contents of createTransactionDto.contenidos){
        const produto = await transactionEntityManager.findOneBy(Product,{id:contents.productId})
        const errores:string[] = []
        if(!produto){
          errores.push(`El producto con el ID: ${contents.productId} no existe`)
          throw new NotFoundException(errores)
        }
        produto.inventario -= contents.cantidad


        const transactionContent = new TransactionContents()
        transactionContent.precio=contents.precio
        transactionContent.cantidad=contents.cantidad
        transactionContent.producto = produto
        transactionContent.transaction = transaction
        await transactionEntityManager.save(transaction)
        await transactionEntityManager.save(transactionContent)
      }
    })

    return {message:'Venta almacenada correctamente'};
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
