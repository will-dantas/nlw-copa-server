/*
  Warnings:

  - You are about to alter the column `firstTeamCountryCode` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `secondTeamCountryCode` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" INTEGER NOT NULL,
    "secondTeamCountryCode" INTEGER NOT NULL,
    "golHome" TEXT,
    "golAway" TEXT
);
INSERT INTO "new_Game" ("date", "firstTeamCountryCode", "golAway", "golHome", "id", "secondTeamCountryCode") SELECT "date", "firstTeamCountryCode", "golAway", "golHome", "id", "secondTeamCountryCode" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
