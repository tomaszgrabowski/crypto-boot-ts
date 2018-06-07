import { Message } from "../models/requestbody";
import Command from "../Command";
import CommandWrapper from "../CommandWrapper";

export default interface IFBMessageParser{
    parse(messageText: string): CommandWrapper;
}