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
        "name": "已停用",
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


//聯絡我們
var contactUs_Enum = {
    UNREPLY: {
        "value": "0",
        "name": "尚未回覆",
    },

    REPLY: {
        "value": "1",
        "name": "已回覆",
    },


    NOTREPLY: {
        "value": "2",
        "name": "無須回覆",
    },

}


var location_Area_Enum = {
    TAIPEI: {
        "value": "1",
        "name": "北部",
    },

    TAICHUNG: {
        "value": "2",
        "name": "中部",
    },


    TAINAN: {
        "value": "3",
        "name": "南部",
    },
}


var product_Category_Status_Enum = {
    STOP: {
        "value": "0",
        "name": "已停用",
    },

    NORMAL: {
        "value": "1",
        "name": "啟用",
    },
}


export {
    role_Enum,
    user_Enum,
    news_Enum,
    contactUs_Enum,
    location_Area_Enum,
    product_Category_Status_Enum,
};