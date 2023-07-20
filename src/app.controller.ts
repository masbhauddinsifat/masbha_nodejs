import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/signup')
  signup(@Body(ValidationPipe) userCredential: SignUpDTO) {
    try {
      return this.appService.signup(userCredential);
    } catch (error) {
      return error;
    }
  }

  @Post('auth/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body(ValidationPipe) userCredential: LoginDTO) {
    try {
      // return this.authService.signin(userCredential);
    } catch (error) {
      return error;
    }
  }
}
