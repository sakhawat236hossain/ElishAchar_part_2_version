import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect(collections.ORDERS);
    const result = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" } 
        }
      }
    ]).toArray();

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    return NextResponse.json({ success: true, revenue }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}