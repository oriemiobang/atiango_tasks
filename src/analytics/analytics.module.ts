import { Module } from '@nestjs/common';
// import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from 'src/prisma.service';
import { AnalyticsController } from './analytics.controller';
import { JwtStrategy } from 'src/users/auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';

@Module({
    controllers: [AnalyticsController],
    providers: [
          JwtStrategy,
                  {
                    provide: APP_GUARD,
                    useClass: JwtAuthGuard,
                  },
        PrismaService,
        AnalyticsService]
})
export class AnalyticsModule {}
