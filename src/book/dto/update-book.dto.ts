import { IsEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/book.schema';
import { User } from 'src/auth/schema/user.schema';

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
  readonly category: Category;

  @IsEmpty({ message: 'You cant pass userId' })
  readonly user: User;
}
