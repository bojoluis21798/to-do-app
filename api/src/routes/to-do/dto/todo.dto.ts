import { IsDateString, IsString } from 'class-validator';

class TodoDto {
  @IsString()
  name: string;
  @IsDateString()
  date: string;
  @IsString()
  tags: string[];
  @IsString()
  user: string;
}

export default TodoDto;
