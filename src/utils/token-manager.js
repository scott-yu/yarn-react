import 'isomorphic-fetch';

const TOKEN_STORAGE_KEY = 'oauthToken';
const CLIENT_ID = 'iQmetrixHub';
const REDIRECT_URI = `${window.location.origin}/oauth.html`;

export class TokenManager {

    getAjaxHeader(args) {
        return Object.assign({}, args, {
            Authorization: `Bearer ${this.getTokenFromLocalStorage()}`
        });
    }

    attachTokenToAjaxCalls({ onUnauthorized } = {}) {
    //     $(document).ajaxSend((event, xhr) => {
    //         var token = this.getAccessToken();
    //         if (token) {
    //             xhr.setRequestHeader("Authorization", "Bearer " + token);
    //             xhr.withCredentials = 'true';
    //         }
    //     });

    //     $(document).ajaxError((event, jqXHR) => {
    //         if (jqXHR.status === 401) {
    //             this.clearAccessToken();
    //             if (onUnauthorized) {
    //                 onUnauthorized();
    //             } else {
    //                 location.reload();
    //             }
    //         }
    //     });
    }

    requestToken({ redirect_uri }) {
        const endpoint = `https://accountsint.iqmetrix.net/v1/oauth2/auth`;

        const args = {
            response_type: 'token',
            client_id: CLIENT_ID,
            redirect_uri: redirect_uri,
            state: window.location.href,
            approval_prompt: 'auto'
        };

        const querystrings = Object.keys(args).map(key => `${key}=${args[key]}`).join('&');

        this.redirect(`${endpoint}?${querystrings}`);
    }

    authenicate() {
        const token = this.getTokenFromLocalStorage();
        const authPromise = new Promise((resolve, reject) => {
            if (token) {
                this.validateToken(token)
                    .then(res => {
                        if (!res.audience) {
                            this.requestToken({ redirect_uri: REDIRECT_URI });
                            return;
                        }

                        if (res.audience === CLIENT_ID) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
            } else {
                this.requestToken({ redirect_uri: REDIRECT_URI });
            }
        });

        return authPromise;
    }

    processTokenAndRedirect() {
        const token = this.getAccessTokenFromUrl();
        const state = this.parseHash('state');

        if (token && state) {
            this.setAccessToken(token);
            this.redirect(decodeURIComponent(state));
        }
    }

    redirect(url) {
        window.location.replace(url);
    }

    validateToken(token) {
        const endpoint = `https://accountsint.iqmetrix.net/v1/oauth2/tokeninfo`;
        const url = `${endpoint}?access_token=${this.getTokenFromLocalStorage()}`;
        return fetch(url).then(res => res.json());
    }

    getAccessTokenFromUrl(){
        const token = this.parseHash('access_token');
        return token || '';
    }

    parseHash(key) {
        const queryObject = window.location.hash.replace('#', '')
            .split('&')
            .reduce((results, querystring) => {
                const [key, value] = querystring.split('=');
                return Object.assign({}, results, { [key]: value });
            }, {});

        return key ? queryObject[key] : queryObject;
    }

    getAccessToken() {
        return this.getAccessTokenFromUrl() || this.getTokenFromLocalStorage() || '';
    }

    setAccessToken(token) {
        this.setTokenInLocalStorage(token);
    }

    clearAccessToken() {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    getTokenFromLocalStorage() {
        return window.localStorage.getItem(TOKEN_STORAGE_KEY);
    }

    setTokenInLocalStorage(token) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
}
