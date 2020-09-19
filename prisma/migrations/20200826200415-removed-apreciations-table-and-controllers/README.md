# Migration `20200826200415-removed-apreciations-table-and-controllers`

This migration has been generated at 8/26/2020, 9:04:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Appreciations" DROP CONSTRAINT "Appreciations_user_id_fkey"

DROP TABLE "public"."Appreciations"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200826193753-updated-user-follows..20200826200415-removed-apreciations-table-and-controllers
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -23,9 +23,8 @@
   experiences   Experiences[]
   languages     Languages[]
   portfolios    Portfolios[]
   newsletter    Newsletter?
-  appreciations Appreciations[]
   bans          Banned[]
   messages      Messages[]
   followed_by   User[]          @relation("UserFollows", references: [id])
   following     User[]          @relation("UserFollows", references: [id])
@@ -95,15 +94,8 @@
   user          User    @relation(fields: [user_id], references: [id])
   user_id       String  @unique
 }
-model Appreciations {
-  id             String @id @default(cuid())
-  appreciated_id String
-  user           User   @relation(fields: [user_id], references: [id])
-  user_id        String
-}
-
 model Banned {
   id           String   @id @default(cuid())
   banned_email String   @unique
   ban_reason   String
```


