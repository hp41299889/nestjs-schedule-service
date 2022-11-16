//import packages
import { Module } from '@nestjs/common';

//import modules
import { ConfigModule } from 'src/config/config.module';
//import controllers
import { AuthController } from './auth.controller';
//import services
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
