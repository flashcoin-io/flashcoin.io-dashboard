export const USERS = {
    LOGIN: 'USERS.LOGIN',
    LOGIN_SUCCESS: 'USERS.LOGIN_SUCCESS',
    LOGIN_FAILED: 'USERS.LOGIN_FAILED',
    LOGOUT: 'USERS.LOGOUT',
    SSO_LOGIN_SUCCESS: 'USERS.SSO_LOGIN_SUCCESS',
    SSO_LOGIN_FAILED: 'USERS.SSO_LOGIN_FAILED',
    GET_PROFILE_SUCCESS: 'USERS.GET_PROFILE_SUCCESS',
    GET_PROFILE_FAILED: 'USERS.GET_PROFILE_FAILED',
    REMEMBER_ME: 'USERS.REMEMBER_ME',
    SAVE_ACCESS_TOKEN: 'USERS.SAVE_ACCESS_TOKEN',
    REMOVE_ACCESS_TOKEN: 'USERS.REMOVE_ACCESS_TOKEN'
};

export const STATISTICS = {
    WALLET_SNAPSHOT_SUCCESS: 'STATS.WALLET_SNAPSHOT_SUCCESS',
    WALLET_SNAPSHOT_FAILED: 'STATS.WALLET_SNAPSHOT_FAILED',
    SIGNUP_DAILY_SUCCESS: 'STATS.SIGNUP_DAILY_SUCCESS',
    SIGNUP_DAILY_FAILED: 'STATS.SIGNUP_DAILY_FAILED',
    TX_DAILY_SUCCESS: 'STATS.TX_DAILY_SUCCESS',
    TX_DAILY_FAILED: 'STATS.TX_DAILY_FAILED',
    FTN_TRACKING_DAILY_SUCCESS: 'STATS.FTN_TRACKING_DAILY_SUCCESS',
    FTN_TRACKING_DAILY_FAILED: 'STATS.FTN_TRACKING_DAILY_FAILED',
};

export const ADMIN = {
    FIND_ACCOUNTS_SUCCESS: 'ADMIN.FIND_ACCOUNTS_SUCCESS',
    FIND_ACCOUNTS_FAILED: 'ADMIN.FIND_ACCOUNTS_FAILED',
    GET_USER_TXNS_SUCCESS: 'ADMIN.GET_USER_TXNS_SUCCESS',
    GET_USER_TXNS_FAILED: 'ADMIN.GET_USER_TXNS_FAILED',
    GET_TXNS_SUCCESS: 'ADMIN.GET_TXNS_SUCCESS',
    GET_TXNS_FAILED: 'ADMIN.GET_TXNS_FAILED',
    SIGNUP_ACCOUNTS_SUCCESS: 'ADMIN.SIGNUP_ACCOUNTS_SUCCESS',
    SIGNUP_ACCOUNTS_FAILED: 'ADMIN.SIGNUP_ACCOUNTS_FAILED',
    GET_USER_WALLET_SUCCESS: 'ADMIN.GET_USER_WALLET_SUCCESS',
    GET_USER_WALLET_FAILED: 'ADMIN.GET_USER_WALLET_FAILED',
    GET_FTN_TRACKINGS_SUCCESS: 'GET_FTN_TRACKINGS_SUCCESS',
    GET_FTN_TRACKINGS_FAILED: 'GET_FTN_TRACKINGS_FAILED',
    FIND_UNSUBSCRIBE_EMAILS_SUCCESS: 'ADMIN.FIND_UNSUBSCRIBE_EMAILS_SUCCESS',
    FIND_UNSUBSCRIBE_EMAILS_FAILED: 'ADMIN.FIND_UNSUBSCRIBE_EMAILS_FAILED',
    UNSUBSCRIBE_EMAIL_SUCCESS: 'ADMIN.UNSUBSCRIBE_EMAIL_SUCCESS',
    UNSUBSCRIBE_EMAIL_FAILED: 'ADMIN.UNSUBSCRIBE_EMAIL_FAILED',
};

export const COMMONS = {
    TOGGLE_LOADING: 'COMMONS.TOGGLE_LOADING'
};

export interface IUser{
    email: string;
    idToken: string;
    role: string;
    res: string;
    sessionToken: string;
}

export interface IAccount{
    createdTime?: string;
    name?: string;
    email: string;
    phone?: string;
    balance?: number;
    createdBy?: string;
}

export interface IPagingOptions{
    pageSize: number;
    total?: number;
    pageIndex: number;
    orderBy?: string;
    asc?: boolean;
}

export interface ITransaction{
    name: string;
    publicAddress: string;
    email: string;
    note: string;
    amount: number;
    date: string;
    direction: DirectionType;
    txid: string
}

export interface IFullTransaction{
    from: string;
    senderPublicAddress: string;
    to: string;
    receiverPublicAddress: string;
    note: string;
    amount: number;
    date: string;
    txid: string;
    txType: string;
}

export enum DirectionType{
    Incomming,
    Outgoing
}

export interface IDateRange{
    from: string;
    to: string;
}

export interface IStatisticsData {
    walletSnapshot?: IWalletSnapshot;
    transactionDaily?: ITransactionDaily;
    signupDaily?: ISignupDaily;
    ftnTrackingDaily? : IFountainTrackingDaily[]
}

export interface IWalletSnapshot {
    current_stats: IWalletCurrentStats;
    balance_stats: IWalletBalanceStats;
    daily_stats: IWalletDailyStats[];
    period_stats: any;
}

export interface IWalletCurrentStats {
    total_wallet_count: number;
    today_added_wallet_count: number;
}

export interface IWalletBalanceStats {
    greater_than_0_count: number;
    greater_than_100_count: number;
    equal_zero_count: number;
}

export interface IWalletDailyStats {
    date: string;
    wallet_add_count: number;
}

export interface ISignupDaily {
    daily_stats: ISignupDailyDaily[],
    period_stats: ISignupPeriodStats,
    current_stats: ISignupTodayStats
}

export interface ISignupDailyDaily {
    date: string;
    signup_bin_count: number;
    signup_safecash_count: number;
    signup_seen_count: number;
    signup_cakecodes_count: number;
    signup_total_count: number;
}

export interface ISignupPeriodStats {
    signup_bin_count: number;
    signup_safecash_count: number;
    signup_seen_count: number;
    signup_cakecodes_count: number;
}

export interface ISignupTodayStats {
    today_so_far_bin_count: number;
    today_so_far_seen_count: number;
    today_so_far_safecash_count: number;
    today_so_far_cakecodes_count: number;
}

export interface IFountainTrackingDaily {
    stats_date: string;
    skip_ads_count: number;
    view_ads_count: number;
    got_reward_count: number;
    signup_count: number;
    total_count: number;
}

export interface ITransactionDaily {
    current_stats: ITransactionDailyCurrentStats;
    daily_stats: ITransactionDailyDailyStats[];
    period_stats?: any
}

export interface ITransactionDailyCurrentStats {
    today_so_far_tx_top: IServerTransaction[];
    last_hour_tx_count?: number;
    last_hour_tx_volume?: number;
    today_so_far_tx_count?: number;
    today_so_far_tx_volume?: number;
}

export interface IServerTransaction {
    sender_email: string;
    receiver_email: string;
    amount: number;
    created_ts: string;
}

export interface ITransactionDailyDailyStats {
    date: string;
    tx_count: number;
    tx_volume: number;
}

export interface IAdminData{
    findAccountData?: IFindAccountsData;
    signupAccountData?: ISignupAccountsData;
    userDetails?: IUserDetails;
    userWallet?: any;
    transactionsData?: any;
    listTrackingsData?: IListTrackingsData;
    unsubscribeEmailData?: any;
}

export interface IListTrackingsData {
    trackings: IFountainTracking[];
    range: IDateRange,
    paging: IPagingOptions,
}

export interface ITransactionsData {
    txns: IFullTransaction[],
    range: IDateRange,
    pagingOpts: IPagingOptions
}

export interface IFindAccountsData {
    accounts: IAccount[];
    searchText: string; 
    paging: IPagingOptions;
}

export interface ISignupAccountsData {
    accounts: IAccount[];
    range: IDateRange; 
    paging: IPagingOptions;
}

export interface IUserDetails {
    user?: IAccount;
    txns?: ITransaction[];
    range?: IDateRange;
    pagingOpts?: IPagingOptions;
    wallet?: any
}

export interface ApplicationState{
    lastAction: {type: string, data: any},
    userData: {user: IUser},
    commonData: {isLoading: boolean},
    adminData: IAdminData,
    statisticsData: IStatisticsData,
}

export interface IFountainTracking {
    track_id?: string;
    client_ip?: string;
    created_ts?: Date;
    skip_ads?: boolean;
    view_ads?: boolean;
    got_reward?: boolean;
    foutain_id?: string;
    signup?: boolean;
    signup_email?: string;
}