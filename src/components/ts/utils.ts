const utils = {
    getErrMsg(resp){
        var err = resp.error;
        if(!err) return null;

        switch(err.status){
            case "ACCOUNT_NOT_EXIST":
                return 'Email or password is incorrect.';
            default:
                return err.reason;
        }
    }
};

export default utils;