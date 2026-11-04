import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity.js';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {

    await this.productRepository.manager.transaction(async (manager) => {

      const transaction = new Transaction();
      transaction.total = createTransactionDto.contents.reduce((total, item) => total + (item.quantity * item.price), 0)

      for (const contents of createTransactionDto.contents) {

        const product = await manager.findOneBy(Product, { id: contents.productId });

        const errors = [];

        if (!product) {
          errors.push(`El producto con el ID ${contents.productId} no existe.`)
          throw new NotFoundException(errors);
        }

        if (contents.quantity > product.inventory) {
          errors.push(`El articulo ${product.name} no tiene suficiente inventario.`)
          throw new BadRequestException(errors);
        }

        product.inventory -= contents.quantity;

        const transactionContent = new TransactionContents();
        transactionContent.price = contents.price;
        transactionContent.product = product;
        transactionContent.quantity = contents.quantity;
        transactionContent.transaction = transaction;

        await manager.save(transaction);
        await manager.save(transactionContent);
      }

      return `Venta Almacenada Correctamente`;
    }
    
    )
  }

  findAll(transactionDate? : string) {

    const options : FindManyOptions<Transaction> = {
      relations : {
        contents: true
      }
    }

    if(transactionDate){
      const date = parseISO(transactionDate)
      if(!isValid(date)){
        throw new BadRequestException(`Fecha no válida`)
      }
      const start = startOfDay(date)
      const end = endOfDay(date)
      options.where = {
        transactionDate: Between(start, end)
      }
    }

    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {

    const transaction = await this.transactionRepository.findOne({
      where: {
        id
      },
      relations: {
        contents: true
      }
    })

    if(!transaction){
      throw new NotFoundException(`La transacción con el id ${id} no fue encontrada.`)
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { contents } = updateTransactionDto;

    if (!contents) {
      throw new BadRequestException(['Los Contenidos son obligatorios para actualizar la venta.']);
    }

    return this.transactionRepository.manager.transaction(async (manager) => {

      const transaction = await manager.findOneBy(Transaction, { id });

      if (!transaction) {
        throw new NotFoundException(`La transacción con el id ${id} no fue encontrada.`);
      }

      
      const previousContents = await manager.find(TransactionContents, {
        where: { transaction: { id } },
        relations: { product: true }
      });

      for (const content of previousContents) {
        await manager.increment(Product, { id: content.product.id }, 'inventory', content.quantity);
      }

     
      await manager.delete(TransactionContents, { transaction: { id } });

      
      transaction.total = contents.reduce((total, item) => total + (item.quantity * item.price), 0);
      await manager.save(transaction);

      
      for (const content of contents) {
        const product = await manager.findOneBy(Product, { id: content.productId });

        if (!product) {
          throw new NotFoundException([`El producto con el ID ${content.productId} no existe.`]);
        }

        if (content.quantity > product.inventory) {
          throw new BadRequestException([`El articulo ${product.name} no tiene suficiente inventario.`]);
        }

        product.inventory -= content.quantity;

        const transactionContent = new TransactionContents();
        transactionContent.price = content.price;
        transactionContent.product = product;
        transactionContent.quantity = content.quantity;
        transactionContent.transaction = transaction;

        await manager.save(transactionContent);
      }

      return 'Venta Actualizada Correctamente';
    });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
