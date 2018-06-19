
import { Coin } from "../models/Coin";

export default interface ICoinApi{
    getByName(name: string): Promise<Coin>;
}


