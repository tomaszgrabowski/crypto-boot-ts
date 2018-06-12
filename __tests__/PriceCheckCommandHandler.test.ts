import PriceCheckCommandHandler from "../src/commandHandlers/PriceCheckCommandHandler";

describe('PriceCheckCommandHandler', ()=>{
    test('Contructor_WhenCalled_ShouldCreateAnObject', ()=>{
        const handler = new PriceCheckCommandHandler();
        expect(handler).not.toBeNull();
        expect(handler).toBeInstanceOf(PriceCheckCommandHandler);
    });

    test('Respond_WhenCalled_ShouldCallCoinApiGetByName');

    test('Respond_WhenCalled_ShouldSendMessageBackToUser');


});