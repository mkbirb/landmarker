-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_pinId_fkey";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
