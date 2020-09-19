# Migration `20200825211250-added-messages`

This migration has been generated at 8/25/2020, 10:12:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Messages" (
"id" text   NOT NULL ,
"sent_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"message" text   NOT NULL ,
"receiver_id" text   NOT NULL ,
"sender_id" text   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Messages" ADD FOREIGN KEY ("sender_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200822234503-updated-banned..20200825211250-added-messages
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
@@ -25,8 +25,9 @@
   portfolios    Portfolios[]
   newsletter    Newsletter?
   appreciations Appreciations[]
   bans          Banned[]
+  messages      Messages[]
 }
 model Profile {
   id              String @id @default(cuid())
@@ -107,4 +108,13 @@
   ban_date     DateTime @default(now())
   user         User     @relation(fields: [user_id], references: [id])
   user_id      String
 }
+
+model Messages {
+  id          String   @id @default(cuid())
+  sent_at     DateTime @default(now())
+  message     String
+  receiver_id String
+  sender      User     @relation(fields: [sender_id], references: [id])
+  sender_id   String
+}
```


