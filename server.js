const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.json());
app.use(cors());




const database = {
    users: [
        {
            username: 'User1',
            password: 'IamUserOne',
            bidsPlaced: [0,0,0,0,0,0]
        },
        {
            username: 'User2',
            password: 'IamUserTwo',
            bidsPlaced: [0,0,0,0,0,0]
        },
        {
            username: 'Admin',
            password: 'IamTheBoss'
        }
    ],
    bidStatus:['open','open','open','open','open','open']
}



// Home ***********************

app.get('/', (req,res) => {
    res.send(database);
})

// Signing *********************

app.post('/signin', (req, res) => {
    for (var i=0; i < database.users.length; i++) {
            if (req.body.username === database.users[i].username && 
                req.body.password === database.users[i].password) {
            return res.json(database.users[i]);
        }
    }
    res.status(400).json('error logging in');
})


// Get profile ******************

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    database.users.forEach(user => {
        if (user.username === username) {
            return res.json(user);
        } 
    })
    res.status(404).json('no such user');
})

// Update Bids *****************

app.put('/placeBid', (req, res) => {
    const username  = req.body.username;
    let i = req.body.bidId;
    let found = false;
    database.users.forEach(user => {
        if (user.username === username) {
            found = true;
            user.bidsPlaced[i] = req.body.bidValue;
            return res.json(user.bidsPlaced[i]);
        } 
    })
    if (!found) {
        res.status(404).json('no such user');
    }
})


// **** Reset all bids ******************************

app.post('/resetBids', (req, res) => {
    database.users.forEach(user => {
        if (user.username !== 'Admin') {
            for(var i = 0; i < user.bidsPlaced.length; i++) {
                user.bidsPlaced[i] = req.body.newValues;
            }
        }
    })
})

// Check bid status on user login ********************

app.post('/checkBidStatus', (req, res) => {
    let i = req.body.bidId;
    if (database.bidStatus !== 'open') {
        if (database.users[0].bidsPlaced[i] > database.users[1].bidsPlaced[i]) {
            return res.json('User1');
        } else if (database.users[0].bidsPlaced[i] < database.users[1].bidsPlaced[i]) {
            return res.json('User');
        }     
    }
})
 

// Close bid, calculate winner and responds ************

io.on('connection', socket => {

    socket.on('close this bid!', bidId => {

        let i = bidId;
        
        if (database.users[0].bidsPlaced[i] > database.users[1].bidsPlaced[i]) {
            database.bidStatus[i] = 'closed, user1 won';
            return socket.broadcast.emit('winner name', {name: 'User1', bid: i})

        } else if (database.users[0].bidsPlaced[i] < database.users[1].bidsPlaced[i]) {
            database.bidStatus[i] = 'closed, user2 won';
            return socket.broadcast.emit('winner name', {name: 'User2', bid: i})
            
        } else {
            return socket.broadcast.emit('winner name', 'no winner');
        } 
    })
})




server.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000")
})
