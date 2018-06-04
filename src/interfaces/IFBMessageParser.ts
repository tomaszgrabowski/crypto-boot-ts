import { Message } from "../models/requestbody";
import Command from "../Command";

export default interface IFBMessageParser{
    parse(messageText: string): Command;
}