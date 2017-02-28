interface IAndaman {
    get_txns(pipe, credentials, callback: (resp) => any);
    get_session_token(pipe, credentials: { idToken: string, res?: string }, cb: (resp) => any);
    sso_login(pipe, credentials: { email: string, password: string, res?: string }, cb: (resp) => any);
    sso_login_v2(pipe, credentials: { email: string, password: string, res?: string }, cb: (resp) => any);
    get_profile(pipe, opts: any, cb: (resp) => any);
    admin_get_balance_snapshot_stats(pipe, opts: any, cb: (resp) => any);
    admin_get_wallet_daily_stats(pipe, opts: any, cb: (resp) => any);
    admin_get_signup_daily_stats(pipe, opts: any, cb: (resp) => any);
    admin_get_tx_daily_stats(pipe, opts: any, cb: (resp) => any);
    admin_search_users(pipe, opts: any, cb: (resp) => any);
    admin_get_txns_by_email(pipe, opts: any, cb: (resp) => any);
    admin_get_transactions(pipe, opts: any, cb: (resp) => any);
    get_wallets_by_email(pipe, opts: any, cb: (resp) => any);
    admin_get_fountain_trackings(pipe, opts: any, cb: (resp) => any);
    admin_get_fountain_trackings_daily(pipe, opts: any, cb: (resp) => any);
    unsubscribe_email(pipe, opts: any, cb: (resp) => any);
    admin_search_unsubscribe_emails(pipe, opts: any, cb: (resp) => any);
}

export default class AndamanService {
    private static service = (<any>window).AndamanService;

    static ready(): Promise<{ andaman: IAndaman, pipe: any }> {
        return AndamanService.service.ready();
    }
}