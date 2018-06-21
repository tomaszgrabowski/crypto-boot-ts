import CommandHandler from "./CommandHandler";
import { HandlerResponse } from "../models/requestbody";
import CommandParserError from "../CommandParserError";
import { AxiosInstance } from "axios";
import IRequestSender from "../interfaces/IRequestSender";

export default class WrongFormatCommandHandler extends CommandHandler {
    constructor(protected requestSender: IRequestSender) {
        super(requestSender);
    }
    respond(sender_psid: string, received_message: string): void {
        const text = CommandParserError[CommandParserError["Wrong message format, please type 'help' for more infromation..."]];
        const response: HandlerResponse = {
            text
        };
        this.SendMessage(sender_psid, response);
    }
}