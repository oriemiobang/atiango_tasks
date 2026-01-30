import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from './users.service';
import { Public } from './auth/public.decorator';

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



}
