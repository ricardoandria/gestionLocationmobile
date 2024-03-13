import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Location } from './types';
import { LocationDto } from './dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocationById(id: number): Promise<Location | null> {
    const location = await this.prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      throw new ForbiddenException('this location does not exist');
    }

    return location;
  }

  async getLocations(): Promise<Location[]> {
    const location = await this.prisma.location.findMany();

    if (location.length == 0) {
      throw new ForbiddenException('no location found');
    }

    return location;
  }

  async createLocation(dto: LocationDto): Promise<Location> {
    return this.prisma.location.create({
      data: {
        nom: dto.nom,
        designVoiture: dto.designVoiture,
        nombreJour: Number(dto.nombreJour),
        tauxJournalier: Number(dto.tauxJournalier),
      },
    });
  }

  async updateLocation(id: number, dto: LocationDto): Promise<Location> {
    const location = await this.prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      throw new ForbiddenException('this location does not exist');
    }

    return this.prisma.location.update({
      data: {
        nom: dto.nom,
        designVoiture: dto.designVoiture,
        nombreJour: Number(dto.nombreJour),
        tauxJournalier: Number(dto.tauxJournalier),
      },
      where: {
        id,
      },
    });
  }

  async deleteLocation(id: number): Promise<Location> {
    return this.prisma.location.delete({
      where: {
        id,
      },
    });
  }
}
