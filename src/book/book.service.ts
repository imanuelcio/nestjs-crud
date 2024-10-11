import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook;
  }

  async getBookById(id: string): Promise<Book> {
    try {
      const findbook = await this.bookModel.findById(id);

      if (!findbook) {
        throw new NotFoundException('Book not found');
      }
      return findbook;
    } catch (error) {
      throw new NotFoundException('Something is error', error);
    }
  }
}
