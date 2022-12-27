/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `SavedTrack` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedTrack_userId_title_key" ON "SavedTrack"("userId", "title");
