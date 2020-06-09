import * as express from 'express';
import {Application} from "express";
import {submitCardInfo} from "./routes/card.route";
import {verifyHeaders} from './helpers/helpers';
import {submitCustomerInfo} from './routes/customer-info.route';

const bodyParser = require('body-parser');



const app: Application = express();

const port = 9000;


app.use(bodyParser.json());
app.use(verifyHeaders);


app.route('/api/ccreg/card').post(submitCardInfo);
app.route('/api/ccreg/customer').post(submitCustomerInfo);


const httpServer = app.listen(port, () => {
    console.log("HTTP REST API Server running at http://localhost:" + port);
});




