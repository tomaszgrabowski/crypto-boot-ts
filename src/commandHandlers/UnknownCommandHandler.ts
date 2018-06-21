import CommandHandler from "./CommandHandler";
import { Message, HandlerResponse } from "../models/requestbody";
import CommandParserError from "../CommandParserError";
import IRequestSender from "../interfaces/IRequestSender";

export default class UnknownCommandHandler extends CommandHandler {

    constructor(protected requestSender: IRequestSender) {
        super(requestSender);
    }

    respond(sender_psid: string, received_message: string): void {
        const text = CommandParserError[CommandParserError["Unknown command, please type 'help' for more infromation..."]];
        const response: HandlerResponse = {
            text
        }
        this.SendMessage(sender_psid, response);
    }
}