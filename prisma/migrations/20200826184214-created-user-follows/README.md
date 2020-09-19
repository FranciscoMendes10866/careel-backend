# Migration `20200826184214-created-user-follows`

This migration has been generated at 8/26/2020, 7:42:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."_UserFollows" (
"A" text   NOT NULL ,
"B" text   NOT NULL 
)

CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "public"."_UserFollows"("A", "B")

CREATE INDEX "_UserFollows_B_index" ON "public"."_UserFollows"("B")

ALTER TABLE "public"."_UserFollows" ADD FOREIGN KEY ("A")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_UserFollows" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200825211250-added-messages..20200826184214-created-user-follows
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
@@ -26,8 +26,10 @@
   newsletter    Newsletter?
   appreciations Appreciations[]
   bans          Banned[]
   messages      Messages[]
+  followedBy  User[]   @relation("UserFollows", references: [id])
+  following   User[]   @relation("UserFollows", references: [id])
 }
 model Profile {
   id              String @id @default(cuid())
```


