import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;
}
