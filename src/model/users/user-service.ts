import AndamanService from '../andaman-service';
import store from '../store';
import * as actions from './actions';

export default class UserService{
    constructor(){}

    ssoLogin(){
        return new Promise<any>((resolve, reject) => {
            let accessToken = localStorage.getItem('access_token');
            if(accessToken){
                AndamanService.ready().then((opts) => {
                    let andaman = opts.andaman;
                    let pipe = opts.pipe;

                    let params = {
                        idToken: accessToken,
                        res: 'web'
                    };

                    andaman.get_session_token(pipe, params, function(resp) {
                        if(resp.rc == 1){
                            pipe.setTokens(resp.profile.sessionToken, resp.profile.idToken);
                        }

                        resolve(resp);
                    });
                });
            }
            else{
                resolve();
            }
        });
    }

    login(email, password){
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                var credentials = {
                    email: email,
                    password: password,
                    res: 'web',
                };

                andaman.sso_login_v2(pipe, credentials, function (resp) {
                    if(resp.rc == 1){
                        pipe.setTokens(resp.profile.sessionToken, resp.profile.idToken, resp.profile.auth_version);
                    }

                    resolve(resp);
                });
            });
        });
    }

    getProfile(){
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                andaman.get_profile(pipe, {}, function (resp) {
                    resolve(resp);
                });
            });
        });
    }

    private static _instance: UserService;
    static singleton(){
        if(!UserService._instance) {
            UserService._instance = new UserService();
        }

        return UserService._instance;
    }
}