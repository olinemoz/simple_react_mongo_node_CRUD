const express = require('express');
const app = express();
const cors = require('cors');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const PORT = process.env.PORT || 5000

// MiddleWares
app.use(cors())
app.use(express.json());

// MongoDB URL
const uri = "mongodb+srv://mazumder:oline@mern-practice.upqpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Operations

async function run() {
    try {
        await client.connect();
        const database = client.db("nodeMongoCRUD");
        const userManagement = database.collection("userManagement");

        // Get API
        app.get('/users', async (req, res) => {
            const cursor = userManagement.find({});
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await userManagement.findOne(query)
            res.json(result)
        })

        //Update API
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id
            const user = req.body
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set: {
                    name: user.name
                },
            };
            const result = await userManagement.updateOne(filter, updateDoc, options);
            res.json(result)
        })

        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body
            const result = await userManagement.insertOne(newUser);
            res.json(result)
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)};
            const result = await userManagement.deleteOne(query);
            res.json(result)
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);


//Server Listen
app.listen(PORT, () => {
    console.log("Server Running Successfully at", PORT)
})