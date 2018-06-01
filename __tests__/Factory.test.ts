import Factory from "../src/Factory";
import FBQueryParser from '../src/FBQueryParser';
import IFactory from "../src/interfaces/IFactory";
import FBVerifier from "../src/FBVerifier";
import * as express from 'express';
import RequestSourceValidator from "../src/RequestSourceValidator";

describe('Factory', ()=>{
    let factory: IFactory;

    beforeEach(()=>{
        factory = new Factory();
    })

    test('createFBQueryParser_WhenCalled_ShouldCreateFBQueryParserObject',()=>{
        const parser = factory.createFBQueryParser();
        expect(parser).not.toBeNull;

        //todo: how to check on interface instead??
        expect(parser).toBeInstanceOf(FBQueryParser);
    });

    test('createFBVerifier_WhenCalled_ShouldCreateFBVerifierObject',()=>{
        const verifier = factory.createFBVerifier("testToken");
        expect(verifier).not.toBeNull;

        //todo: how to check on interface instead??
        expect(verifier).toBeInstanceOf(FBVerifier);
    });

    test('createExpressApp_WhenCalled_ShouldCreateExpressApplicationObject',()=>{
        const app = factory.createExpressApp();
        expect(app).not.toBeNull;
    });

    test('createExpressRouter_WhenCalled_ShouldCreateExpressRouterObject', ()=>{
        const router = factory.createExpressRouter()
        expect(router).not.toBeNull;
    });

    test('createRequestSourceValidator_WhenCalled_ShouldCreateRequestSourceValidator',()=>{
        const validator = factory.createSourceValidator();
        expect(validator).not.toBeNull;

        //todo: how to check on interface instead??
        expect(validator).toBeInstanceOf(RequestSourceValidator);
    });
})