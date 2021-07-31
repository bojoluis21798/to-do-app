import { IsHexColor, IsOptional, IsString } from 'class-validator';

class UpdateTagDTO {
  @IsString()
  @IsOptional()
  name: string;
  @IsHexColor()
  @IsOptional()
  color: string;
}

export default UpdateTagDTO;
