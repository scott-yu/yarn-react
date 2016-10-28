import 'isomorphic-fetch';
import reduxApi from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
export default reduxApi({
    search: {
        url: `https://catalogsint.iqmetrix.net/v1/companies(12435)/catalog/search`,
        options: {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer NW9MUlrGTlI1aExSNfx8UjVuKjRBBxYweQV6PGMlLiNaJCdrBgV-AU0Xfz1ACHwQfikUNGEuPwpTJykVAlZ0Z3cEO2RRHikxehge'
            }
        }
    }
}).use('fetch', adapterFetch(fetch));
