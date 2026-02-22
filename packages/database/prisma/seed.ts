import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env\n" +
      "See SRS-SPR01 Section 2 for required environment variables."
    );
  }

  // Hash password with bcrypt (cost factor 12)
  const passwordHash = await bcrypt.hash(password, 12);

  // Upsert admin user — idempotent (no duplicate on re-run)
  const user = await prisma.user.upsert({
    where: { email },
    update: {},  // Don't overwrite if already exists
    create: {
      email,
      passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.info(`✓ Admin user: ${user.email} (id: ${user.id})`);

  // Create Profile singleton if not exists
  const profileCount = await prisma.profile.count();
  if (profileCount === 0) {
    const profile = await prisma.profile.create({
      data: {
        displayName: "Admin",
        email: email,
        updatedAt: new Date(),
      },
    });
    console.info(`✓ Profile created (id: ${profile.id})`);
  } else {
    console.info(`✓ Profile already exists (${profileCount} record(s))`);
  }

  console.info("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
