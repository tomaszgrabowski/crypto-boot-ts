import * as express from "express";
import FBVerifier from "./FBVerifier";

const port = process.env.PORT || 3000;
const app: express.Application = express();
let router: express.Router = express.Router();

app.use(router);

app.listen(port, () => {

  console.log(`Crypto-boot has started, app is listenting on port: ${port}`);

  router.get('/privacy', (req: express.Request, res: express.Response) => {
    res.json("privacy");
  });

  router.get('/', (req: express.Request, res: express.Response) => {
    let verifier = new FBVerifier(req);
    if (verifier.verify()) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(req.body['hub.challenge']);
    }
    else {
      res.sendStatus(403);
    }
  });

  router.post('/', (req: express.Request, res: express.Response) => {
    //users request for information are handled here
  })

});