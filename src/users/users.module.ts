import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
      imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
    controllers: [UsersController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
        
        ,
        UsersService,
     PrismaService]
})
export class UsersModule {}
