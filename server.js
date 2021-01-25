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
            bidsPlaced: [0,1,2,3,4,5],
            itemOneBid: 0,
            itemTwoBid: 0,
            itemThreeBid: 0,
            itemFourBid: 0,
            itemFiveBid: 0,
            itemSixBid: 0,
        },
        {
            username: 'User2',
            password: 'IamUserTwo',
            bidsPlaced: [0,1,2,3,4,5],
            itemOneBid: 0,
            itemTwoBid: 0,
            itemThreeBid: 0,
            itemFourBid: 0,
            itemFiveBid: 0,
            itemSixBid: 0,
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



//Home ******************************************************************************
app.get('/', (req,res) => {
    res.send(database);
})

//Signing ****************************************************************************
app.post('/signin', (req, res) => {
    for (var i=0; i < database.users.length; i++) {
            if (req.body.username === database.users[i].username && 
                req.body.password === database.users[i].password) {
            return res.json(database.users[i]);
            // return res.json('successful signin');
        }
    }
    res.status(400).json('error logging in');
})


//Get profile ***********************************************************************
app.get('/profile/:username', (req, res) => {
    // const { username } = req.params;
    const username = req.params.username
    database.users.forEach(user => {
        if (user.username === username) {
            return res.json(user);
        } 
    })
    res.status(404).json('no such user');
})

// Update Bids V2**********************************************************************

app.put('/placeBid', (req, res) => {
    const username  = req.body.username;
    let i = req.body.bidId;
    let found = false;
    database.users.forEach(user => {
        if (user.username === username) {
            found = true
            user.bidsPlaced[i] = req.body.bidValue;
            console.log(req.body);
            // user.itemOneBid = req.body.itemOneBid
            return res.json(user.bidsPlaced[i]);
            // return res.json(user.itemOneBid);
        } 
    })
    if (!found) {
        res.status(404).json('no such user');
    }
})


// Close Bids V2 **************************************************************

app.post('/closeBid', (req, res) => {
    let i = req.body.bidId;
    database.bidStatus[i].status = req.body.status;
    res.json('bid  is now closed');
})

// Get Results V2 ***********************************************************

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

// Previous ways******************************** */


// app.post('/closeBid1', (req, res) => {
//     database.bidStatus[0].bid1 = req.body.bid1
//     res.json('bid 1 is now closed')
// })

app.post('/closeBid2', (req, res) => {
    database.bidStatus[0].bid2 = req.body.bid2
    res.json('bid 2 is now closed')
})

app.post('/closeBid3', (req, res) => {
    database.bidStatus[0].bid3 = req.body.bid3
    res.json('bid 3 is now closed')
})

app.post('/closeBid4', (req, res) => {
    database.bidStatus[0].bid4 = req.body.bid4
    res.json('bid 4 is now closed')
})

app.post('/closeBid5', (req, res) => {
    database.bidStatus[0].bid5 = req.body.bid5
    res.json('bid 5 is now closed')
})

app.post('/closeBid6', (req, res) => {
    database.bidStatus[0].bid6 = req.body.bid6
    res.json('bid 6 is now closed')
})




// // Get results**************************************************

// app.get('/results', (req, res) => {
//     res.send(database.users);
//     console.log(res.body)
// })


//Update bids V1 *******************************************************


// app.put('/bid1', (req, res) => {
//     console.log(req.body)
//     const username  = req.body.username;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.username === username) {
//             found = true
//             user.itemOneBid = req.body.itemOneBid
//             // console.log(user.itemOneBid)
//             return res.json(user.itemOneBid);
//         } 
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

// app.put('/bid2', (req, res) => {
//     console.log(req.body)
//     const username  = req.body.username;
//     // console.log(req.body.itemTwoBid)
//     let found = false;
//     database.users.forEach(user => {
//         if (user.username === username) {
//             found = true
//             user.itemTwoBid = req.body.itemTwoBid
//             // console.log(user.itemTwoBid)
//             return res.json(user.itemTwoBid);
//         } 
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

// app.put('/bid3', (req, res) => {
//     console.log(req.body)
//     const username  = req.body.username;
//     // console.log(req.body.itemThreeBid)
//     let found = false;
//     database.users.forEach(user => {
//         if (user.username === username) {
//             found = true
//             user.itemThreeBid = req.body.itemThreeBid
//             // console.log(user.itemThreeBid)
//             return res.json(user.itemThreeBid);
//         } 
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

// app.put('/bid4', (req, res) => {
//     console.log(req.body)
//     const username  = req.body.username;
//     // console.log(req.body.itemFourBid)
//     let found = false;
//     database.users.forEach(user => {
//         if (user.username === username) {
//             found = true
//             user.itemFourBid = req.body.itemFourBid
//             // console.log(user.itemFourBid)
//             return res.json(user.itemFourBid);
//         } 
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

// app.put('/bid5', (req, res) => {
//     console.log(req.body)
//     const username  = req.body.username;
//     // console.log(req.body.itemFiveBid)
//     let found = false;
//     database.users.forEach(user => {
//         if (user.username === username) {
//             found = true
//             user.itemFiveBid = req.body.itemFiveBid
//             // console.log(user.itemFiveBid)
//             return res.json(user.itemFiveBid);
//         } 
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

// app.put('/bid6', (req, res) => {
//     console.log(req.body)
//     const username  = req.body.username;
//     // console.log(req.body.itemSixBid)
//     let found = false;
//     database.users.forEach(user => {
//         if (user.username === username) {
//             found = true
//             user.itemSixBid = req.body.itemSixBid
//             // console.log(user.itemSixBid)
//             return res.json(user.itemSixBid);
//         } 
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })


// Get results**************************************************

// app.get('/resultBid1', (req, res) => {
//     if (database.users[0].itemOneBid > database.users[1].itemOneBid) {
//         return res.json('User1 won this bid!');
//     } else if (database.users[0].itemOneBid < database.users[1].itemOneBid){
//         return res.json('User1 lost this bid!');
//     } else {
//         return res.json('no winner');
//     } 
// })


app.get('/resultBid2', (req, res) => {
    if (database.users[0].itemTwoBid > database.users[1].itemTwoBid) {
        return res.json('User1 won this bid!');
    } else if (database.users[0].itemTwoBid < database.users[1].itemTwoBid) {
        return res.json('User1 lost this bid!');
    } else {
        return res.json('no winner');
    }
})

app.get('/resultBid3', (req, res) => {
    if (database.users[0].itemThreeBid > database.users[1].itemThreeBid) {
        return res.json('User1 won this bid!');
    } else if (database.users[0].itemThreeBid < database.users[1].itemThreeBid){
        return res.json('User1 lost this bid!');
    } else {
        return res.json('no winner');
    }
})

app.get('/resultBid4', (req, res) => {
    if (database.users[0].itemFourBid > database.users[1].itemFourBid) {
        return res.json('User1 won this bid!');
    } else if (database.users[0].itemFourBid < database.users[1].itemFourBid){
        return res.json('User1 lost this bid!');
    } else {
        return res.json('no winner');
    }
})

app.get('/resultBid5', (req, res) => {
    if (database.users[0].itemFiveBid > database.users[1].itemFiveBid) {
        return res.json('User1 won this bid!');
    } else if (database.users[0].itemFiveBid < database.users[1].itemFiveBid){
        return res.json('User1 lost this bid!');
    } else {
        return res.json('no winner');
    }
})

app.get('/resultBid6', (req, res) => {
    if (database.users[0].itemSixBid > database.users[1].itemSixBid) {
        return res.json('User1 won this bid!');
    } else if (database.users[0].itemSixBid < database.users[1].itemSixBid){
        return res.json('User1 lost this bid!');
    } else {
        return res.json('no winner');
    }
})

//********************************************************************************************** */

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
