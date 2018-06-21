import ICoinApi from "../src/interfaces/ICoinApi";
import CoinApi from "../src/CoinApi";
import { Mock, It } from "moq.ts";
import { AxiosInstance, AxiosPromise } from "axios";



describe('CoinApi', ()=>{

    let coinApi: ICoinApi;
    let axios: Mock<AxiosInstance>;
    let axiosPromise: Mock<AxiosPromise>;
    const listUrl: string = 'https://api.coinmarketcap.com/v2/listings/';
    const detailsUrl: string = 'https://api.coinmarketcap.com/v2/ticker/';
    const coinsList = require('../fixtures/coinsList.json');
    const coinDetail = require('../fixtures/btc.json');

    beforeEach(()=>{
        axios = new Mock<AxiosInstance>();
        coinApi = new CoinApi(axios.object());
    });

    test('GetByName_WhenCalledWitchExistingCoin_ShouldReturnCoinData', ()=>{
        axios.setup(x=>x.get(listUrl)).returns(Promise.resolve(coinsList));
        axios.setup(x=>x.get(detailsUrl + 1)).returns(Promise.resolve(coinDetail));
        const result = coinApi.getByName("price check btc");
        return expect(result).resolves.toEqual({
            name: 'Bitcoin',
            price: 9024.09,
            change: -4.18
        });
    });

    test('GetByName_WhenCalledWitchNotExistingCoin_ShouldReturnNull', ()=>{
        axios.setup(x=>x.get(listUrl)).returns(Promise.resolve(coinsList));

        const result = coinApi.getByName("price check btccc");
        return expect(result).resolves.toBeNull();
    });
})