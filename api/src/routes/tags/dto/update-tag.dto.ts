import { IsHexColor, IsOptional, IsString } from 'class-validator';
import TagsDTO from './tag.dto';

class UpdateTagDTO implements TagsDTO {
  @IsString()
  @IsOptional()
  name: string;
  @IsHexColor()
  @IsOptional()
  color: string;
}

export default UpdateTagDTO;
