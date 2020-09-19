# Migration `20200822233301-updated-banned`

This migration has been generated at 8/23/2020, 12:33:01 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Banned" DROP CONSTRAINT "Banned_user_id_fkey"

ALTER TABLE "public"."Banned" DROP COLUMN "user_id",
ADD COLUMN "banner_id" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200822180522-added-banned..20200822233301-updated-banned
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
@@ -24,9 +24,8 @@
   languages     Languages[]
   portfolios    Portfolios[]
   newsletter    Newsletter?
   appreciations Appreciations[]
-  bans          Banned[]
 }
 model Profile {
   id              String @id @default(cuid())
@@ -103,8 +102,7 @@
 model Banned {
   id           String   @id @default(cuid())
   banned_email String
   ban_reason   String
+  banner_id    String
   ban_date     DateTime @default(now())
-  user         User     @relation(fields: [user_id], references: [id])
-  user_id      String
 }
```


