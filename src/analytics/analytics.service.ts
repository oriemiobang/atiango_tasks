import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService){}


    async taskSummary(userId: number) {
  const [total, completed, pending] = await Promise.all([
    this.prisma.task.count({ where: { userId } }),
    this.prisma.task.count({
      where: { userId, status: 'COMPLETED' },
    }),
    this.prisma.task.count({
      where: {
        userId,
        status: { not: 'COMPLETED' },
      },
    }),
  ]);

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, pending, completionRate };
}

async completedToday(userId: number) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return this.prisma.task.count({
    where: {
      userId,
      status: 'COMPLETED',
      updatedAt: {
        gte: start,
        lte: end,
      },
    },
  });
}


async weeklyOverview(userId: number) {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  return this.prisma.task.groupBy({
    by: ['updatedAt'],
    where: {
      userId,
      status: 'COMPLETED',
      updatedAt: {
        gte: startOfWeek,
      },
    },
    _count: { id: true },
  });
}



async bestDay(userId: number) {
  const result = await this.prisma.$queryRaw<
    { date: Date; count: number }[]
  >`
    SELECT 
      DATE("updatedAt") AS date,
      COUNT(*)::int AS count
    FROM "Task"
    WHERE "userId" = ${userId}
      AND status = 'COMPLETED'
    GROUP BY DATE("updatedAt")
    ORDER BY count DESC
    LIMIT 1
  `;

  return result[0] ?? null;
}



async currentStreak(userId: number) {
  const dates = await this.prisma.$queryRaw<
    { date: string }[]
  >`
    SELECT DISTINCT DATE("updatedAt") as date
    FROM "Task"
    WHERE "userId" = ${userId}
      AND status = 'COMPLETED'
    ORDER BY date DESC
  `;

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const row of dates) {
    const taskDate = new Date(row.date);
    taskDate.setHours(0, 0, 0, 0);

    if (
      taskDate.getTime() === current.getTime()
    ) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}



async averagePerDay(userId: number) {
  const result = await this.prisma.$queryRaw<
    { avg: number }[]
  >`
    SELECT ROUND(AVG(count), 1) as avg FROM (
      SELECT DATE("updatedAt"), COUNT(*) as count
      FROM "Task"
      WHERE "userId" = ${userId}
        AND status = 'COMPLETED'
      GROUP BY DATE("updatedAt")
    ) t
  `;

  return result[0]?.avg ?? 0;
}


async dashboard(userId: number) {
  const [
    summary,
    today,
    streak,
    bestDay,
    average,
  ] = await Promise.all([
    this.taskSummary(userId),
    this.completedToday(userId),
    this.currentStreak(userId),
    this.bestDay(userId),
    this.averagePerDay(userId),
  ]);

  return {
    summary,
    todayCompleted: today,
    streak,
    bestDay,
    average,
  };
}


}
