import config from "../config/config";
import {Client, Account, ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw new Error('Error while createAccount: ', error)
        }
    }

    async login({email, password}) {
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            throw new Error(`Error while login: ${error}`);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw new Error(`Error while getCurrentUser:  ${error}`)
        }
    }

    async logOut() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw new Error('Error while logOut: ', error)
        }
    }
}

const authService = new AuthService()

export default authService;