import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(){
  const users = await prisma.users.findMany({
    where: {
      deleted_at: null
    }
  })

  return NextResponse.json(users, {
    status: 200,
  });
}

export async function POST(request: NextRequest){
  const body = await request.json();
  const { name, email } = body;
  const newUser = await prisma.users.create({
    data: { name, email }
  })
  console.log(newUser, 24);
  return NextResponse.json(newUser, {
    status: 201,
  });
}

export async function PATCH(request: NextRequest){
  const body = await request.json();
  const { id, name, email } = body;

  const updateUser = await prisma.users.update({
    where: { id },
    data: { name, email }
  })

  return NextResponse.json(updateUser, {
    status: 200,
  })
}

export async function DELETE(request: NextRequest){
  const body = await request.json();
  const { id } = body;

  const deleteUser = await prisma.users.update({
    where: { id },
    data: { deleted_at: new Date() }
  })

  return NextResponse.json(deleteUser, {
    status: 200,
  });
}