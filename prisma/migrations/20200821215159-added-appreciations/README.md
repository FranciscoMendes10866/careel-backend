# Migration `20200821215159-added-appreciations`

This migration has been generated at 8/21/2020, 10:51:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Appreciations" (
"id" text  NOT NULL ,
"appreciated_id" text  NOT NULL ,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."Appreciations" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200809110909-added-admin-field..20200821215159-added-appreciations
--- datamodel.dml
+++ datamodel.dml
@@ -2,29 +2,30 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id          String        @id @default(cuid())
-  email       String        @unique
-  password    String
-  role        String
-  is_public   Boolean       @default(false)
-  admin       Boolean       @default(false)
-  profile     Profile?
-  education   Education[]
-  abilities   Abilities[]
-  experiences Experiences[]
-  languages   Languages[]
-  portfolios  Portfolios[]
-  newsletter  Newsletter?
+  id            String          @id @default(cuid())
+  email         String          @unique
+  password      String
+  role          String
+  is_public     Boolean         @default(false)
+  admin         Boolean         @default(false)
+  profile       Profile?
+  education     Education[]
+  abilities     Abilities[]
+  experiences   Experiences[]
+  languages     Languages[]
+  portfolios    Portfolios[]
+  newsletter    Newsletter?
+  appreciations Appreciations[]
 }
 model Profile {
   id              String @id @default(cuid())
@@ -89,4 +90,11 @@
   is_subscribed Boolean @default(false)
   user          User    @relation(fields: [user_id], references: [id])
   user_id       String  @unique
 }
+
+model Appreciations {
+  id             String @id @default(cuid())
+  appreciated_id String
+  user           User   @relation(fields: [user_id], references: [id])
+  user_id        String
+}
```


