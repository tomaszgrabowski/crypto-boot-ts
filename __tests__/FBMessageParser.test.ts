import FBMessageParser from "../src/FBMessageParser";
import Command from "../src/Command";
import CommandParserError from "../src/CommandParserError";

describe('FBMessageParser', ()=>{
    test('Parser_WhenCalledWithStringStartsWithCommandText_ShouldReturnCommand', ()=>{
        const text = 'Price check BTC';
        const parser = new FBMessageParser();
        expect(parser.parse(text)).toEqual({command: Command["Price check"], error: null});

    });

    test('Parser_WhenCalledWithStringNotStartingWithCommandText_ShouldReturnFormatWarning', ()=>{
        const text = 'blah blah Price check BTC';
        const parser = new FBMessageParser();
        expect(parser.parse(text)).toEqual({command: null, error: CommandParserError["Wrong message format, please type 'help' for more infromation..."]});
    });

    test.only('Parser_WhenCalledWithStringNotContainingCommandText_ShouldReturnHelpMessage', ()=>{
        const text = 'blah blah Price heck BTC';
        const parser = new FBMessageParser();
        expect(parser.parse(text)).toEqual({command: null, error: CommandParserError["Unknown command, please type 'help' for more infromation..."]});
    });

});