import { MongoClient } from 'mongodb'
import { hash } from 'bcryptjs';

async function create() {
  const password = await hash('123123', 8);

  return {
    name: 'Admin',
    email: 'admin@debts.com',
    password,
  }
}

async function seedDB() {
    // Connection URL
    const uri = process.env.MONGO_URL || 'mongodb://localhost';

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db("debts");

        await db.dropDatabase();

        const collection = db.collection("users");

        const user = await create();

        await collection.insertOne(user);

        console.log("Database seeded! :)");
        return await client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
