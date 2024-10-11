import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook;
  }

  async getBookById(@Param('id') id: string): Promise<Book> {
    try {
      const findbook = await this.bookModel.findById(id);
      return findbook;
    } catch {
      throw new NotFoundException('Book not found');
    }
  }
  async UpdateBookById(id: string, book: Book): Promise<Book> {
    try {
      return await this.bookModel.findByIdAndUpdate(id, book, {
        new: true,
        runValidators: true,
      });
    } catch {
      throw new NotFoundException('Book not found');
    }
  }
  async deleteBookById(@Param('id') id: string): Promise<Book> {
    try {
      return await this.bookModel.findByIdAndDelete(id);
    } catch {
      throw new NotFoundException('Book not found');
    }
  }
}
