import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOS/user.dto';
import { User } from './entities/user.entity';
import { CreateTweetDto } from './DTOS/tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private tweets = []
  private users = []

  constructor(){
    this.tweets= []
    this.users = []
  }

  getHealth(): string {
    return "I'm okay!";
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

  showLast15Tweets(page: number){
    if (page === undefined || page === null) {
      page = 1
    }
    const pageNumber = Number(page)

    if (pageNumber < 1) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)

    const firstIndex = (pageNumber - 1) * 15
    const lastIndex = firstIndex + 15
    const allTweets = this.tweets.reverse()

    return allTweets.slice(firstIndex, lastIndex)
  }

  userTweets(username: string){
    return this.tweets.filter(tweets => tweets.username === username)
  }
}
