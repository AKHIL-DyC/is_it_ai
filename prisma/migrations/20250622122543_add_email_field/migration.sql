/*
  Warnings:

  - Added the required column `email` to the `UserScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserScore" ADD COLUMN     "email" TEXT NOT NULL;
