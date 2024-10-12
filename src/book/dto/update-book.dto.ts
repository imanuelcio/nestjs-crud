import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/book.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsEnum(Category, { message: 'invalid category' })
  readonly Category: Category;
}
