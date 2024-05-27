import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerLearnerLicenses } from '../customer-learner-licenses/customer-learner-licenses.entity';
import { Courses } from '../courses/courses.entity';

@Entity()
export class Customers {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100, nullable: true, default: null })
  name: string;

  @ApiProperty()
  @Column({ length: 100, unique: true, nullable: true })
  contactEmail: string;

  @ApiProperty()
  @Column({ length: 100, unique: true, nullable: false })
  customerKey: string;

  @ApiProperty()
  @Generated('uuid')
  @Column({ unique: true, nullable: false })
  customerSecret: string;

  @ApiProperty({ nullable: false, default: true })
  @Column({ default: true })
  isEnabled: boolean;

  @OneToMany(
    () => CustomerLearnerLicenses,
    (customerLearnerLicenses) => customerLearnerLicenses,
  )
  licenses: CustomerLearnerLicenses[];

  @OneToMany(() => Courses, (courses) => courses)
  courses: Courses[];

  @Column({ nullable: false, type: 'int' })
  numberOfLicensesPurchased: number;

  @Column({ nullable: true, type: 'boolean', default: false })
  isLtiV3Customer: boolean;

  @Column({ nullable: true, type: 'varchar', default: 'NA' })
  ltiV3ClientId: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  isLtiV3DeeplinkingEnabled: boolean;

  @Column({ nullable: true, type: 'boolean', default: false })
  isLtiV3GradeServiceEnabled: boolean;

  @Column({ nullable: true, type: 'varchar', default: 'NA' })
  platformURL: string;
}
