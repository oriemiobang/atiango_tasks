import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class UsersController {



    // sign in a user
    @Post('/signin')
    signin(){
        return 'User signed in';

    }


    // sign up a user
    @Post('/signup')
    signup(){
        return 'User signed up';
    }

}
