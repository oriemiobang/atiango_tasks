import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Auth_Provider } from "src/enum/auth_provider.enum";


export class SignUpDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Auth_Provider)
    auth_provider: string;


    @IsString()
    @IsOptional()
    profile_image_url: Auth_Provider;

}