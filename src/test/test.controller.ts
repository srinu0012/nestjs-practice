import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Redirect,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TestService, User } from './test.service';
import { UserDto } from 'src/test/user-dto/userDto';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller({ path: 'test' })
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/users')
  getUsers(): User[] {
    return this.testService.getUsers();
  }

  @Get('/user/:id')
  getUser(@Param() data: { id: number }): User {
    return this.testService.getUser(data.id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post('/user')
  @Header('json', 'yes')
  @Header('Cache-Control', 'no-store')
  @HttpCode(StatusCodes.CREATED)
  //   @Redirect('3', 301)
  addUser(@Body() data: UserDto) {
    return this.testService.addUser(data);
    // res.status(200).send(this.testService.addUser(data));
  }

  @Delete('/user/:id')
  deleteUser(@Param() data: { id: number }) {
    return this.testService.deleteUser(data.id);
  }

  @Put('/user/:id/:name')
  updateUser(@Param() data: User) {
    console.log(data);

    return this.testService.updateUsernameById(data.id, data.name);
  }
}
