import PriceCheckCommandHandler from "../src/commandHandlers/PriceCheckCommandHandler";
import Axios, { AxiosInstance, AxiosPromise } from "axios";
import { Mock, IMock, It, Times } from "moq.ts";
import ICoinApi from "../src/interfaces/ICoinApi";
import IRequestSender from "../src/interfaces/IRequestSender";
import Is from "../tools/Is";



describe('PriceCheckCommandHandler', () => {

    let coinApiMock: IMock<ICoinApi>;
    let handler: PriceCheckCommandHandler;
    let requestSender: Mock<IRequestSender>;

    beforeEach(() => {
        requestSender = new Mock<IRequestSender>();
        coinApiMock = new Mock<ICoinApi>();
        handler = new PriceCheckCommandHandler(requestSender.object(), coinApiMock.object());
        coinApiMock.setup(x => x.getByName(It.IsAny())).returns({
            name: 'BTC',
            price: 1000
        });
        requestSender.setup(x => x.Send(It.IsAny()));
    });

    test('Contructor_WhenCalled_ShouldCreateAnObject', () => {

        expect(handler).not.toBeNull();
        expect(handler).toBeInstanceOf(PriceCheckCommandHandler);
    });

    test('Respond_WhenCalled_ShouldCallCoinApiGet', () => {

        const handler = new PriceCheckCommandHandler(requestSender.object(), coinApiMock.object());
        handler.respond("test", "Price check BTC")
        coinApiMock.verify(x => x.getByName(It.IsAny()), Times.Once());
    });

    test('Respond_WhenCalledWithExistingCoin_ShouldSendCoinDetails', async () => {
        coinApiMock.setup(x => x.getByName(It.IsAny())).returns(Promise.resolve({
            name: 'Bitcoin',
            price: 9024.09,
            change: -4.18
        }));
        requestSender.setup(x => x.Send(It.IsAny()));
        const handler = new PriceCheckCommandHandler(requestSender.object(),
            coinApiMock.object());
        await handler.respond("test", "price check btc");
        requestSender.verify(x => x.Send(
            Is.Eq({
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: 'testtoken' },
                method: 'POST',
                json:
                {
                    recipient: { id: 'test' },
                    message:
                        { text: 'Bitcoin price is : 9024.09 $, change on last 24h : -4.18 %' }
                }
            })
        ), Times.Once());
    });

    test('Respond_WhenCalledWithNonExistingCoin_ShouldSendSorryText', async () => {
        coinApiMock.setup(x => x.getByName(It.IsAny())).returns(Promise.resolve(null));
        requestSender.setup(x => x.Send(It.IsAny()));
        const handler = new PriceCheckCommandHandler(requestSender.object(),
            coinApiMock.object());
        await handler.respond("test", "price check btcc");
        requestSender.verify(x => x.Send(
            Is.Eq({
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: 'testtoken' },
                method: 'POST',
                json:
                {
                    recipient: { id: 'test' },
                    message:
                        { text: "Sorry, I wasn't able to find this coin..." }
                }
            })
        ), Times.Once());
    });
});

