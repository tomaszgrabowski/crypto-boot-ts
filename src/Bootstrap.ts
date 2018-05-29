import * as express from "express";
import IFBVerifier from "./interfaces/IFBVerifier";
import IFactory from "./interfaces/IFactory";


export default class Bootstrap {

  private factory: IFactory;
  private port: number | string;
  private app: express.Application;
  private router: express.Router;
  private verifier: IFBVerifier;
  private config = require('../config.json');

  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = this.factory.createExpressApp();
    this.router = this.factory.createExpressRouter();
    this.verifier = this.factory.createFBVerifier(this.config.verifyToken);
  }

  run(): void {

    this.app.use(this.router);

    this.app.listen(this.port, () => {

      console.log(`Crypto-boot has started, app is listenting on port: ${this.port}`);

      this.router.get('/privacy', (req: express.Request, res: express.Response) => {
        res.json("privacy");
      });

      this.router.get('/', (req: express.Request, res: express.Response) => {
        if (this.verifier.verify()) {
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(req.body['hub.challenge']);
        }
        else {
          res.sendStatus(403);
        }
      });

      this.router.post('/', (req: express.Request, res: express.Response) => {
        //talking
      })
    });
  }
}
