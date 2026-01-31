import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { StatusEnum } from 'src/enum/status.enum';
import { PrismaService } from 'src/prisma.service';
import { TasksDto } from './dto/tasks.dto';
import { connect } from 'http2';
import { Status_Enum } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}


  async addTask(payload: TasksDto, userId: number) {
  return await this.prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      sort_order: payload.sort_order,
      status: payload.status,
      start_time: new Date(payload.start_time),
      deadline: payload.deadline ? new Date(payload.deadline) : null,

      subTask: payload.subtasks
        ? {
            create: payload.subtasks.map(subtask => ({
              title: subtask.title,
              isD: subtask.isDone ?? false,
            })),
          }
        : undefined,

      user: {
        connect: { id: userId },
      },
    },

    include: {
      subTask: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}


   async updateTask(payload: TasksDto, taskId:number){
        const task = await this.prisma.task.findUnique({
            where: {id: taskId}
        })
         if(!task){
        throw new NotFoundException("Task not found")
       }

       return await this.prisma.task.update({
        where: {id: taskId},
        data: {
                title: payload.title,
                description: payload.description,
                sort_order: payload.sort_order,
                status: payload.status,
                start_time: new Date(payload.start_time),
                deadline: payload.deadline ? new Date(payload.deadline) : null,

        }
       })


    }

   
   async deleteTask(taskId: number, userId: number){
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId
            }
        });
        if(!task){
            throw new NotFoundException("Task Not found");
        }

        if(task.userId !== userId){
            throw new ForbiddenException("You are not authorized to delete this task");
        }
        await this.prisma.task.delete({
            where: {id: taskId}
        });

        return {message: "Task deleted successfully"}
    }

 async getAllTask(userId: number) {
  const tasks = await this.prisma.task.findMany({
    where: {
      userId, 
    },
    include: {
      subTask: {
        orderBy: {
          id: 'asc',
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      sort_order: 'asc',
    },
  });

  if (!tasks.length) {
    throw new NotFoundException('No tasks found');
  }

  return tasks;
}


async updateTaskOrder(taskId: number, userId: number, taskOrder: number) {
  const task = await this.prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new NotFoundException("Task not found");
  }

  if (task.userId !== userId) {
    throw new ForbiddenException("You cannot update another user's task");
  }

  return await this.prisma.task.update({
    where: { id: taskId },
    data: {
      sort_order: taskOrder,
    },
    select: {
      id: true,
      title: true,
      sort_order: true,
    },
  });
}


async updateStatus(userId: number, taskId: number, status: Status_Enum){

    const task = await this.prisma.task.findUnique({
        where: {
            id: taskId
        }
    })

    if(!task){
        throw new NotFoundException("Task Not Found!")
    }

    if(task.userId !== userId){
        throw new UnauthorizedException("You are not Authorized to change this")
    }

    return await this.prisma.task.update({
        where: {
            id: taskId}, 
        data: {
             status: status
            }, 
        select: {
            title: true,
            status: true
        }
    })
}



}
