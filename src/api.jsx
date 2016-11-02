import 'isomorphic-fetch';
import reduxApi from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import {getAjaxHeader} from './utils/auth-helpers';
import {endpoints} from './consts/endpoints';

export const productLibraryApi = reduxApi({
    product: {
        url: `${endpoints.productLibrary}/ProductManager/products/(:slug)?companyEntityId=(:ParentEntityId)`,
        options: {
            headers: getAjaxHeader({
                Accept: 'application/json'
            })
        },
        helpers: {
            get(slug) {
                const {ParentEntityId} = this.getState().accounts.me.data;
                return [{ slug,  ParentEntityId }];
            }
        }
    }
}).use('fetch', adapterFetch(fetch));

export const catalogApi = reduxApi({
    search: {
        url: `${endpoints.catalogs}/v1/companies((:ParentEntityId))/catalog/search(:filters)`,
        options: {
            headers: getAjaxHeader({
                Accept: 'application/json'
            })
        },
        helpers: {
            get(filters = {}) {
                const {ParentEntityId} = this.getState().accounts.me.data;
                const urlParams = Object.assign({}, {
                    OrderDir: 'asc',
                    OrderBy: 'dateAdded',
                    PageSize: 25
                }, filters);
                const queryStrings = Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&');
                return [{ ParentEntityId, filters: `?${queryStrings}` }];
            }
        }
    },
    getClassificationTree: {
        url: `${endpoints.catalogs}/v1/companies((:ParentEntityId))/catalog/classificationtrees`,
        options: {
            headers: getAjaxHeader({
                Accept: 'application/json'
            })
        },
        helpers: {
            get() {
                const {ParentEntityId} = this.getState().accounts.me.data;
                return [{ ParentEntityId }];
            }
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
