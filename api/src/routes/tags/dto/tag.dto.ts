import { IsHexColor, IsString } from 'class-validator';

class TagsDTO {
  @IsString()
  name: string;
  @IsHexColor()
  color: string;
  @IsString()
  user: string;
}

export default TagsDTO;
