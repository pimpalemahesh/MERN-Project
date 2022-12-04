const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path: './config.env'});
require('./conn.js');
app.use(express.json());
app.use(require('./router/auth'));
// const middleware = (req, res, next) => {
//     console.log("I am middleware useful to check middle conditions like user is authenticated or not if yes then call next() method");
//     next();
// }

// app.get('/abc', middleware, (req, res)=>{
//     res.send("I am world");
// })

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is running at port ${PORT}`);
})