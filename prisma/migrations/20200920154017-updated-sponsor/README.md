# Migration `20200920154017-updated-sponsor`

This migration has been generated at 9/20/2020, 4:40:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Sponsorships" DROP COLUMN "still_online"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200920152439-updated-sponsors..20200920154017-updated-sponsor
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
@@ -126,8 +126,7 @@
   id           String   @id @default(cuid())
   sponsor_date DateTime @default(now())
   sponsor_logo String?
   sponsor_link String?
-  still_online Boolean  @default(true)
   user         User     @relation(fields: [user_id], references: [id])
   user_id      String   @unique
 }
```


