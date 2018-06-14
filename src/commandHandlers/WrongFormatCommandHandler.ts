import CommandHandler from "./CommandHandler";
import { HandlerResponse } from "../models/requestbody";
import CommandParserError from "../CommandParserError";
import { AxiosInstance } from "axios";

export default class WrongFormatCommandHandler extends CommandHandler {
    constructor(protected axios: AxiosInstance) {
        super(axios);
    }
    respond(sender_psid: string, received_message: string): void {
        const text = CommandParserError[CommandParserError["Wrong message format, please type 'help' for more infromation..."]];
        const response: HandlerResponse = {
            text
        };
        this.SendMessage(sender_psid, response);
    }
}