/**
 * @name 用于管理全部后台的接口访问
 *
 * @author TerrQi，leek
 *
 * @date 2017-09-22
 */
var TESTMODE=false
var SERVER_URL = TESTMODE ? "http://lljiankang.top/api/" : "http://de.lljiankang.top/api/"

/**
 * @name 错误码表
 *
 * @author leek
 */

var NET_ERROR = 999

// 全局等待loading时间
var globalTimeForLoading = 0

//显示加载中的Progress
function showProgress(msg) {
    if (judgeIsAnyNullStr(msg)) {
        msg = "加载中";
    }
    api.showProgress({
        title: msg,
        modal: true
    });
}

/**
 * @name loading超时自动隐藏
 *
 * @author leek
 *
 * @param times 超时时间(秒) 默认10秒
 */
function waitingForProgress(times) {
    if (globalTimeForLoading) {
        clearTimeout(globalTimeForLoading)
        globalTimeForLoading = 0
    }

    showProgress()

    if (!times) {
        var times = 10000
    }

    globalTimeForLoading = setTimeout(function () {
        if (globalTimeForLoading) {
            hideProgress()
            toast('网络超时，请稍后重试')
            globalTimeForLoading = 0
        }
    }, times)
}

/**
 * @name 隐藏loading
 *
 * @author leek
 */
function clearWaitingForProgress() {
    if (globalTimeForLoading) {
        clearTimeout(globalTimeForLoading)
        globalTimeForLoading = 0
    }
    hideProgress()
}


/**
 *
 * @param param 请求参数
 * @param url 接口地址
 * @param method 请求方式
 * @param callBack 回调函数
 * @param loadding_flag 是否显示loading
 * @constructor
 */
function Ajax(param, url, method, callBack, loading_flag) {
    if (loading_flag) {
        waitingForProgress()
    }
    if (!isHasUserInfo()) {
        console.log('Ajax has not user info')
    } else {
        console.log('Ajax has user info')

        // if (!isObjectOwnProperty(getStorageUser(), 'id')) {
        //     var user = getStorageUser()
        //
        //     //判断是否传了user_id 如果传了使用传入值
        //     if(!judgeIsAnyNullStr(param)){
        //         if (judgeIsAnyNullStr(param.user_id)) {
        //             param.user_id = user.id
        //         }else {
        //             param.user_id = param.user_id
        //         }
        //         param.token = user.token
        //
        //     }else {
        //         param.user_id = param.user_id
        //         param.token = user.token
        //     }
        //
        //
        // }
    }
    // consoledebug.log('ajax param is : ' + JSON.stringify("param:" + JSON.stringify(param) + " url:" + url + " method:" + method))

    api.ajax({
        url: url,
        method: method,
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        data: {
            body: param
        }
    }, function (ret, err) {
        // consoledebug.log('Ajax ret is : ' + JSON.stringify(ret))
        if(ret.code == 102){
            api.openWin({
                name: 'login',
                url:'widget://./html/login/login.html',
                allowEdit: true,
                animation: {
                    type: 'movein',
                    duration: 0
                },
                pageParam: {
                    data: {}
                },
                slidBackEnabled: false
            })
            return;
        }

        clearWaitingForProgress();
        if (err) {
            consoledebug.log('Ajax err is : ' + JSON.stringify(err))
            toast(JSON.stringify(err))
            return;
        }

        callBack(ret, err)
    })
}

// 登陆
function test(param, callBack) {
    Ajax(param, SERVER_URL + 'doctor/article/articleList', 'get', callBack, true)
}
