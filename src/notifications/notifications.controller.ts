import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from 'src/users/auth/auth.guard';
import { NotificationsDto } from './dto/notifications.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {

    constructor(private notificationService: NotificationsService){}

    @Post('/add-notification')
   async AddNotification(@Body() body: NotificationsDto, @Req() req){
        return await this.notificationService.AddNotification(body, req.user.id)
    }

    @Patch('/read-notification/:id')
    async ReadNotification(@Param('id') id: number, @Body('isRead') body: boolean){
        return await this.notificationService.ReadNotification(+id, body)
    }

    @Delete('/delete-notification/:id')
   async DeleteNotification(@Param('id') id: number){
        return await this.notificationService.DeleteNotification(+id);
    }

    @Get('/get-notifications')
   async GetNotification(@Req() req){
        return await this.notificationService.GetNotifications(req.user.id)

    }
    
}
