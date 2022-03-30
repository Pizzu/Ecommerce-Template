/*
  Warnings:

  - You are about to drop the `OwnedCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OwnedCourse";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrderCourse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OrderCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
