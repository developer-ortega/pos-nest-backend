import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service.js';
import { CouponsController } from './coupons.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService]
})
export class CouponsModule {}
