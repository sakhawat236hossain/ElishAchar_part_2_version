import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";


export async function GET() {
  try {
    const collection = await dbConnect(collections.PRODUCTS);
    const count = await collection.countDocuments();
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}