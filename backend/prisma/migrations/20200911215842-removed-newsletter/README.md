# Migration `20200911215842-removed-newsletter`

This migration has been generated at 9/11/2020, 10:58:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Newsletter" DROP CONSTRAINT "Newsletter_user_id_fkey"

ALTER TABLE "public"."User" ADD COLUMN "newsletter" boolean   NOT NULL DEFAULT false

DROP TABLE "public"."Newsletter"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200831213329-created-job-entity..20200911215842-removed-newsletter
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
@@ -17,16 +17,16 @@
   role             String
   terms_conditions Boolean       @default(false)
   is_public        Boolean       @default(false)
   admin            Boolean       @default(false)
+  newsletter       Boolean       @default(false)
   profile          Profile?
   job              Job?
   education        Education[]
   abilities        Abilities[]
   experiences      Experiences[]
   languages        Languages[]
   portfolios       Portfolios[]
-  newsletter       Newsletter?
   bans             Banned[]
   messages         Messages[]
   followed_by      User[]        @relation("UserFollows", references: [id])
   following        User[]        @relation("UserFollows", references: [id])
@@ -89,15 +89,8 @@
   user         User   @relation(fields: [user_id], references: [id])
   user_id      String
 }
-model Newsletter {
-  id            String  @id @default(cuid())
-  is_subscribed Boolean @default(false)
-  user          User    @relation(fields: [user_id], references: [id])
-  user_id       String  @unique
-}
-
 model Banned {
   id           String   @id @default(cuid())
   banned_email String   @unique
   ban_reason   String
```


