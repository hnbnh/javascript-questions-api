import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class LanguageEntity {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  code!: string;

  @Property({ unique: true })
  name!: string;
}
