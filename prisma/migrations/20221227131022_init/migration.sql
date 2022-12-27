-- CreateTable
CREATE TABLE "SavedTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
