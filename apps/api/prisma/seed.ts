/// <reference types="node" />
import "dotenv/config";
import { prisma } from "../src/config/prisma.js";

const departments = [
  { name: "วิศวกรรมโยธา" },
  { name: "วิศวกรรมไฟฟ้า" },
  { name: "วิศวกรรมเครื่องกล" },
  { name: "วิศวกรรมเรือ" },
  { name: "วิศวกรรมยานยนต์" },
  { name: "วิศวกรรมอุตสาหการ" },
  { name: "วิศวกรรมเคมี" },
  { name: "วิศวกรรมทรัพยากรธรณี" },
  { name: "วิศวกรรมปิโตรเลียม" },
  { name: "วิศวกรรมสิ่งแวดล้อม" },
  { name: "วิศวกรรมสำรวจ" },
  { name: "วิศวกรรมโลหการและวัสดุ" },
  { name: "วิศวกรรมคอมพิวเตอร์" },
  { name: "วิศวกรรมนิวเคลียร์และรังสี" },
  { name: "วิศวกรรมนาโน (NANO)" },
  { name: "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ADME)" },
  { name: "วิศวกรรมอากาศยาน (AERO)" },
  { name: "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)" },
  { name: "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (RAIE)" },
  { name: "วิศวกรรมเคมีและกระบวนการ (ChPE)" },
];

async function main() {
  console.log("Seeding...");

  console.log("Seeding departments...");
  const existing = await prisma.department.count();
  if (existing === 0) {
    const created = await prisma.department.createMany({
      data: departments,
    });
    console.log(`Created ${created.count} department(s).`);
  } else {
    console.log(`Departments already exist (${existing}), skipping.`);
  }

  console.log("Seeding tags...");
  const createdTags = await prisma.tag.createMany({
    data: [
      {
        name: "Calculus",
        color: "#008ACF",
        backgroundColor: "#44ADE280",
      },
      {
        name: "Physics",
        color: "#9B51E0",
        backgroundColor: "#9B51E080",
      },
      {
        name: "Chemistry",
        color: "#248F53",
        backgroundColor: "#248F5380",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${createdTags.count} tag(s).`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });