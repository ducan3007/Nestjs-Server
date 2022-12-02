import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guard/Jwt.guard'

@Controller('user')
export class UserController {}
