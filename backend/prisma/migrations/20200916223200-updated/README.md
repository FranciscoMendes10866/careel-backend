# Migration `20200916223200-updated`

This migration has been generated at 9/16/2020, 11:32:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Security" ADD COLUMN "device_type" text   NOT NULL DEFAULT E'Não defenido.'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200915132719-add-security..20200916223200-updated
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
@@ -112,8 +112,9 @@
 model Security {
   id              String   @id @default(cuid())
   login_date      DateTime @default(now())
   device_product  String
+  device_type     String   @default("Não defenido.")
   device_platform String
   device_ip       String
   device_allowed  Boolean  @default(true)
   user            User     @relation(fields: [user_id], references: [id])
```


