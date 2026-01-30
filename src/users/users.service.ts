import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService, private jwtService: JwtService){}

   async signup(payload: SignUpDto): Promise<{id: number; email: string}>{

    const existingUser = await this.prisma.user.findFirst({
        where: {
            email: payload.email
        }
    })

    if(existingUser){
        throw new BadRequestException("User with this email already Exist");

    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
        return  await this.prisma.user.create({
            data: payload,
            select: {
                id: true,
                email: true
            }

        });
    }

   async  signin(signinDto: SigninDto): Promise<{accessToken: string}>{

    const user  = await this.prisma.user.findFirst({
        where: {
            email: signinDto.email
        }
    })

    if(!user){
        throw new BadRequestException("Invalid email")
    }

    const isPasswordValid = await bcrypt.compare(signinDto.password, user.password);
    if(!isPasswordValid){
        throw new UnauthorizedException("Invalid Password");
    }

    const token  = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
    })

    return {accessToken: token}
        
    }


    
}
