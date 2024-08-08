import axios from 'axios';
import { constants } from '../../env';

const Api = axios.create({
    baseURL: constants.url_api,
});

export default Api;