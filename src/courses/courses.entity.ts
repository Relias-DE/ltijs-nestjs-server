import { CoursesAssignedToCustomer } from '../courses-assigned-to-customer/courses-assigned-to-customer.entity';
import { Exams } from '../exams/exams.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'float', default: 0 })
  duration: string;

  @Column({ length: 100, nullable: true })
  code: string;

  @Index({ fulltext: true })
  @Column({ type: 'text', nullable: false })
  description: string;

  @Index({ fulltext: true })
  @Column({ type: 'text', nullable: false })
  outline: string;

  @Index({ fulltext: true })
  @Column({ type: 'text', nullable: false })
  goal: string;

  @Index({ fulltext: true })
  @Column({ type: 'text', nullable: true })
  contributor: string;

  @Column({ nullable: true, type: 'timestamptz' })
  releasedAt: Date;

  @Column({ nullable: true })
  accreditationAvailable: string;

  @Column({ nullable: true })
  rbp: number;

  @Column({ nullable: true, type: 'timestamptz' })
  lastSync: Date;

  @Column({ length: 750, unique: true, nullable: true })
  thumbnailUrl: string;

  @Column({ length: 750, unique: true, nullable: true })
  transcriptUrl: string;

  @Column({ length: 750, unique: true, nullable: true })
  scormUrl: string;

  @OneToMany(
    () => CoursesAssignedToCustomer,
    (coursesAssignedToCustomer) => coursesAssignedToCustomer.course,
  )
  coursesAssignedToCustomer: CoursesAssignedToCustomer[];

  @OneToOne(() => Exams, (exams) => exams.course)
  @JoinColumn()
  exams: Exams;

  @Column({ nullable: false })
  expirationAt: Date;

  @Column({ nullable: true })
  replacementModule: string;
}
