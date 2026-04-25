// File: app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../lib/dbConnect"; // আপনার পাথ অনুযায়ী ঠিক করুন

export async function PATCH(req, { params }) {
  try {
    // Next.js 15+ এ params এর জন্য await করতে হয়
    const { id } = await params;
    const { status } = await req.json();
    
    const collection = await dbConnect(collections.ORDERS);
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true, message: "স্ট্যাটাস আপডেট হয়েছে" });
    }
    return NextResponse.json({ success: false, message: "কোনো ডাটা আপডেট হয়নি" }, { status: 400 });
    
  } catch (error) {
    console.error("PATCH API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}