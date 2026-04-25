import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";

export async function POST(req) {
  try {
    const { name, price, image, weight, description } = await req.json();
    
    // Validate required fields
    if (!name || !price || !image || !weight) {
      return NextResponse.json(
        { success: false, error: "সকল ফিল্ড পূরণ করা অবশ্যক" },
        { status: 400 }
      );
    }

    const collection = await dbConnect(collections.PRODUCTS);

    const result = await collection.insertOne({
      name,
      price: Number(price),
      weight, 
      image,
      description: description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!result.insertedId) {
      throw new Error("Database insertion failed");
    }

    return NextResponse.json(
      { success: true, id: result.insertedId, message: "প্রোডাক্ট সফলভাবে যোগ হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error); 
    return NextResponse.json(
      { success: false, error: error.message || "ডাটা সংরক্ষণ ব্যর্থ হয়েছে" },
      { status: 500 }
    );
  }
}