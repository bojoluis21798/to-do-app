import { IsDateString, IsString } from 'class-validator';

class TodoDto {
  @IsString()
  name: string;
  @IsDateString()
  date: string;
  @IsString()
  tag: string;
}

export default TodoDto;
