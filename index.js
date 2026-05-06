const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello from users World');
})

const users = [
    {id: 1, name: 'habibur rahman', email: 'habibur@bahib.com'},
    {id: 2, name: 'Kalbur Rahman', email: 'kalibur@bahib.com'},
    {id: 3, name: 'Khalil Ahmed', email: 'khalil@ahmed.com'}
]

app.get('/users', (req, res)=>{
    res.send(users)
})

app.post('/users', (req, res)=>{
    console.log('data in the request:', req.body);

    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);

    res.send({success: true, data: newUser, message: 'post method is working'});
})

app.get('/products', (req, res)=>{
    res.send('Hello this is products route')
})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})