import * as express from "express";
import IFBVerifier from "./interfaces/IFBVerifier";
import IFactory from "./interfaces/IFactory";
import SystemMessages from "./SystemMessages";
import FBQueryParser from "./FBQueryParser";
import IFBQueryParser from "./interfaces/IFBQueryParser";


export default class Bootstrap {

  private factory: IFactory;
  private port: number | string;
  private app: express.Application;
  private router: express.Router;
  private verifier: IFBVerifier;
  private parser: IFBQueryParser;
  private config = require('../config.json');
  private accessToken = process.env.PAGE_ACCESS_TOKEN;

  constructor() {
    this.port = process.env.PORT || this.config.port;
    this.app = this.factory.createExpressApp();
    this.router = this.factory.createExpressRouter();
    this.verifier = this.factory.createFBVerifier(this.accessToken);
    this.parser = this.factory.createFBQueryParser();
  }

  run(): void {

    this.app.use(this.router);

    this.app.listen(this.port, () => {

      console.log(`${SystemMessages.init}: ${this.port}`);

      this.router.get('/privacy', (req: express.Request, res: express.Response) => {
        res.json("privacy");
      });

      this.router.get('/', (req: express.Request, res: express.Response) => {
        console.log(SystemMessages.verification);
        if (this.verifier.verify(req, this.parser)) {
          console.log(SystemMessages.verificationSuccess);
          res.status(200).send(req.body['hub.challenge']);
        }
        else {
          console.log(SystemMessages.verificationFail);
          res.sendStatus(403);
        }
      });

      this.router.post('/', (req: express.Request, res: express.Response) => {
        //talking
      })
    });
  }
}
