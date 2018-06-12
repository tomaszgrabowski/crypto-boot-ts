import CommandHandler from "./CommandHandler";
import { Message } from "../models/requestbody";

export default class PriceCheckCommandHandler extends CommandHandler {
    respond(sender_psid: string, received_message: Message): void {
        throw new Error("Method not implemented.");
    }
}