import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [LocationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
