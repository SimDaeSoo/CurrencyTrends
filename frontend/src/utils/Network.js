import axios from 'axios';

export default class Network {
    static async post(address, req) {
        try {
            const requestParam = [req];
            const response = await axios.post(`${address}`, ...requestParam);

            if (response.status !== 200) {
                return undefined;
            }

            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    static async get(address, req) {
        try {
            const requestParam = {
                params: req
            };
            const response = await axios.get(`${address}`, requestParam);

            if (response.status !== 200) {
                return undefined;
            }

            return response.data;
        } catch (error) {
            return undefined;
        }
    }
}