//權限
var role_Enum = {
    STOP: {
        "value": "0",
        "name": "已停權",
    },

    NORMAL: {
        "value": "1",
        "name": "正常啟用",
    },

}




//會員
var user_Enum = {
    STOP: {
        "value": "0",
        "name": "已停權",
    },

    NORMAL: {
        "value": "1",
        "name": "正常啟用",
    },


    EMAIL_NO_VAILD: {
        "value": "2",
        "name": "信箱未驗證",
    },
    FIRST_PASSWORD_UNCHANGE: {
        "value": "3",
        "name": "第一次未更改密碼",
    },
    ERROR_COUNT: {
        "value": "4",
        "name": "錯誤次數",
    },
}


//最新消息
var news_Enum = {
    STOP: {
        "value": "0",
        "name": "已停",
    },

    NORMAL: {
        "value": "1",
        "name": "啟用",
    },


    DELETE: {
        "value": "-1",
        "name": "刪除",
    },
    
}


export {
    role_Enum,
    user_Enum,
    news_Enum,
};