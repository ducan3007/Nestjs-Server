import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put, Post, Query, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guard/Jwt.guard'
import { UserProfileUpdate } from './dtos/user-profile.dto'
import { UserService } from './user.service'
import { response } from 'utils/helper'
import { AuthUser } from 'decorator/user.decorator'

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserProfile(@AuthUser() user, @Body() body: UserProfileUpdate) {
    return response(await this.userService.updateUserProfile(user, body))
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserProfile(@Param() param: any) {
    return response(await this.userService.getUserById(param?.id))
  }
}
