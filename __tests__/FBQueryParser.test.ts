import IFBQueryParser from "../src/interfaces/IFBQueryParser";
import FBQueryParser from "../src/FBQueryParser";
import { Mock } from 'moq.ts';
import * as express from 'express';

describe('FBQueryParser', () => {
    test('Parse_WhenCalled_ShouldReturnProperTest1Values', () => {
        let req = new Mock<express.Request>();
        req.setup(x => x.query).returns({
            'hub.mode': 'test',
            'hub.challenge': 'test',
            'hub.verify_token': 'test'
        });
        let parser: IFBQueryParser = new FBQueryParser();
        expect(parser.parse(req.object())).toEqual({
            mode: 'test',
            challenge: 'test',
            token: 'test'
        });
    });

    test('Parse_WhenCalled_ShouldReturnProperTest2Values', () => {
        let req = new Mock<express.Request>();
        req.setup(x => x.query).returns({
            'hub.mode': 'test2',
            'hub.challenge': 'test2',
            'hub.verify_token': 'test2'
        });
        let parser: IFBQueryParser = new FBQueryParser();
        expect(parser.parse(req.object())).toEqual({
            mode: 'test2',
            challenge: 'test2',
            token: 'test2'
        });
    });
});