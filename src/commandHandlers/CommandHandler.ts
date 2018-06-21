import ICommandHandler from "../interfaces/ICommandHandler";
import * as request from 'request';
import { Message, HandlerResponse } from "../models/requestbody";
import axios, { AxiosInstance } from 'axios';
import IRequestSender from "../interfaces/IRequestSender";



export default abstract class CommandHandler {

    protected PAGE_ACCESS_TOKEN: string = process.env.PAGE_ACCESS_TOKEN || 'testtoken';

    abstract respond(sender_psid: string, received_message: string): void;

    constructor(protected requestSender: IRequestSender) {
    }

    protected SendMessage(sender_psid: string, response: HandlerResponse) {
        const data = {
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": this.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }
        }
        this.requestSender.Send(data);
    }


}