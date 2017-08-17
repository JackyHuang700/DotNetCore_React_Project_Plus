import axios from 'axios';
import history from '../history';
import {user_Enum} from '../EnumScript/GeneralEnumScript'

export class AuthModule {
    constructor(){
        this.SESSION_TOKEN_KEY = 'reacttoekn_9e209od';
        this.isAuthenticated = false;
        this.userData = {};
        this.loadlocalCache();
    }

    /**
     * 嘗試從cache中取得資料
     * 非同步回伺服器驗證
     */
    loadlocalCache(){
        this.checkLogged();
        let tryData = localStorage.getItem(this.SESSION_TOKEN_KEY);
        if(tryData){
            let mydata = JSON.parse(tryData);
            this.userData = mydata;
            this.isAuthenticated = true;
        }
    }

    /**
     * 取得UserName
     */
    getUserName(){
        return this.userData.userName;
    }

    /**
     * 取得名稱
     */
    getNickName(){
        return this.userData.lastName + ' ' + this.userData.firstName;
    }

    /**
     * 驗證狀態
     * 若狀態為未更改密碼則強制導頁
     * @param {*} user 
     */
    checkStatus(user){
        if(user.status == user_Enum.FIRST_PASSWORD_UNCHANGE){
            history.push('/changePwd?userName='+user.userName);
        }
    }

    /**
     * 驗證當前狀態
     */
    checkLogged(){
        axios({
            url:'/api/WebApi/isLogin',
            method: 'get',
            data:{}
        }).then((result) => {
            if(result.data.success){
                this.writeData(result.data.user);
                this.checkStatus(result.data.user);
            }
            else{
                if(localStorage.getItem(this.SESSION_TOKEN_KEY)){
                    this.signout();
                }            
            }
        }).catch((error) => {
            console.error(error)
        });      
    }

    /**
     * 保存狀態
     */
    writeData(user){
        this.userData = user;
        this.isAuthenticated =true;
        localStorage.setItem(this.SESSION_TOKEN_KEY,JSON.stringify(user));
    }

    /**
     * 登入
     * @param {*} userName 
     * @param {*} password 
     * @param {*} rememberMe 
     * @param {*} callback 
     */
    authenticate(userName,password,rememberMe,callback){
        axios({       
            url: '/api/WebApi/Login',
            method: 'post',
            data: {
            "UserName":userName,
            "Password":password,
            "rememberMe":rememberMe
          }
          }).then((result) => {
            if(result.data.success){
                this.writeData(result.data.user);
                if(callback){
                    return callback();
                }
            }
            alert(result.data.message);
          }).catch((error) => {
            console.error(error)
        });      
    };

    /**
     * 登出
     * @param {*} callback 
     */
    signout(callback){
        this.isAuthenticated = false;
        localStorage.clear();
        axios({       
            url: '/api/WebApi/Logout',
            method: 'get',
            data: {}
          }).then((result) => {
            if(result.data.success){
                if(callback){
                    callback();
                }
                history.push('/Login');
            }
          }).catch((error) => {
            console.error(error)
        });      
    };
}

export const Auth = new AuthModule();