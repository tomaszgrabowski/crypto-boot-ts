import IFactory from "./interfaces/IFactory";
import IFBQueryParser from "./interfaces/IFBQueryParser";
import IFBVerifier from "./interfaces/IFBVerifier";
import * as express from 'express';
import FBQueryParser from "./FBQueryParser";
import FBVerifier from "./FBVerifier";
import RequestSourceValidator from "./RequestSourceValidator";
import IRequestSourceValidator from "./interfaces/IRequestSourceValidator";
import IFBMessageParser from "./interfaces/IFBMessageParser";
import { ICommandHandler } from "./interfaces/ICommandHandler";
import Command from "./Command";
import ICommunicationService from "./interfaces/ICommunicationService";

export default class Factory implements IFactory {
    createCommunicationService(): ICommunicationService {
        throw new Error("Method not implemented.");
    }
    createFBMessageParser(): IFBMessageParser {
        throw new Error("Method not implemented.");
    }
    createCommandHandler(command: Command): ICommandHandler {
        throw new Error("Method not implemented.");
    }
    createSourceValidator(): IRequestSourceValidator {
        return new RequestSourceValidator()
    }
    createFBQueryParser(): IFBQueryParser {
        return new FBQueryParser();
    }
    createFBVerifier(verifyToken: string): IFBVerifier {
        return new FBVerifier(this, verifyToken);
    }
    createExpressApp(): express.Application {
        return express();
    }
    createExpressRouter(): express.Router {
        return express.Router();
    }
}