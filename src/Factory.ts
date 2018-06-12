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
import CommandWraper from "./CommandWrapper";
import PriceCheckCommandHandler from "./commandHandlers/PriceCheckCommandHandler";
import CommandHandler from "./commandHandlers/CommandHandler";
import CommandParserError from "./CommandParserError";
import * as _ from 'lodash';

export default class Factory implements IFactory {
    createCommunicationService(): ICommunicationService {
        return new CommunicationService(this);
    }
    createFBMessageParser(): IFBMessageParser {
        return new FBMessageParser
    }
    createCommandHandler(messageText: string): CommandHandler {

        for (let enumMember in Command) {
            if (isNaN(Number(enumMember))) {
                if (messageText.indexOf(enumMember) != -1) {

                    if (_.startsWith(messageText, enumMember)) {
                        //witch enum?
                        if(enumMember === Command[Command["Price check"]])
                        return new PriceCheckCommandHandler();
                        break;
                    } else {
                        //WrongFormatCommandHandler
                        //wrapper.command = null;
                        //wrapper.error = CommandParserError["Wrong message format, please type 'help' for more infromation..."]
                        break;
                    }
                }
                else {
                    //UnknownCommandHandler
                    //wrapper.command = null;
                    //wrapper.error = CommandParserError["Unknown command, please type 'help' for more infromation..."]
                    break;
                }

            }
        }
        return null;
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