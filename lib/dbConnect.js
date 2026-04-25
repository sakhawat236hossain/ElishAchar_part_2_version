import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error('❌ Missing MONGODB_URI in .env.local');
if (!dbName) throw new Error('❌ Missing DB_NAME in .env.local');

let client;
let clientPromise;

const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect().catch((err) => {
			console.error('❌ MongoDB connection failed:', err.message);
			if (uri.startsWith('mongodb+srv://')) {
				console.error('⚠️ Try using non-SRV URI if SRV lookup fails.');
			}
			throw err;
		});
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export const dbConnect = async (collectionName) => {
	try {
		const connectedClient = await clientPromise;
		return connectedClient.db(dbName).collection(collectionName);
	} catch (error) {
		console.error('❌ dbConnect Error:', error.message);
		throw error;
	}
};

export const collections = {
	ORDERS: 'orders',
	PRODUCTS: 'products',
};
// wzq - yygt - atu;
