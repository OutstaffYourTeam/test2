import { AbstractEntity } from 'src/core/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('models')
export class ModelEntity extends AbstractEntity {
  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'varchar', default: 'ffffff', length: 6 })
  color: string;

  @Column({ type: 'float', default: 0 })
  width: number;

  @Column({ type: 'float', default: 0 })
  height: number;

  @Column({ type: 'float', default: 0 })
  depth: number;
}
