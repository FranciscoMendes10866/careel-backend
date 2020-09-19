# Migration `20200822234503-updated-banned`

This migration has been generated at 8/23/2020, 12:45:03 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Banned.banned_email_unique" ON "public"."Banned"("banned_email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200822233443-updated-banned..20200822234503-updated-banned
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
@@ -101,9 +101,9 @@
 }
 model Banned {
   id           String   @id @default(cuid())
-  banned_email String
+  banned_email String   @unique
   ban_reason   String
   ban_date     DateTime @default(now())
   user         User     @relation(fields: [user_id], references: [id])
   user_id      String
```


