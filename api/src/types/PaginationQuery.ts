import { IsNumber, IsOptional } from 'class-validator';

class PaginationQuery {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page: number;
}

export default PaginationQuery;
