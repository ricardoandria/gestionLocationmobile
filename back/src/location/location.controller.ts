import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './types';
import { LocationDto } from './dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/:id')
  async getLocationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Location | null> {
    return await this.locationService.getLocationById(id);
  }

  @Get()
  async getLocation(): Promise<Location[]> {
    return await this.locationService.getLocations();
  }

  @Post()
  async createLocation(@Body() dto: LocationDto): Promise<Location> {
    return await this.locationService.createLocation(dto);
  }

  @Put('/:id')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: LocationDto,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, dto);
  }

  @Delete('/:id')
  async deleteLocation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Location> {
    return this.locationService.deleteLocation(id);
  }
}
