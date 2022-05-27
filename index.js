const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.up3hj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("toDoNotes").collection("notes");

        // TO GET NOTE FROM USER
        app.post("/note", async (req, res) => {
            const note = req.body;
            const result = await todoCollection.insertOne(note);
            res.send(result);
        });

        // TO GET ALL USER NOTE
        app.get("/note", async (req, res) => {
            const notes = await todoCollection.find().toArray();
            res.send(notes);
        });

        //TO DELETE SELECTED NOTE
        app.delete("/note/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(query);
            res.send(result);
        });
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("To Do World!");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
