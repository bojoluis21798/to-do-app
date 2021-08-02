import { IsDateString, IsString } from 'class-validator';

class TodoDto {
  @IsString()
  name: string;
  @IsDateString()
  date: string;
  @IsString({ each: true })
  tags: string[];
}

export default TodoDto;
