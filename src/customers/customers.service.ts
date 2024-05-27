import { Injectable } from '@nestjs/common';
import { Customers } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
  ) {}
  async getCustomerDataById(id: number): Promise<Customers> {
    const customer = await this.customersRepository.findOne({
      where: { id },
    });
    return customer;
  }
  async getCustomerData(clientId: string): Promise<Customers> {
    const customer = await this.customersRepository.findOne({
      where: { ltiV3ClientId: clientId },
    });
    return customer;
  }

  async upsertPlatform(customer: CreateCustomerDto): Promise<Customers> {
    const newCustomer = await this.customersRepository.save(customer);
    return newCustomer;
  }

  async deleteCustomerData(clientId: string): Promise<boolean> {
    const updated = await this.customersRepository.update(
      {
        ltiV3ClientId: clientId,
      },
      {
        isEnabled: false,
      },
    );
    return updated.affected > 0 ? true : false;
  }

  async updatePlatform(customer: UpdateCustomerDto): Promise<Customers> {
    await this.customersRepository.update(
      {
        ltiV3ClientId: customer.ltiV3ClientId,
      },
      {
        isEnabled: customer.isEnabled,
        ltiV3ClientId: customer.ltiV3ClientId,
        isLtiV3DeeplinkingEnabled: customer.isLtiV3DeeplinkingEnabled,
        isLtiV3GradeServiceEnabled: customer.isLtiV3GradeServiceEnabled,
        numberOfLicensesPurchased: customer.numberOfLicensesPurchased,
      },
    );
    return;
  }
}
