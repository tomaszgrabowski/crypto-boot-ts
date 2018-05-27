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
    //verification process is taken place here
        
        if (mode && token) {

            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === this.verifyToken) {

                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);

            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
        }



    let verifier = new FBVerifier(req, res);
    if (verifier.verify()) {

    }
    else {

    }
  });

  router.post('/', (req: express.Request, res: express.Response) => {
    //users request for information are handled here
  })

});