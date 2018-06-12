import ICommandHandler from "../interfaces/ICommandHandler";
import * as express from 'express';
import * as request from 'request';
import { Message } from "../models/requestbody";



export default abstract class CommandHandler {

    protected PAGE_ACCESS_TOKEN : string = process.env.PAGE_ACCESS_TOKEN;

    abstract respond(sender_psid: string, received_message: Message): void;

    protected SendMessage(sender_psid: string, response: express.Response) {
        const request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": this.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    }


}