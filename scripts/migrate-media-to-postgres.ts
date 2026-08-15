import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const dir = path.join(process.cwd(), "storage/media/library");
  const files = fs.readdirSync(dir);

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const stat = fs.statSync(filePath);

    if (!stat.isFile()) continue;

    await prisma.media.upsert({
      where: { filename },
      update: {
        size: stat.size,
        path: `/media/library/${filename}`,
      },
      create: {
        filename,
        originalName: filename,
        mimeType: "application/octet-stream",
        size: stat.size,
        path: `/media/library/${filename}`,
      },
    });

    console.log(`Imported: ${filename}`);
  }

  console.log(`Total media imported: ${files.length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
