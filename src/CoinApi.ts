import ICoinApi from "./interfaces/ICoinApi";
import { Coin } from "./models/Coin";
import { AxiosInstance } from "axios";


export default class CoinApi implements ICoinApi {
    listUrl: string = 'https://api.coinmarketcap.com/v2/listings/';
    detailsUrl: string = 'https://api.coinmarketcap.com/v2/ticker/';

    constructor(private axios: AxiosInstance) {
    }

    async getByName(message: string) : Promise<Coin>{
        let coin = await this.axios.get(this.listUrl).then((response) => {
            return response.data.data.find((item:any) => {
                return item.symbol === message;
            });
        });
        let url = this.detailsUrl + coin.id;
        let coinDetails = await this.axios.get(url).then((response) => {
            return response.data.data;
        });
        let _coin:any = {
            name: coinDetails.name,
            price:coinDetails.quotes.USD.price,
            chanage24:coinDetails.quotes.USD.percent_change_24h,
        }
        return _coin;
    }
}
