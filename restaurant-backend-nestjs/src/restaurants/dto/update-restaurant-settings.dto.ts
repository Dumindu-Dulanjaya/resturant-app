import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRestaurantSettingsDto {
  @IsOptional()
  @IsBoolean()
  enableSteward?: boolean;

  @IsOptional()
  @IsBoolean()
  enableHousekeeping?: boolean;

  @IsOptional()
  @IsBoolean()
  enableKds?: boolean;

  @IsOptional()
  @IsBoolean()
  enableReports?: boolean;
}
