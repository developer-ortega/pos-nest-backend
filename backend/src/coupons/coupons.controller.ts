import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe.js';
import { CouponsService } from './coupons.service.js';
import { CreateCouponDto } from './dto/create-coupon.dto.js';
import { UpdateCouponDto } from './dto/update-coupon.dto.js';
import { ApplyCouponDto } from './dto/apply-coupon.dto.js';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.couponsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.couponsService.remove(+id);
  }

  @Post('/apply-coupon')
  @HttpCode(HttpStatus.OK)
  applyCoupon(@Body() applyCouponDto: ApplyCouponDto){
    return this.couponsService.applyCoupon(applyCouponDto.coupon_name)
  }
}
