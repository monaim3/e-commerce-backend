const express = require('express');
const cors = require('cors');
const {  ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.undrt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('shopping').collection('shopping');
        const addressCollection = client.db('shopping').collection('address');
        const orderCollection = client.db('shopping').collection('order');

        app.get('/shopping', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
      app.get('/shopping/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectID(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
        app.post('/address', async (req, res) => {
            const address = req.body;
            const result = await addressCollection.insertOne(address);
            res.send(result);
        });
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });
    }
    finally {

    }

}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('ecommerce server is running')
})

app.listen(port, () => {
    console.log(`ecommerce  server running on ${port}`);
})