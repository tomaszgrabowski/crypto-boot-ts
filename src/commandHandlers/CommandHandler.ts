import ICommandHandler from "../interfaces/ICommandHandler";
import * as request from 'request';
import { Message, HandlerResponse } from "../models/requestbody";
import axios, { AxiosInstance } from 'axios';



export default abstract class CommandHandler {

    protected PAGE_ACCESS_TOKEN: string = process.env.PAGE_ACCESS_TOKEN || 'testtoken';

    abstract respond(sender_psid: string, received_message: string): void;

    constructor(protected axios: AxiosInstance) {
    }

    protected SendMessage(sender_psid: string, response: HandlerResponse) {
        const data = {
            qs: { "access_token": this.PAGE_ACCESS_TOKEN },
            json: {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }
        };
        this.axios.post('https://graph.facebook.com/v2.6/me/messages',
            data
        )
    }


}