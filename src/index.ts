import * as express from "express";

const port = process.env.PORT || 3000;
const app: express.Application = express();
let router: express.Router = express.Router();

app.use(router);

app.listen(port, () => {

  console.log(`Crypto-boot has started, app is listenting on port: ${port}`);

  router.get('/', (req: express.Request, res: express.Response) => {
    res.json("dupa");
  });

  router.get('/privacy', (req: express.Request, res: express.Response) => {
    //rodo
  });

  router.get('/', (req: express.Request, res: express.Response) => {
    //verification process is taken place here
  });

  router.post('/', (req: express.Request, res: express.Response) => {
    //users request for information are handled here
  })

});