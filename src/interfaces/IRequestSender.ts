import {RequestData} from '../models/RequestData'

export default interface IRequestSender{
    Send(data:RequestData):void;
}