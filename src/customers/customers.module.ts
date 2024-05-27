import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customers.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
