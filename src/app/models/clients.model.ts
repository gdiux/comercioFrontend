export class Client {

    constructor(
        public name: string,
        public email: string,
        public lastname?: string,
        public cedula?: string,
        public phone?: string,
        public address?: string,
        public password?: string,
        public city?: string,
        public department?: string,
        public party_type?: string,
        public referralCode?: string,
        public referredBy?: string,
        public walletBalance?: number,
        public status?: boolean,
        public fecha?: Date,
        public cid?: string,
        public _id?: string,
    ){}

}