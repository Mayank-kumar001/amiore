-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colour" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "isAvailable" DROP NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL;
