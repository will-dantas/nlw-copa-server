/*
  Warnings:

  - Added the required column `gameId` to the `PointsRanking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PointsRanking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "poits" DATETIME NOT NULL,
    "participantId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "PointsRanking_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PointsRanking_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PointsRanking_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PointsRanking" ("id", "participantId", "poits", "poolId") SELECT "id", "participantId", "poits", "poolId" FROM "PointsRanking";
DROP TABLE "PointsRanking";
ALTER TABLE "new_PointsRanking" RENAME TO "PointsRanking";
CREATE UNIQUE INDEX "PointsRanking_participantId_poolId_key" ON "PointsRanking"("participantId", "poolId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
