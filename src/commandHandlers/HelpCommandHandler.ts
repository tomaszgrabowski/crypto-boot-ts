import CommandHandler from "./CommandHandler";
import { HandlerResponse } from "../models/requestbody";

export default class HelpCommandHandler extends CommandHandler{
    respond(sender_psid: string, received_message: string): void {
        const text = `Crypto-boot is currently in early development stage.
        Currently available commands are:
        price check {COIN} e.g. price check btc
        `;
        const response: HandlerResponse = {
            text
        }
        this.SendMessage(sender_psid, response);
    }

}