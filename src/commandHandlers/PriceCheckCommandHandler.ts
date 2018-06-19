import CommandHandler from "./CommandHandler";
import { HandlerResponse } from "../models/requestbody";
import { AxiosInstance } from "axios";
import ICoinApi from '../interfaces/ICoinApi';
import { Coin } from "../models/Coin";

export default class PriceCheckCommandHandler extends CommandHandler {

    constructor(protected axios: AxiosInstance, protected api: ICoinApi) {
        super(axios);
    }

    respond(sender_psid: string, received_message: string): void {

        const coin: Coin = this.api.getByName(received_message);
        const response: HandlerResponse = {
            text: `${coin.name} price is : ${coin.price}`
        }
        this.SendMessage(sender_psid, response);
    }

    getCoinName(message: string): string{
        return message.substr(12,message.length);
    }
}