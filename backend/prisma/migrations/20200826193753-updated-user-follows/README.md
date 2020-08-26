# Migration `20200826193753-updated-user-follows`

This migration has been generated at 8/26/2020, 8:37:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200826184214-created-user-follows..20200826193753-updated-user-follows
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
@@ -26,10 +26,10 @@
   newsletter    Newsletter?
   appreciations Appreciations[]
   bans          Banned[]
   messages      Messages[]
-  followedBy  User[]   @relation("UserFollows", references: [id])
-  following   User[]   @relation("UserFollows", references: [id])
+  followed_by   User[]          @relation("UserFollows", references: [id])
+  following     User[]          @relation("UserFollows", references: [id])
 }
 model Profile {
   id              String @id @default(cuid())
```


