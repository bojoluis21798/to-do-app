import { IsNumber } from 'class-validator';

class PaginationQuery {
  @IsNumber()
  limit?: number;

  @IsNumber()
  page?: number;
}

export default PaginationQuery;
