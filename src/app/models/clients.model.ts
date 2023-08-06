export class Client {

    constructor(
        public name: string,
        public phone: string,
        public cedula?: string,
        public email?: string,
        public address?: string,
        public city?: string,
        public department?: string,
        public status?: boolean,
        public fecha?: Date,
        public cid?: string
    ){}

}