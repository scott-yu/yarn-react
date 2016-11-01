import 'isomorphic-fetch';
import reduxApi from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import {getAjaxHeader} from './utils/auth-helpers';
import {endpoints} from './consts/endpoints';

export const catalogApi = reduxApi({
    search: {
        url: `${endpoints.catalogs}/v1/companies((:ParentEntityId))/catalog/search`,
        options: {
            headers: getAjaxHeader({
                Accept: 'application/json'
            })
        }
    }
}).use('fetch', adapterFetch(fetch));

export const acountsApi = reduxApi({
    me: {
        url: `${endpoints.accounts}/v1/me`,
        options: {
            headers: getAjaxHeader({
                Accept: 'application/json'
            })
        }
    }
}).use('fetch', adapterFetch(fetch));
