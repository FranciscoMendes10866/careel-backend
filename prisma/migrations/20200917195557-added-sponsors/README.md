# Migration `20200917195557-added-sponsors`

This migration has been generated at 9/17/2020, 8:55:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Sponsorships" (
"id" text   NOT NULL ,
"sponsor_date" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"sponsor_logo" text   ,
"sponsor_link" text   ,
"still_online" boolean   NOT NULL DEFAULT true,
"user_id" text   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Sponsorships" ADD FOREIGN KEY ("user_id")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200916223200-updated..20200917195557-added-sponsors
--- datamodel.dml
+++ datamodel.dml
@@ -2,36 +2,37 @@
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
-  id               String        @id @default(cuid())
-  email            String        @unique
+  id               String         @id @default(cuid())
+  email            String         @unique
   password         String
   role             String
-  terms_conditions Boolean       @default(false)
-  is_public        Boolean       @default(false)
-  admin            Boolean       @default(false)
-  newsletter       Boolean       @default(false)
-  job              Boolean       @default(false)
+  terms_conditions Boolean        @default(false)
+  is_public        Boolean        @default(false)
+  admin            Boolean        @default(false)
+  newsletter       Boolean        @default(false)
+  job              Boolean        @default(false)
   profile          Profile?
   education        Education[]
   abilities        Abilities[]
   experiences      Experiences[]
   languages        Languages[]
   portfolios       Portfolios[]
   bans             Banned[]
   messages         Messages[]
-  followed_by      User[]        @relation("UserFollows", references: [id])
-  following        User[]        @relation("UserFollows", references: [id])
+  followed_by      User[]         @relation("UserFollows", references: [id])
+  following        User[]         @relation("UserFollows", references: [id])
   security         Security[]
+  Sponsorships     Sponsorships[]
 }
 model Profile {
   id              String @id @default(cuid())
@@ -119,4 +120,14 @@
   device_allowed  Boolean  @default(true)
   user            User     @relation(fields: [user_id], references: [id])
   user_id         String
 }
+
+model Sponsorships {
+  id           String   @id @default(cuid())
+  sponsor_date DateTime @default(now())
+  sponsor_logo String?
+  sponsor_link String?
+  still_online Boolean  @default(true)
+  user         User     @relation(fields: [user_id], references: [id])
+  user_id      String
+}
```


