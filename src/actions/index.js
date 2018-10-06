import axios from 'axios';
import serialize from '../utils/commonUtils';

const URL = 'https://api.github.com/search/repositories';

export const searchRepos = (params) =>{
    const queryString = serialize(params);
    const request = axios.get(`${URL}?q=${queryString}`)
                    .then(response => response.data)
    return {
        type: 'SEARCH_REPOS',
        payload: request
    }
}
