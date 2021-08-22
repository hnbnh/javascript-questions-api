import { Migration } from '@mikro-orm/migrations';

export class Migration20210822133952 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "quiz_entity" ("id" serial primary key, "code" text null);');

    this.addSql('create table "quiz_option_entity" ("quiz_id" int not null, "label" varchar(255) not null, "option" text not null);');
    this.addSql('alter table "quiz_option_entity" add constraint "quiz_option_entity_pkey" primary key ("quiz_id", "label");');

    this.addSql('create table "quiz_translation_entity" ("quiz_id" int not null, "question" text not null, "answer" varchar(255) not null, "explanation" text not null);');
    this.addSql('alter table "quiz_translation_entity" add constraint "quiz_translation_entity_pkey" primary key ("quiz_id");');

    this.addSql('create table "language_entity" ("id" serial primary key, "code" varchar(255) not null, "name" varchar(255) not null);');
    this.addSql('alter table "language_entity" add constraint "language_entity_code_unique" unique ("code");');
    this.addSql('alter table "language_entity" add constraint "language_entity_name_unique" unique ("name");');

    this.addSql('create table "language_entity_quiz_translation" ("language_entity_id" int not null, "quiz_translation_entity_quiz_id" int not null);');
    this.addSql('alter table "language_entity_quiz_translation" add constraint "language_entity_quiz_translation_pkey" primary key ("language_entity_id", "quiz_translation_entity_quiz_id");');

    this.addSql('create table "quiz_translation_entity_language" ("quiz_translation_entity_quiz_id" int not null, "language_entity_id" int not null);');
    this.addSql('alter table "quiz_translation_entity_language" add constraint "quiz_translation_entity_language_pkey" primary key ("quiz_translation_entity_quiz_id", "language_entity_id");');

    this.addSql('alter table "quiz_option_entity" add constraint "quiz_option_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade;');

    this.addSql('alter table "quiz_translation_entity" add constraint "quiz_translation_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "language_entity_quiz_translation" add constraint "language_entity_quiz_translation_language_entity_id_foreign" foreign key ("language_entity_id") references "language_entity" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "language_entity_quiz_translation" add constraint "language_entity_quiz_translation_quiz_translation__4e567_foreign" foreign key ("quiz_translation_entity_quiz_id") references "quiz_translation_entity" ("quiz_id") on update cascade on delete cascade;');

    this.addSql('alter table "quiz_translation_entity_language" add constraint "quiz_translation_entity_language_quiz_translation__40757_foreign" foreign key ("quiz_translation_entity_quiz_id") references "quiz_translation_entity" ("quiz_id") on update cascade on delete cascade;');
    this.addSql('alter table "quiz_translation_entity_language" add constraint "quiz_translation_entity_language_language_entity_id_foreign" foreign key ("language_entity_id") references "language_entity" ("id") on update cascade on delete cascade;');
  }

}
