import { IsHexColor, IsString } from 'class-validator';
import { Tags } from 'models/tags.model';

class TagsDTO implements Tags {
  @IsString()
  name: string;
  @IsHexColor()
  color: string;
}

export default TagsDTO;
