# Migration `20190927134833-remove-default-posted-at`

This migration has been generated by Rob Cameron at 9/27/2019, 1:48:33 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "lift"."new__PostToTag"("A" INTEGER    REFERENCES "Post"(id) ON DELETE CASCADE,"B" INTEGER    REFERENCES "Tag"(id) ON DELETE CASCADE)
;

INSERT INTO "new__PostToTag" ("A","B") SELECT "A","B" from "_PostToTag"

DROP TABLE "lift"."_PostToTag";

ALTER TABLE "lift"."new__PostToTag" RENAME TO "_PostToTag";

CREATE UNIQUE INDEX "lift"."_PostToTag_AB_unique" ON "_PostToTag"("A","B")

PRAGMA "lift".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190927100556-add-post-author..20190927134833-remove-default-posted-at
--- datamodel.dml
+++ datamodel.dml
@@ -18,9 +18,9 @@
   author String
   body String
   image String?
   tags Tag[]
-  postedAt DateTime @default(now())
+  postedAt DateTime
 }
 model Tag {
   id Int @id
```

## Photon Usage

You can use a specific Photon built for this migration (20190927134833-remove-default-posted-at)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190927134833-remove-default-posted-at'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```