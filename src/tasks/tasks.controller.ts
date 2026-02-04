import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { TasksDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { Status_Enum } from '@prisma/client';
import { stat } from 'fs';
import { SubTaskDto } from './dto/sub_task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    // add task
    @Post('/add-task')
   async addTask(@Body() body: TasksDto, @Req() req){
        return await this.taskService.addTask(body, req.user.id);
    }

    // update task
    @Patch('/update-task/:id')
     async  updateTask(@Body() body: TasksDto, @Param('id') taskId: number){
        return await this.taskService.updateTask(body, +taskId );
    }

    // get tasks
    @Get('/get-tasks')
   async getTasks(@Req() req){
    return this.taskService.getAllTask(req.user.id);
    }

    // delete task
    @Delete('/delete-task/:id')
   async deleteTask(@Param('id') id: number, @Req() req){
        return await this.taskService.deleteTask(+id, req.user.id);
        
    }


    @Patch('/update-sort-order/:id')
    async updateSortOrder(@Param('id') taskId:number, @Body('sort_order') sortId: number, @Req() req){
       return this.taskService.updateTaskOrder(+taskId, req.user.id,+sortId)

    }

    @Patch('/update-status/:id')
    async updateStatus (@Param('id') taskId: number, @Body('status') status: Status_Enum, @Req() req){
       return await  this.taskService.updateStatus(req.user.id, +taskId, status)
    }


    @Patch('/update-subTask/:taskId/subtask/:subTaskId')
    updateSubTask(@Param('taskId') taskId: number,
    @Param('subTaskId') subTaskId: number,
    @Body() dto: SubTaskDto,){ 
       return this.taskService.updateSubTask(+taskId, +subTaskId, dto);
}
    
}
