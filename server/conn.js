const mongoose = require('mongoose');

const db = process.env.DATABASE;
mongoose.connect(db)
.then(()=>{
    console.log("Connection to database is successful.");
})
.catch((err) => {
    console.log(err + "Connection to database is successful.");
})