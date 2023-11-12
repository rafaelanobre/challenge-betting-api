/*
  Warnings:

  - Changed the type of `status` on the `Bet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('PENDING', 'WON', 'LOST');

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "status",
ADD COLUMN     "status" "BetStatus" NOT NULL;
