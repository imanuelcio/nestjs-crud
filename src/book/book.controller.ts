import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBook(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }
  @Get(`:id`)
  async getBookById(@Param(`id`) id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Post('new')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.createBook(book);
  }
  @Put(`:id`)
  async updateBookById(
    @Param(`id`) id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.UpdateBookById(id, book);
  }

  @Delete(`:id`)
  async deleteBookById(@Param(`id`) id: string): Promise<Book> {
    return this.bookService.deleteBookById(id);
  }
}
