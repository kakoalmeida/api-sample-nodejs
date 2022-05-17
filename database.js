const { MongoClient, ObjectId } = require ('mongodb');

async function connect() {
    if (global.db)
        return global.db;

    const conn = await MongoClient.connect("YOUR MONGO SERVER", { useUnifiedTopology: true });

    if (!conn)
        return new Error("Can't Connect");
    global.db = await conn.db("workshop");
    return global.db;
}

async function findCustomers(){
    const db = await connect();
    return await db.collection("customers").find({}).toArray();
}

async function findCustomer(id){
    const db = await connect();
    const getId = new ObjectId(id);
    return await db.collection("customers").findOne({_id: getId});
}

async function insertCustomer(customer){
    const db = await connect();
    return db.collection("customers").insertOne({customer});
}

async function updateCustomer(id, customer){
    const db = await connect();
    const filter = {_id: new ObjectId(id)};
    return db.collection("customers").update({_id: filter}, {$set: customer});
}

async function patchCustomer(id, updates){
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection("customers").updateOne(filter, {$set: updates});
}

async function deleteCustomer(id){
    const db = await connect();
    const filter = {_id: new ObjectId(id)};
    return db.collection("customers").deleteOne(filter);
}

module.exports = { findCustomers , findCustomer , insertCustomer , updateCustomer , patchCustomer , deleteCustomer };