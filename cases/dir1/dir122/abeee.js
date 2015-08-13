module.exports={


    "port":8080,
    "url":"http://114.215.86.246:8083/mobile/group/establishGroup.do",

    "JSON":{
        "id": "",
        "name": "第一个群",
        "targetId": "8",
        "joinMember": "1032,1033,1034",
        "userId": global.userid,
        "key": global.userkey
    },

    "exp":{}// {"message":"操作失败","status":"0"}

}
 
require("/Users/yu/workspace/features/whitelist/run.js")