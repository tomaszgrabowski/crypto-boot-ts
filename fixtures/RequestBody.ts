import { RequestBody } from "../src/models/requestbody";

const reqBodyFixture: RequestBody = {
    "object": "page",
    "entry": [
        {
            "id": "193545808132942",
            "time": 1527183760908,
            "messaging": [
                {
                    "sender": {
                        "id": "1638235769545991"
                    },
                    "recipient": {
                        "id": "193545808132942"
                    },
                    "timestamp": 1527183586101,
                    "message": {
                        "mid": "mid.$cAADq9E3x9MppxIF7NVjkzwyPgk5z",
                        "seq": 274504,
                        "text": "Price check eth"
                    }
                }
            ]
        }
    ]
}
export default reqBodyFixture;