import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Module({
    controllers: [TasksController],
    providers: [
         {
            provide: APP_GUARD,
            useClass: AuthGuard
         },
        PrismaService, TasksService]
})
export class TasksModule {}
