import ICoinApi from "./interfaces/ICoinApi";
import { Coin } from "./models/Coin";
import { AxiosInstance } from "axios";


export default class CoinApi implements ICoinApi {
    listUrl: string = 'https://api.coinmarketcap.com/v2/listings/';
    detailsUrl: string = 'https://api.coinmarketcap.com/v2/ticker/';

    constructor(private axios: AxiosInstance) {
    }

    async getByName(message: string) : Promise<Coin>{

        message = message.substring(12, message.length).trim().toUpperCase();

        return this.axios.get(this.listUrl).then((response) => {

            let coin = response.data.data.find((coin:any) => {
                return coin.symbol == message.toUpperCase();
            });
            if(!coin) return null;
            let url = this.detailsUrl + coin.id;
            return this.axios.get(url).then((response: any) => {
                let coinDetail = response.data.data;
                let _coin: Coin = {
                    name: coinDetail.name,
                    price: coinDetail.quotes.USD.price,
                    change: coinDetail.quotes.USD.percent_change_24h,
                }
                return _coin;
            });
        });

    }
}
