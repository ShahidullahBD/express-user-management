const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri =`mongodb+srv://nextjs-user-management:5TZKHMKMdUYf0t5f@cluster0.pyao7h4.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.get('/', (req, res) => {
    res.send('Hello from users World');
})

const users = [
    { id: 1, name: 'habibur rahman', email: 'habibur@bahib.com' },
    { id: 2, name: 'Kalbur Rahman', email: 'kalibur@bahib.com' },
    { id: 3, name: 'Khalil Ahmed', email: 'khalil@ahmed.com' }
]

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    console.log('data in the request:', req.body);

    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);

    res.send({ success: true, data: newUser, message: 'post method is working' });
})

app.get('/products', (req, res) => {
    res.send('Hello this is products route')
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);