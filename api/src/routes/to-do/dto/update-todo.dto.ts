import { IsDateString, IsOptional, IsString } from 'class-validator';

class UpdateTodoDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString({ each: true })
  tags: string[];
}

export default UpdateTodoDto;
