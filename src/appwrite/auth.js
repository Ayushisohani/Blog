import conf from '../conf/conf.js';
import {Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try{
          const userAccount = await this.account.create(ID.unique(),email,password,name);
          if(userAccount){
           return this.Login({email,password});
          }else{
            return userAccount;
          }
        }catch(error){
               throw error;
        }
    }
    async Login({email,password}){
        try{
          return await this.account.createEmailPasswordSession(email,password);
           
        }catch(error){
             throw error;
        }
    }
    async getCurrentUser() {
        try{
          return await this.account.get();
        }catch(error){
          console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout(){
        try{
         return this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authservice = new AuthService();

export default authservice;