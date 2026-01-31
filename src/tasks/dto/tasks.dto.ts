import { IsArray, IsDateString, IsEnum, IsISO8601, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
// import { StatusEnum } from "src/enum/status.enum";
import { Status_Enum } from '@prisma/client';
import { Type } from "class-transformer";
import { SubTaskDto } from "./sub_task.dto";

 

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubTaskDto)
  subtasks?: SubTaskDto[];

 }