import { IsDateString, IsOptional, IsString } from 'class-validator';

class TodoDto {
  @IsString()
  name: string;
  @IsDateString()
  date: string;
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}

export default TodoDto;
