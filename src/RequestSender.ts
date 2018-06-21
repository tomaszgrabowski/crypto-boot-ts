import IRequestSender from "./interfaces/IRequestSender";
import { RequestData } from "./models/RequestData";
import * as request from 'request';

export default class RequestSender implements IRequestSender{
    Send(data: RequestData): void {
        request({
            "uri": data.uri,
            "qs": data.qs,
            "method": data.method,
            "json": data.json
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    }



}