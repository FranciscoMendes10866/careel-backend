# Migration `20200822233443-updated-banned`

This migration has been generated at 8/23/2020, 12:34:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Banned" DROP COLUMN "banner_id",
ADD COLUMN "user_id" text  NOT NULL ;

ALTER TABLE "public"."Banned" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200822233301-updated-banned..20200822233443-updated-banned
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
@@ -24,8 +24,9 @@
   languages     Languages[]
   portfolios    Portfolios[]
   newsletter    Newsletter?
   appreciations Appreciations[]
+  bans          Banned[]
 }
 model Profile {
   id              String @id @default(cuid())
@@ -102,7 +103,8 @@
 model Banned {
   id           String   @id @default(cuid())
   banned_email String
   ban_reason   String
-  banner_id    String
   ban_date     DateTime @default(now())
+  user         User     @relation(fields: [user_id], references: [id])
+  user_id      String
 }
```


