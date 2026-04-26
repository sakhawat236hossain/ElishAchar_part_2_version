import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../../../lib/dbConnect";


export async function GET(request) {
  try {
    // URL থেকে id নেওয়া
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
    }

    // ডাটাবেস কানেকশন
    const ordersCollection = await dbConnect(collections.ORDERS);

    // ID ভ্যালিড কি না চেক করা
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
    }

    // ডাটাবেস থেকে একটি অর্ডার খোঁজা
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // সফল হলে ডাটা পাঠানো
    return NextResponse.json({ success: true, data: order });

  } catch (error) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}