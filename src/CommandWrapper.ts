import Command from "./Command";
import CommandParserError from "./CommandParserError";

export default class CommandWraper{
    public command: Command;
    public error: CommandParserError;
}