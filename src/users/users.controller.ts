import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from './users.service';
import { Public } from './auth/public.decorator';
import { UpdateNameDto } from './dto/update_name.dto';

import { UpdatePasswordDto } from './dto/update_password.dto';

@Controller('auth')
export class UsersController {


    constructor(private userService: UsersService){}


    // sign in a user
    @Public()
    @Post('/signin')
    async signin(@Body() body: SigninDto){
        return  this.userService.signin(body)

    }


    // sign up a user
    @Public()
    @Post('/signup')
  async  signup(@Body() body: SignUpDto){
        return  this.userService.signup(body);
    }



    @Post('/update-name')
    updateName(@Body() body: UpdateNameDto, @Req() req){
        const userId = req.user.id;
        return this.userService.updateName(userId, body.name);
    }

    @Post('/update-password')
    updatePassword(@Body() body: UpdatePasswordDto, @Req() req){
        const userId = req.user.id;
        return this.userService.updatePassword(userId, body.password);
    }



}
