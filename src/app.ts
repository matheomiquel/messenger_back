import * as swaggerUI from 'swagger-ui-express';
import { config } from 'dotenv'
import cors from "cors";
import * as bodyParser from "body-parser";
import Express from 'express'
import { Request, Response } from 'express'
import { swaggerConfig } from './controller'
import { CreateRoute } from './controller'
import { UserService } from './controller/services';
import { UserRoute } from './controller/routes/user';
import { UserDomain } from './domain';
import { UserData } from './data/services/user';
import { UserValidator } from './controller/validator/user';

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

////////////////////////////////VALIDATOR/////////////////////////////////////////

const userValidator = new UserValidator();

////////////////////////////////DATA///////////////////////////////////////////////
const userProvider = new UserData()

////////////////////////////////DOMAIN/////////////////////////////////////////////
const userDomain = new UserDomain({ userProvider })

////////////////////////////////CONTROLLER/////////////////////////////////////////

const userService = new UserService({ userDomain, userValidator })


new UserRoute({ createRoute, userService })



app.all('*', async function (req: Request, res: Response) {
    res.status(404).send({
        message: 'route not found'
    })
})

app.listen(PORT, () => {
    console.log(`listen on port ${3000}`)
})

export { app }