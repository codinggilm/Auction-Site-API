# Auction Site API
 

## Description
This server supports the auction site client. It handles incoming requests and updates the (hardcoded) database accordingly. <br />

Users can keep submitting bids as long as the Admin hasn't closed the bids for a listing. <br />
Users cannot see other users bids, but will instantly see if they have won or lost a listing once the Admin has closed the bids for it. <br />
The server keeps track of which bids are still open and broacasts updates to all users <br />
Socket.IO is used to allows the client's UI to update in real time when bids are closed or reset<br />


## Ideas for new functionalities
Implementing a time limit for each bid, allowing users to add new listings and set a minimum price, informing users how many users have also placed bids on an item (or/and how many bids have already been placed), and more<br />



## Technologies Used
* JavaScript
* NODE.JS
* EXPRESS.JS
* Socket.IO
* NPM
* POSTMAN
