import CommandHandler from "./CommandHandler";
import { HandlerResponse } from "../models/requestbody";
import { AxiosInstance } from "axios";
import ICoinApi from '../interfaces/ICoinApi';
import { Coin } from "../models/Coin";

export default class PriceCheckCommandHandler extends CommandHandler {

    constructor(protected axios: AxiosInstance, protected api: ICoinApi) {
        super(axios);
    }

    async respond(sender_psid: string, received_message: string): Promise<void> {

        this.api.getByName(received_message).then((coin:Coin)=>{

            const response: HandlerResponse = {
                text: `${coin.name} price is : ${coin.price} $, change on last 24h : ${coin.change} %`
            }
            console.log(response);
            this.SendMessage(sender_psid, response);
        });

    }
}