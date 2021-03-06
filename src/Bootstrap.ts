import * as express from "express";
import IFBVerifier from "./interfaces/IFBVerifier";
import IFactory from "./interfaces/IFactory";
import SystemMessages from "./SystemMessages";
import ICommunicationService from "./interfaces/ICommunicationService";
import Factory from "./Factory";
import IRequestSourceValidator from "./interfaces/IRequestSourceValidator";
import * as bodyParser from 'body-parser';
import * as path from "path";


export default class Bootstrap {

  private factory: IFactory;
  private port: any = process.env.PORT || 1334;
  private app: express.Application;
  private router: express.Router;
  private verifier: IFBVerifier;
  private sourceValidator: IRequestSourceValidator;
  private accessToken: string;
  private communicationService: ICommunicationService;

  constructor() {
    this.accessToken = process.env.verifyToken || "testtoken";
    this.factory = new Factory();
    this.app = this.factory.createExpressApp();
    this.router = this.factory.createExpressRouter();
    this.verifier = this.factory.createFBVerifier(this.accessToken);
    this.sourceValidator = this.factory.createSourceValidator();
    this.communicationService = this.factory.createCommunicationService();
  }

  run(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(this.router);

    this.app.listen(this.port, () => {

      console.log(`${SystemMessages.init}: ${this.port}`);

      this.router.get('/privacy', (req:any, res: express.Response) => {
        res.sendFile('privacy_policy.html', {root: path.join(process.cwd(), '/static')});
      });

      this.router.get('/', (req: express.Request, res: express.Response) => {
        console.log(SystemMessages.verification);
        if (this.verifier.verify(req)) {
          console.log(SystemMessages.verificationSuccess);
          res.status(200).send(req.query['hub.challenge']);
        }
        else {
          console.log(SystemMessages.verificationFail);
          res.sendStatus(403);
        }
      });

      this.router.post('/', (req: express.Request, res: express.Response) => {
        console.log(SystemMessages.messageRecived);
        if (!this.sourceValidator.validate(req)) {
          console.log(SystemMessages.unknownSource);
          res.sendStatus(404);
          return;
        }

        this.communicationService.processRequest(req, res);
        res.status(200).send(SystemMessages.eventReceived);

      })
    });
  }
}


