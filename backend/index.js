import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());

//const todoLists = [];

const uri =
  "mongodb+srv://sansavi:123@cluster0.rjmtm5l.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { monitorCommands: true });

let todolistCollection;

const connectDb = async () => {
  await client.connect();
  console.log("Connected to DB");
  todolistCollection = client.db("todolistdb").collection("todolist");
};

app.get("/todolists", async (req, res) => {
  let todoLists = await todolistCollection.find().toArray();
  res.send({
    status: 200,
    data: todoLists,
  });
  console.log("hi get");
});
app.post("/todolists", async (req, res) => {
  let { todoValue } = req.body;

  console.log("todovakue", todoValue);

  await todolistCollection.insertOne({
    value: todoValue,
  });
  //todoLists.push(todoValue);

  res.send(true);
  /*  console.log(todoLists); */
});
app.listen(8080, () => {
  console.log("Server Started");
  connectDb();
});
