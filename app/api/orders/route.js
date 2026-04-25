import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect(collections.ORDERS);
    const orders = await collection.find({}).toArray();
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}