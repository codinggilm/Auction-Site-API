# Auction Site API
 

## Description
This server supports the auction site client. It handles incoming requests and updates the (hardcoded) database accordingly. <br />
Using Socket.IO, it allows the client's UI to update in real time. <br />


## Improving the server
Last update fixed the infite bidding possibility if a users logs out and sign in again, the client now checks the server for bid status everytime a user logs in. <br />
Next update will implement Socket.IO to update the client's UI in real time when the Admin resets all bids.



## Technologies Used
* JavaScript
* NODE.JS
* EXPRESS.JS
* Socket.IO
* NPM
* POSTMAN
