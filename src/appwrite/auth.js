import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteURL)
      .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
    // as soon as someone creates object out of this class
  }

  // create user functionality
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        console.log("Error while creating user");
      }
    } catch (err) {
      console.log("AppWrite service :: createAccount() :: ", err);
    }
  }
  //   login functionality
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      console.log("AppWrite service :: login() :: ", err);
    }
  }
  // fetching current user
  async getCurrentSession() {
    try {
      await this.account.get();
    } catch (err) {
      console.log("AppWrite service :: getCurrentSession() :: ", err);
    }
    return null;
  }
  // logout the user
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.log("AppWrite service :: logout() :: ", err);
    }
  }
}
// to create a class and export a object out of it so we can use it anywhere

const authService = new AuthService();

export default authService;
