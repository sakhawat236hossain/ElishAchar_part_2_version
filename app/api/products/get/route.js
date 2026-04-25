import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";

export async function GET(req) {
  try {
    console.log("🔍 GET /api/products/get - Starting...");
    console.log("📌 MONGODB_URI exists:", !!process.env.MONGODB_URI);
    console.log("📌 DB_NAME:", process.env.DB_NAME);
    
    const collection = await dbConnect(collections.PRODUCTS);
    console.log("✅ Connected to database collection");
    
    if (!collection) {
      throw new Error("Database collection not found");
    }

    const products = await collection.find({}).sort({ createdAt: -1 }).toArray();
    console.log(`✅ Found ${products?.length || 0} products`);
    
    return NextResponse.json(
      { 
        success: true, 
        data: products || [],
        count: products?.length || 0
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Database Error:", error);
    console.error("❌ Error Stack:", error.stack);
    console.error("❌ Error Message:", error.message);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "প্রোডাক্ট লোড করতে সমস্যা হয়েছে",
        data: []
      }, 
      { status: 500 }
    );
  }
}