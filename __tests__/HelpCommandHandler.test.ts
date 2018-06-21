import HelpCommandHandler from "../src/commandHandlers/HelpCommandHandler";
import IRequestSender from "../src/interfaces/IRequestSender";
import { Mock, It } from "moq.ts";
import Is from "../tools/Is";

describe('HelpCommandHandler', () => {
    test('Respond_Whencalled_SHouldReturnCommandsList', () => {
        const requestSender = new Mock<IRequestSender>()
        requestSender.setup(x => x.Send(It.IsAny())).returns(null);
        const handler = new HelpCommandHandler(requestSender.object());
        handler.respond('test', 'hElP');
        const data = {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: 'testtoken' },
            method: 'POST',
            json:
            {
                recipient: { id: 'test' },
                message:
                    { text: 'Crypto-boot is currently in early development stage.\n        Currently available commands are:\n        price check {COIN} e.g. price check btc\n        ' }
            }
        }
        requestSender.verify(x => x.Send(Is.Eq(data)));
    });
})