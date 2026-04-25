// app/api/orders/post/route.js

import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();

    const collection = await dbConnect(collections.ORDERS);

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
      status: "pending",
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "অর্ডার সফলভাবে সেভ হয়েছে!", 
        orderId: result.insertedId 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { success: false, message: "সার্ভার এরর: " + error.message }, 
      { status: 500 }
    );
  }
}