import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOS/user.dto';
import { User } from './entities/user.entity';
import { CreateTweetDto } from './DTOS/tweet.dto';

@Injectable()
export class AppService {
  private tweets = []
  private users = []

  constructor(){
    this.tweets= []
    this.users = []
  }


  createUser(body: CreateUserDto){
    this.users.push(body)
  }

  createTweet(body: CreateTweetDto){
    const {username, tweet} = body
    const userfind = this.users.find((u) => u.username === username);
    if (!userfind) throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED)

    const tweetObj = {username, tweet, avatar: userfind.avatar}

    this.tweets.push(tweetObj)
  }


}
