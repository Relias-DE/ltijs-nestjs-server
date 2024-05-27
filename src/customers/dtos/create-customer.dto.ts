import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  customerKey: string;

  @IsString()
  name: string;

  @IsEmail()
  contactEmail: string;

  @IsBoolean()
  isEnabled: boolean;

  @IsNumber()
  numberOfLicensesPurchased: number;

  @IsBoolean()
  isLtiV3Customer: boolean;

  @IsString()
  ltiV3ClientId: string;

  @IsBoolean()
  isLtiV3DeeplinkingEnabled: boolean;

  @IsBoolean()
  isLtiV3GradeServiceEnabled: boolean;

  @IsString()
  platformURL: string;
}
