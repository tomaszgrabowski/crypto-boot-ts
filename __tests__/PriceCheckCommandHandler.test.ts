import PriceCheckCommandHandler from "../src/commandHandlers/PriceCheckCommandHandler";
import Axios, { AxiosInstance, AxiosPromise } from "axios";
import { Mock, IMock, It, Times } from "moq.ts";
import ICoinApi from "../src/interfaces/ICoinApi";
import CommandHandler from "../src/commandHandlers/CommandHandler";
import { Coin } from "../src/models/Coin";

describe('PriceCheckCommandHandler', () => {

    let coinApiMock: IMock<ICoinApi>;
    let handler: PriceCheckCommandHandler
    let axiosMock: Mock<AxiosInstance>;
    let axiosPromise: Mock<AxiosPromise>;

    beforeEach(() => {
        axiosMock = new Mock<AxiosInstance>();
        axiosPromise = new Mock<AxiosPromise>();
        coinApiMock = new Mock<ICoinApi>();
        handler = new PriceCheckCommandHandler(axiosMock.object(), coinApiMock.object());
        coinApiMock.setup(x => x.getByName(It.IsAny())).returns({
            name: 'BTC',
            price: 1000
        });
    });

    test('Contructor_WhenCalled_ShouldCreateAnObject', () => {

        expect(handler).not.toBeNull();
        expect(handler).toBeInstanceOf(PriceCheckCommandHandler);
    });

    test('Respond_WhenCalled_ShouldCallCoinApiGet', () => {

        const handler = new PriceCheckCommandHandler(Axios, coinApiMock.object());
        handler.respond("test", "Price check BTC")
        coinApiMock.verify(x => x.getByName(It.IsAny()), Times.Once());
    });

    test('Respond_WhenCalled_ShouldSendMessageBackToUser', () => {
        axiosPromise.setup(x => x.catch(It.IsAny())).returns(null);
        axiosMock.setup(x => x.post(It.IsAny(), It.IsAny())).returns(axiosPromise.object());
        handler.respond("test", "test").then(()=>{
            axiosMock.verify(x => x.post("https://graph.facebook.com/v2.6/me/messages", It.IsAny()), Times.Once());
        });
    });

    test('Respond_WhenCalledWithExistingCoin_ShouldSendCoinDetails');

    test('Respond_WhenCalledWithNonExistingCoin_ShouldSendSorryText');


    // test('Respond_WhenCalledShouldRepondWithProperText', () => {
    //     axiosPromise.setup(x => x.catch(It.IsAny())).returns(null);
    //     axiosMock.setup(x => x.post(It.IsAny(), It.IsAny())).returns(axiosPromise.object());
    //     handler.respond('test', 'test');
    //     coinApiMock.setup(x => x.getByName(It.IsAny())).returns({
    //         name: "BTC",
    //         price: 1000
    //     });
    //     const data = {
    //         qs: { "access_token": "testtoken" },
    //         json: {
    //             "recipient": {
    //                 "id": "test"
    //             },
    //             "message": "BTC price is : 1000"
    //         }
    //     };
    //     axiosMock.verify(x => x.post("https://graph.facebook.com/v2.6/me/messages", data), Times.Once());
    // })


});