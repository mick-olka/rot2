import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrdersService } from './orders.service'
import { Order } from 'src/schemas/order.schema'
import type { PromisePaginationResT } from 'src/utils/interfaces'
import mongoose from 'mongoose'
import { AuthGuard } from '@nestjs/passport'
import { NotFoundInterceptor } from 'src/utils/injectables'

type OrderI = Order & { _id: mongoose.Types.ObjectId }

@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Orders')
@Controller('orders')
@UseInterceptors(NotFoundInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched orders.',
  })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'Orders page',
    example: '1',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    description: 'Orders limit',
    example: '3',
    required: false,
  })
  @ApiQuery({
    name: 'regex',
    type: String,
    description: 'Orders search',
    required: false,
  })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('regex') regex: string,
  ): PromisePaginationResT<OrderI> {
    return this.ordersService.findAll({ page, limit, regex })
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched order.',
  })
  getTodoById(@Param('id') id: string): Promise<OrderI> {
    return this.ordersService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created order.',
  })
  async create(@Body() data: CreateOrderDto): Promise<OrderI> {
    return this.ordersService.create(data)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated order.',
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateOrderDto,
  ): Promise<OrderI> {
    return this.ordersService.update(id, data)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted order.',
  })
  async delete(@Param('id') id: string): Promise<OrderI> {
    return this.ordersService.delete(id)
  }
}
