# Migration `20200831205958-added-terms-firld`

This migration has been generated at 8/31/2020, 9:59:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "terms_conditions" boolean   NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200826200415-removed-apreciations-table-and-controllers..20200831205958-added-terms-firld
--- datamodel.dml
+++ datamodel.dml
@@ -2,33 +2,34 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id            String          @id @default(cuid())
-  email         String          @unique
-  password      String
-  role          String
-  is_public     Boolean         @default(false)
-  admin         Boolean         @default(false)
-  profile       Profile?
-  education     Education[]
-  abilities     Abilities[]
-  experiences   Experiences[]
-  languages     Languages[]
-  portfolios    Portfolios[]
-  newsletter    Newsletter?
-  bans          Banned[]
-  messages      Messages[]
-  followed_by   User[]          @relation("UserFollows", references: [id])
-  following     User[]          @relation("UserFollows", references: [id])
+  id               String        @id @default(cuid())
+  email            String        @unique
+  password         String
+  role             String
+  terms_conditions Boolean       @default(false)
+  is_public        Boolean       @default(false)
+  admin            Boolean       @default(false)
+  profile          Profile?
+  education        Education[]
+  abilities        Abilities[]
+  experiences      Experiences[]
+  languages        Languages[]
+  portfolios       Portfolios[]
+  newsletter       Newsletter?
+  bans             Banned[]
+  messages         Messages[]
+  followed_by      User[]        @relation("UserFollows", references: [id])
+  following        User[]        @relation("UserFollows", references: [id])
 }
 model Profile {
   id              String @id @default(cuid())
```


