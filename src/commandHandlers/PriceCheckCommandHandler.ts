import CommandHandler from "./CommandHandler";
import { Message } from "../models/requestbody";
import { AxiosInstance } from "axios";

export default class PriceCheckCommandHandler extends CommandHandler {

    constructor(protected axios: AxiosInstance) {
        super(axios);
    }

    respond(sender_psid: string, received_message: string): void {
        throw new Error("Method not implemented.");
    }
}