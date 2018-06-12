import IFBMessageParser from "./interfaces/IFBMessageParser";
import Command from "./Command";
import CommandWraper from "./CommandWrapper";
import * as _ from 'lodash';
import CommandParserError from "./CommandParserError";

export default class FBMessageParser implements IFBMessageParser {
    parse(messageText: string): CommandWraper {
        const wrapper = new CommandWraper();

        for (let enumMember in Command) {
            if (isNaN(Number(enumMember))) {
                if (messageText.indexOf(enumMember) != -1) {

                    if (_.startsWith(messageText, enumMember)) {
                        wrapper.command = (<any>Command)[enumMember];
                        wrapper.error = null;
                        break;
                    } else {
                        wrapper.command = null;
                        wrapper.error = CommandParserError["Wrong message format, please type 'help' for more infromation..."]
                        break;
                    }
                }
                else {
                    wrapper.command = null;
                    wrapper.error = CommandParserError["Unknown command, please type 'help' for more infromation..."]
                    break;
                }

            }
        }
        return wrapper;
    }
}