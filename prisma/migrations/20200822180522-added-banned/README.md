# Migration `20200822180522-added-banned`

This migration has been generated at 8/22/2020, 7:05:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Banned" (
"id" text  NOT NULL ,
"banned_email" text  NOT NULL ,
"ban_reason" text  NOT NULL ,
"ban_date" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"user_id" text  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."Banned" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200821215159-added-appreciations..20200822180522-added-banned
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
@@ -97,4 +98,13 @@
   appreciated_id String
   user           User   @relation(fields: [user_id], references: [id])
   user_id        String
 }
+
+model Banned {
+  id           String   @id @default(cuid())
+  banned_email String
+  ban_reason   String
+  ban_date     DateTime @default(now())
+  user         User     @relation(fields: [user_id], references: [id])
+  user_id      String
+}
```


