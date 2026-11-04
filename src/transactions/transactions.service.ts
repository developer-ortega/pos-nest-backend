import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity.js';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = new Transaction();
    transaction.total = createTransactionDto.total;
    await this.transactionRepository.save(transaction);

    for (const contents of createTransactionDto.contents) {

      const product = await this.productRepository.findOneBy({ id: contents.productId });

      if (!product) {
        throw new NotFoundException(`El producto con el ID ${contents.productId} no existe.`);
      }

      if (contents.quantity > product.inventory) {
        throw new BadRequestException(`El articulo ${product.name} no tiene suficiente inventario.`)
      }

      product.inventory -= contents.quantity;


      await this.transactionContentsRepository.save({
        ...contents,
        transaction,
        product
      })
    }

    return "Venta creada correctamente";
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
