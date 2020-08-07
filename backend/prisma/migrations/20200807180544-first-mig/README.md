# Migration `20200807180544-first-mig`

This migration has been generated at 8/7/2020, 7:05:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" text  NOT NULL ,
"email" text  NOT NULL ,
"password" text  NOT NULL ,
"role" text  NOT NULL ,
"is_public" boolean  NOT NULL DEFAULT false,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Profile" (
"id" text  NOT NULL ,
"first_name" text  NOT NULL ,
"last_name" text  NOT NULL ,
"country" text  NOT NULL ,
"city" text  NOT NULL ,
"description" text  NOT NULL ,
"job_title" text  NOT NULL ,
"field" text  NOT NULL ,
"contact" text  NOT NULL ,
"profile_picture" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Education" (
"id" text  NOT NULL ,
"course_name" text  NOT NULL ,
"course_level" text  NOT NULL ,
"course_college" text  NOT NULL ,
"course_date" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Abilities" (
"id" text  NOT NULL ,
"ability" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Experiences" (
"id" text  NOT NULL ,
"job_title" text  NOT NULL ,
"company_name" text  NOT NULL ,
"project_name" text  NOT NULL ,
"project_link" text  NOT NULL ,
"job_date" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Languages" (
"id" text  NOT NULL ,
"language" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Portfolios" (
"id" text  NOT NULL ,
"website_name" text  NOT NULL ,
"website_link" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "Profile.contact_unique" ON "public"."Profile"("contact")

CREATE UNIQUE INDEX "Profile.user_id_unique" ON "public"."Profile"("user_id")

ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Abilities" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Experiences" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Languages" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Portfolios" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200807180544-first-mig
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,83 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id          String        @id @default(cuid())
+  email       String        @unique
+  password    String
+  role        String
+  is_public   Boolean       @default(false)
+  profile     Profile?
+  education   Education[]
+  abilities   Abilities[]
+  experiences Experiences[]
+  languages   Languages[]
+  portfolios  Portfolios[]
+}
+
+model Profile {
+  id              String @id @default(cuid())
+  first_name      String
+  last_name       String
+  country         String
+  city            String
+  description     String
+  job_title       String
+  field           String
+  contact         String @unique
+  profile_picture String
+  user            User   @relation(fields: [user_id], references: [id])
+  user_id         String @unique
+}
+
+model Education {
+  id             String @id @default(cuid())
+  course_name    String
+  course_level   String
+  course_college String
+  course_date    String
+  user           User   @relation(fields: [user_id], references: [id])
+  user_id        String
+}
+
+model Abilities {
+  id      String @id @default(cuid())
+  ability String
+  user    User   @relation(fields: [user_id], references: [id])
+  user_id String
+}
+
+model Experiences {
+  id           String @id @default(cuid())
+  job_title    String
+  company_name String
+  project_name String
+  project_link String
+  job_date     String
+  user         User   @relation(fields: [user_id], references: [id])
+  user_id      String
+}
+
+model Languages {
+  id       String @id @default(cuid())
+  language String
+  user     User   @relation(fields: [user_id], references: [id])
+  user_id  String
+}
+
+model Portfolios {
+  id           String @id @default(cuid())
+  website_name String
+  website_link String
+  user         User   @relation(fields: [user_id], references: [id])
+  user_id      String
+}
```


