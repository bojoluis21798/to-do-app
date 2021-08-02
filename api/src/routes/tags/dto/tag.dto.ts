import { IsHexColor, IsString } from 'class-validator';

class TagsDTO {
  @IsString()
  name: string;
  @IsHexColor()
  color: string;
}

export default TagsDTO;
