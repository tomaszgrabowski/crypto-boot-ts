import IFactory from "./interfaces/IFactory";
import IFBQueryParser from "./interfaces/IFBQueryParser";
import IFBVerifier from "./interfaces/IFBVerifier";
import * as express from 'express';
import FBQueryParser from "./FBQueryParser";
import FBVerifier from "./FBVerifier";
import RequestSourceValidator from "./RequestSourceValidator";
import IRequestSourceValidator from "./interfaces/IRequestSourceValidator";
import IFBMessageParser from "./interfaces/IFBMessageParser";
import Command from "./Command";
import ICommunicationService from "./interfaces/ICommunicationService";
import CommunicationService from "./CommunicationService";
import FBMessageParser from "./FBMessageParser";
import PriceCheckCommandHandler from "./commandHandlers/PriceCheckCommandHandler";
import CommandHandler from "./commandHandlers/CommandHandler";
import * as _ from 'lodash';
import WrongFormatCommandHandler from "./commandHandlers/WrongFormatCommandHandler";
import UnknownCommandHandler from "./commandHandlers/UnknownCommandHandler";
import Axios, { AxiosInstance } from "axios";

export default class Factory implements IFactory {
    createAxiosInstance(): AxiosInstance {
        return Axios;
    }
    createCommunicationService(): ICommunicationService {
        return new CommunicationService(this);
    }
    createFBMessageParser(): IFBMessageParser {
        return new FBMessageParser
    }
    createCommandHandler(messageText: string): CommandHandler {
        //todo: refactor!!!
        for (let enumMember in Command) {
            if (isNaN(Number(enumMember))) {
                if (messageText.indexOf(enumMember) != -1) {
                    if (_.startsWith(messageText, enumMember)) {
                        if (enumMember === Command[Command["Price check"]]) {
                            return new PriceCheckCommandHandler();
                        }
                    } else {
                        return new WrongFormatCommandHandler();
                    }
                }
                else {
                    return new UnknownCommandHandler();
                }
            }
        }
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