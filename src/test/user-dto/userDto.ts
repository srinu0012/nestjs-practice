import { IsDefined, IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  id: number;
}
