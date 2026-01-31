import { IsDateString, IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";
// import { StatusEnum } from "src/enum/status.enum";
import { Status_Enum } from '@prisma/client';

 

 export class TasksDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    sort_order: number;

    @IsEnum(Status_Enum)
    status: Status_Enum;

    @IsISO8601()
   start_time: string;


   @IsOptional()
   @IsISO8601()
   deadline?: string;

 }