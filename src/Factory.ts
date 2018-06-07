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
import CommunicationService from "./CommunicationService";
import FBMessageParser from "./FBMessageParser";
import CommandWraper from "./CommandWrapper";

export default class Factory implements IFactory {
    createCommunicationService(): ICommunicationService {
        return new CommunicationService(this);
    }
    createFBMessageParser(): IFBMessageParser {
        return new FBMessageParser
    }
    createCommandHandler(command: CommandWraper): ICommandHandler {
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