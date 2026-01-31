import { IsBoolean, IsOptional, IsString } from "class-validator";


export class SubTaskDto {

    @IsString()
    title: string;

    @IsOptional()
    @IsBoolean()
    isDone? : boolean;
}