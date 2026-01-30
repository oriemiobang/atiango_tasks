import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {



    


    // add task
    @Post()
    addTask(){}

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
