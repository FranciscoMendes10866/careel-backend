# Migration `20200920152439-updated-sponsors`

This migration has been generated at 9/20/2020, 4:24:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Sponsorships.user_id_unique" ON "public"."Sponsorships"("user_id")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200917195557-added-sponsors..20200920152439-updated-sponsors
--- datamodel.dml
+++ datamodel.dml
@@ -2,37 +2,37 @@
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
-  id               String         @id @default(cuid())
-  email            String         @unique
+  id               String        @id @default(cuid())
+  email            String        @unique
   password         String
   role             String
-  terms_conditions Boolean        @default(false)
-  is_public        Boolean        @default(false)
-  admin            Boolean        @default(false)
-  newsletter       Boolean        @default(false)
-  job              Boolean        @default(false)
+  terms_conditions Boolean       @default(false)
+  is_public        Boolean       @default(false)
+  admin            Boolean       @default(false)
+  newsletter       Boolean       @default(false)
+  job              Boolean       @default(false)
   profile          Profile?
   education        Education[]
   abilities        Abilities[]
   experiences      Experiences[]
   languages        Languages[]
   portfolios       Portfolios[]
   bans             Banned[]
   messages         Messages[]
-  followed_by      User[]         @relation("UserFollows", references: [id])
-  following        User[]         @relation("UserFollows", references: [id])
+  followed_by      User[]        @relation("UserFollows", references: [id])
+  following        User[]        @relation("UserFollows", references: [id])
   security         Security[]
-  Sponsorships     Sponsorships[]
+  sponsorships     Sponsorships?
 }
 model Profile {
   id              String @id @default(cuid())
@@ -128,6 +128,6 @@
   sponsor_logo String?
   sponsor_link String?
   still_online Boolean  @default(true)
   user         User     @relation(fields: [user_id], references: [id])
-  user_id      String
+  user_id      String   @unique
 }
```


