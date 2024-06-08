import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import {customerRoute} from '../server/routes/customer.js'

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

// For ejs-layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','./layouts/main');



//routes
app.use('/',customerRoute)


app.get('*',(req,res)=>{res.sendStatus(404).render('notfound')})

app.listen(PORT,()=>{console.log(`Listening on ${PORT}`)})