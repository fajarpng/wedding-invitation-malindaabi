import Chats from "@/backend/chats";
import { initMongoose } from "@/backend/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await initMongoose()
    const data = await Chats.find({})
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'GET error'}, { status : 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await initMongoose()
    const body = await request.json()
    const data = await Chats.create(body)
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'POST error', error }, { status : 500 })
  }
}