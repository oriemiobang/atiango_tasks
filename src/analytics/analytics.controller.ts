import { Controller, Get, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {

    constructor(private analyticsService: AnalyticsService){}


    @Get('/summary')
    async Summary(@Req() req){
        return await this.analyticsService.taskSummary(req.user.id)
    }

    @Get('/completed-today')
    async CompletedToday(@Req() req){
        return await this.analyticsService.completedToday(req.user.id)
    }

    @Get('/weekly-overview')
   async WeeklyOverview(@Req() req){
        return await this.analyticsService.weeklyOverview(req.user.id)
    }


    @Get('/best-day')
   async BestDay(@Req() req){
        return await this.analyticsService.bestDay(req.user.id)
    }

    @Get('/current-streak')
    async CurrentStreak(@Req() req){
       return   await this.analyticsService.currentStreak(req.user.id)
    }


    @Get('/average-per-day')
    async AveragePerDay(@Req() req){
      return await this.analyticsService.averagePerDay(req.user.id)
    }


    @Get('dashboard')
    async Dashboard(@Req() req){
      return  await this.analyticsService.dashboard(req.user.id)
    }
}
