import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './DTOS/user.dto';
import { response } from 'express';
import { CreateTweetDto } from './DTOS/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUserDto) {
      return this.appService.createUser(body)
  }

  @Post('tweets')
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() body: CreateTweetDto) {
      return this.appService.createTweet(body)
  }

  @Get('tweets')
  showTweets(@Query('page') page: number) {
    return this.appService.showLast15Tweets(page)
  }

}