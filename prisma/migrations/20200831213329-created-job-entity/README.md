# Migration `20200831213329-created-job-entity`

This migration has been generated at 8/31/2020, 10:33:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Job" (
"id" text   NOT NULL ,
"found_job" boolean   NOT NULL ,
"user_id" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Job.user_id_unique" ON "public"."Job"("user_id")

ALTER TABLE "public"."Job" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200831205958-added-terms-firld..20200831213329-created-job-entity
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
@@ -18,8 +18,9 @@
   terms_conditions Boolean       @default(false)
   is_public        Boolean       @default(false)
   admin            Boolean       @default(false)
   profile          Profile?
+  job              Job?
   education        Education[]
   abilities        Abilities[]
   experiences      Experiences[]
   languages        Languages[]
@@ -112,4 +113,11 @@
   receiver_id String
   sender      User     @relation(fields: [sender_id], references: [id])
   sender_id   String
 }
+
+model Job {
+  id        String  @id @default(cuid())
+  found_job Boolean
+  user      User    @relation(fields: [user_id], references: [id])
+  user_id   String  @unique
+}
```


