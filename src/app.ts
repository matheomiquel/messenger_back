import * as swaggerUI from 'swagger-ui-express';
import { config } from 'dotenv'
import cors from "cors";
import * as bodyParser from "body-parser";
import Express from 'express'
import { Request, Response } from 'express'
import { swaggerConfig } from './controller'
import { CreateRoute } from './controller'
const app = Express()
app.use(cors());
app.use(bodyParser.json());
let path = ".env";
if (process.env.APP_ENV) {
    path = `${path}.${process.env.APP_ENV}`;
}

config({ path: path });
const PORT = process.env.PORT ?? 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
const createRoute = new CreateRoute({ app })

app.get('/health', async function (req: Request, res: Response) {
    res.status(204).send()
})

app.all('*', async function (req: Request, res: Response) {
    res.status(404).send({
        message: 'route not found'
    })
})

app.listen(3000, () => {
    console.log("listen on port 3000")
})