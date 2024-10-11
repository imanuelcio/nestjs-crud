import { Category } from '../schema/book.schema';

export class UpdateBookDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly author: string;
  readonly Category: Category;
}
