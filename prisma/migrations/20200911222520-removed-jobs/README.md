# Migration `20200911222520-removed-jobs`

This migration has been generated at 9/11/2020, 11:25:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_user_id_fkey"

ALTER TABLE "public"."User" ADD COLUMN "job" boolean   NOT NULL DEFAULT false

DROP TABLE "public"."Job"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200911215842-removed-newsletter..20200911222520-removed-jobs
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
@@ -18,10 +18,10 @@
   terms_conditions Boolean       @default(false)
   is_public        Boolean       @default(false)
   admin            Boolean       @default(false)
   newsletter       Boolean       @default(false)
+  job              Boolean       @default(false)
   profile          Profile?
-  job              Job?
   education        Education[]
   abilities        Abilities[]
   experiences      Experiences[]
   languages        Languages[]
@@ -106,11 +106,4 @@
   receiver_id String
   sender      User     @relation(fields: [sender_id], references: [id])
   sender_id   String
 }
-
-model Job {
-  id        String  @id @default(cuid())
-  found_job Boolean
-  user      User    @relation(fields: [user_id], references: [id])
-  user_id   String  @unique
-}
```


