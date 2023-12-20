import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // get single book by id from db
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(book, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, date } = await request.json();
  // update book in db
  const book = await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      title,
      date,
    },
  });
  return NextResponse.json(book, { status: 200 });
}
