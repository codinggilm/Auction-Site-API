const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            username: 'User1',
            password: 'IamUserOne',
            bidsPlaced: [0,0,0,0,0,0],
        },
        {
            username: 'User2',
            password: 'IamUserTwo',
            bidsPlaced: [0,0,0,0,0,0],
        },
        {
            username: 'Admin',
            password: 'IamTheBoss'
        }
    ],
    bidStatus: [
        {
            status: 'open'
        },
        {
            status: 'open'
        },
        {
            status: 'open'
        },
        {
            status: 'open'
        },
        {
            status: 'open'
        },
        {
            status: 'open'
        }
    ]
}



//Home ***********************

app.get('/', (req,res) => {
    res.send(database);
})

//Signing *********************

app.post('/signin', (req, res) => {
    for (var i=0; i < database.users.length; i++) {
            if (req.body.username === database.users[i].username && 
                req.body.password === database.users[i].password) {
            return res.json(database.users[i]);
        }
    }
    res.status(400).json('error logging in');
})


//Get profile ******************

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    database.users.forEach(user => {
        if (user.username === username) {
            return res.json(user);
        } 
    })
    res.status(404).json('no such user');
})

// Update Bids V2 *****************

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


// Close Bids V2 ********************

app.post('/closeBid', (req, res) => {
    let i = req.body.bidId;
    database.bidStatus[i].status = req.body.status;
    res.json('bid  is now closed');
})

// Get Results V2 ********************

app.post('/results', (req, res) => {
    let i = req.body.bidId;
    if (database.users[0].bidsPlaced[i] > database.users[1].bidsPlaced[i]) {
        return res.json('User1 won this bid!');
    } else if (database.users[0].bidsPlaced[i] < database.users[1].bidsPlaced[i]){
        return res.json('User1 lost this bid!');
    } else {
        return res.json('no winner');
    } 
})




app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})
