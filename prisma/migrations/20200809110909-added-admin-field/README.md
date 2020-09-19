# Migration `20200809110909-added-admin-field`

This migration has been generated at 8/9/2020, 12:09:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "admin" boolean  NOT NULL DEFAULT false;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200809093405-added-newsletter..20200809110909-added-admin-field
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
@@ -15,8 +15,9 @@
   email       String        @unique
   password    String
   role        String
   is_public   Boolean       @default(false)
+  admin       Boolean       @default(false)
   profile     Profile?
   education   Education[]
   abilities   Abilities[]
   experiences Experiences[]
```


