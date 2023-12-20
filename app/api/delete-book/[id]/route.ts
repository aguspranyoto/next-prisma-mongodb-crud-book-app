import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // delete book from db
  const book = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json("Deleted", { status: 200 });
}
