import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const key = file.replace(".json", "");
    const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));

    await prisma.siteContent.upsert({
      where: { key },
      update: { content },
      create: { key, content },
    });

    console.log(`Imported: ${key}`);
  }

  console.log(`Total imported: ${files.length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
