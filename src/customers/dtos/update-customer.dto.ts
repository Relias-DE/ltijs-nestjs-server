import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsBoolean()
  isEnabled: boolean;

  @IsString()
  ltiV3ClientId: string;

  @IsBoolean()
  isLtiV3DeeplinkingEnabled: boolean;

  @IsBoolean()
  isLtiV3GradeServiceEnabled: boolean;

  @IsNumber()
  numberOfLicensesPurchased: number;
}
