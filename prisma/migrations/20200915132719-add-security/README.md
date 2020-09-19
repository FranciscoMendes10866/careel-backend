# Migration `20200915132719-add-security`

This migration has been generated at 9/15/2020, 2:27:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Security" (
"id" text   NOT NULL ,
"login_date" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"device_product" text   NOT NULL ,
"device_platform" text   NOT NULL ,
"device_ip" text   NOT NULL ,
"device_allowed" boolean   NOT NULL DEFAULT true,
"user_id" text   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Security" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200911222520-removed-jobs..20200915132719-add-security
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
@@ -29,8 +29,9 @@
   bans             Banned[]
   messages         Messages[]
   followed_by      User[]        @relation("UserFollows", references: [id])
   following        User[]        @relation("UserFollows", references: [id])
+  security         Security[]
 }
 model Profile {
   id              String @id @default(cuid())
@@ -106,4 +107,15 @@
   receiver_id String
   sender      User     @relation(fields: [sender_id], references: [id])
   sender_id   String
 }
+
+model Security {
+  id              String   @id @default(cuid())
+  login_date      DateTime @default(now())
+  device_product  String
+  device_platform String
+  device_ip       String
+  device_allowed  Boolean  @default(true)
+  user            User     @relation(fields: [user_id], references: [id])
+  user_id         String
+}
```


