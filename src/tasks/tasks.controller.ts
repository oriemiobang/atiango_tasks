import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { TasksDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}



    


    // add task
    @UseGuards(AuthGuard)
    @Post('/add-task')
   async addTask(@Body() body: TasksDto, @Req() req){
        return await this.taskService.addTask(body, req.user.id);
    }

    // update task
    @Post()
    updateTask(){

    }

    // get tasks
    @Get()
    getTask(){

    }

    // delete task
    @Delete()
    deleteTask(){
        
    }

    
}
