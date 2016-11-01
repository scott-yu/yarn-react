import 'isomorphic-fetch';
import {endpoints} from '../consts/endpoints';

const TOKEN_STORAGE_KEY = 'oauthToken';
const TOKEN_QUERYSTRING_KEY = 'access_token';
const STATE_QUERYSTRING_KEY = 'state';
const CLIENT_ID = 'iQmetrixHub';
const REDIRECT_URI = `${window.location.origin}/oauth.html`;

export const getAjaxHeader = args => Object.assign({}, args, {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`
});

export const requestToken = () => {
    const endpoint = `${endpoints.accounts}/v1/oauth2/auth`;
    const args = {
        response_type: 'token',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        state: window.location.href,
        approval_prompt: 'auto'
    };
    const querystrings = Object.keys(args).map(key => `${key}=${args[key]}`).join('&');

    redirect(`${endpoint}?${querystrings}`);
}

export const authenicate = () => {
    const token = getTokenFromLocalStorage();
    const authPromise = new Promise((resolve, reject) => {
        if (token) {
            validateToken(token)
                .then(res => {
                    if (res.audience === CLIENT_ID) {
                        resolve();
                        return;
                    }

                    this.requestToken();
                    reject();
                });
        } else {
            requestToken();
            reject();
        }
    });

    return authPromise;
}

export const processTokenAndRedirect = () => {
    const token = parseHash(TOKEN_QUERYSTRING_KEY);
    const state = parseHash(STATE_QUERYSTRING_KEY);

    if (token && state) {
        setTokenInLocalStorage(token);
        redirect(decodeURIComponent(state));
    }
}

export const validateToken = token => {
    const endpoint = `${endpoints.accounts}/v1/oauth2/tokeninfo`;
    const url = `${endpoint}?${TOKEN_QUERYSTRING_KEY}=${token}`;
    return fetch(url).then(res => res.json());
}

export const parseHash = key => {
    const queryObject = window.location.hash
        .replace('#', '')
        .split('&')
        .reduce((results, querystring) => {
            const [key, value] = querystring.split('=');
            return Object.assign({}, results, { [key]: value });
        }, {});

    return key ? queryObject[key] || '' : queryObject;
}

export const redirect = url => {
    window.location.replace(url);
};

export const getTokenFromLocalStorage = () => {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export const setTokenInLocalStorage = token => {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}