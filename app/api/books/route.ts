import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // get all books from db
  const books = await prisma.book.findMany();
  return NextResponse.json(books, { status: 200 });
}
