import { IsBoolean, IsOptional, IsString } from "class-validator";



export class NotificationsDto {

    @IsString()
    title: string;

    @IsString()
    description: string

    @IsOptional()
    @IsBoolean()
    isRead: boolean;
}