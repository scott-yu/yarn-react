import 'isomorphic-fetch';
import reduxApi from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import {TokenManager} from './utils/token-manager';

const tokenManager = new TokenManager();

export default reduxApi({
    search: {
        url: `https://catalogsint.iqmetrix.net/v1/companies(12435)/catalog/search`,
        options: {
            headers: tokenManager.getAjaxHeader({
                Accept: 'application/json'
            })
        }
    }
}).use('fetch', adapterFetch(fetch));
