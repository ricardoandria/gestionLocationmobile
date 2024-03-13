import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  designVoiture: string;

  @IsNotEmpty()
  @IsNumber()
  nombreJour: number;

  @IsNotEmpty()
  @IsNumber()
  tauxJournalier: number;
}
