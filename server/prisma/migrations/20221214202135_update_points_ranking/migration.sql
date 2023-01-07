/*
  Warnings:

  - You are about to drop the column `userId` on the `PointsRanking` table. All the data in the column will be lost.
  - Added the required column `participantId` to the `PointsRanking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PointsRanking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "poits" DATETIME NOT NULL,
    "participantId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    CONSTRAINT "PointsRanking_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PointsRanking_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PointsRanking" ("id", "poits", "poolId") SELECT "id", "poits", "poolId" FROM "PointsRanking";
DROP TABLE "PointsRanking";
ALTER TABLE "new_PointsRanking" RENAME TO "PointsRanking";
CREATE UNIQUE INDEX "PointsRanking_participantId_poolId_key" ON "PointsRanking"("participantId", "poolId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
