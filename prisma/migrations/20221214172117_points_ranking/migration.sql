-- AlterTable
ALTER TABLE "Game" ADD COLUMN "golAway" TEXT;
ALTER TABLE "Game" ADD COLUMN "golHome" TEXT;

-- CreateTable
CREATE TABLE "PointsRanking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "poits" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    CONSTRAINT "PointsRanking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PointsRanking_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PointsRanking_userId_poolId_key" ON "PointsRanking"("userId", "poolId");
