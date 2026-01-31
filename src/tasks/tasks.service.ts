import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusEnum } from 'src/enum/status.enum';
import { PrismaService } from 'src/prisma.service';
import { TasksDto } from './dto/tasks.dto';
import { connect } from 'http2';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}


  async  addTask(payload: TasksDto, userId:number){

        return await this.prisma.task.create({
            data:{
                title: payload.title,
                description: payload.description,
                sort_order: payload.sort_order,
                status: payload.status,
                start_time: new Date(payload.start_time),
                deadline: payload.deadline ? new Date(payload.deadline) : null,

             
            user: {
                connect: {id: userId}
            },
           },select: {
            title: true,
            description: true,
            status: true,
            start_time: true,
            deadline:true
           }
        })



    }

    updateTask(){

    }

    deleteTask(){}

    getAllTask(){

    }


}
