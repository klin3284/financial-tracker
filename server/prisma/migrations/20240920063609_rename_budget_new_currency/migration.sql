/*
  Warnings:

  - You are about to drop the `FinancialProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FinancialProfile" DROP CONSTRAINT "FinancialProfile_userId_fkey";

-- DropTable
DROP TABLE "FinancialProfile";

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthlySalary" DOUBLE PRECISION NOT NULL,
    "needsPercentage" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "wantsPercentage" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "savingsPercentage" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_key" ON "Budget"("userId");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
