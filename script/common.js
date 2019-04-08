/**
 * @name 测试模式开关
 *
 * @type {boolean}
 */
var TESTMODE = false

/**
 * @name 调试模式开关
 *
 * @type {boolean}
 */
var DEBUG = true

// 控制台输出
var consoledebug = (DEBUG) ? console : new nodebug()

// 定义 nodebug 方法
function nodebug() {
}

// 为 nodebug 原型添加 log 方法
nodebug.prototype.log = function (str) {
}
// 为 nodebug 原型添加 log 方法
nodebug.prototype.warn = function (str) {
}

/**
 * @name 定义常量
 *
 */
var TIP_STR = "信息提示"

var BASE_QINIU_URL = 'http://art.isart.me/'

/**
 * @name 封装 设置 stroage
 *
 * @author leek
 *
 * @param key       string      键
 * @param value     object      值
 */
function setStorage(key, value) {
    $api.setStorage(key, value)
}

/**
 * @name 封装 获取 stroage
 *
 * @author leek
 *
 * @param key   string      键
 */
function getStorage(key) {
    return $api.getStorage(key)
}

/**
 * @name 封装 移除 stroage
 *
 * @author leek
 *
 * @param key   string      键
 */
function removeStorage(key) {
    $api.rmStorage(key)
}

/**
 * @name 封装 清除 stroage
 *
 * @author leek
 */
function clearStorage() {
    $api.clearStorage()
}

/**
 * @name 封装 storage是否存在用户信息
 *
 * @author leek
 *
 * @return boolean
 */
function isHasUserInfo() {
    if (isObjectEmpty(getStorageUser())) {
        return false
    }

    return true
}

// 弹出一个自动关闭的提示框
function showToast(msg, location) {
    if (!location) {
        location = 'bottom'
    }

    api.toast({
        msg: msg,
        location: location
    })
}

/**
 * @name 封装 获取用户信息
 *
 * @author leek
 *
 * @return object   用户信息
 */
function getStorageUser() {
    //consoledebug.log('getStorageUser ret is : ' + JSON.stringify(getStorage('user_info')))
    return getStorage('user_info')
}

/**
 * @name 封装 对象中是否存在属性
 *
 * @author leek
 *
 * @return boolean
 */
function isObjectOwnProperty(object, property) {
    if (isObjectEmpty) {
        return false
    }

    if (object.hasOwnProperty(property)) {
        return true
    }

    return false
}

/**
 * @name 封装 对象是否为空
 *
 * @author leek
 *
 * @return boolean
 */
function isObjectEmpty(object) {
    if ($.isEmptyObject(object)) {
        return true
    }

    return false
}


/**
 * @name 正则验证
 *
 * @author leek
 *
 * @param type 验证类型
 * @param value 待验证值
 * @returns {boolean}
 */
function regular(type, value) {
    switch (type) {
        // 手机号码
        case 'phone_num':
            var reg = new RegExp("^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$")
            return reg.test(value) ? true : '请填写正确的手机号码格式'
            break
        // 身份证号码
        case 'id_card':
            var reg = new RegExp("^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$")
            return reg.test(value) ? true : '请填写正确的身份证号码格式'
            break
        // 日期
        case 'date':
            var reg = new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}$")
            return reg.test(value) ? true : '请填写正确的日期格式'
            break
        // 时间
        case 'time':
            var reg = new RegExp("^(20|21|22|23|[0-1]\\d):[0-5]d:[0-5]\\d$")
            return reg.test(value) ? true : '请填写正确的时间格式'
            break
        // 日期时间
        case 'date_time':
            var reg = new RegExp("^[1-9]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])s+(20|21|22|23|[0-1]\\d):[0-5]d:[0-5]\\d$")
            return reg.test(value) ? true : '请填写正确的日期及时间格式'
            break
        // 验证码
        case 'verify_code':
            var reg = new RegExp("^\\d{4}$")
            return reg.test(value) ? true : '请填写正确的验证码格式'
            break
        // 邮政编码
        case 'post_code':
            var reg = new RegExp("^[1-9][0-9]{5}$")
            return reg.test(value) ? true : '请填写正确的验证码格式'
            break
        // 弱密码
        case 'weak_password':
            var reg = new RegExp("^\\w{6,15}$")
            return reg.test(value) ? true : '密码长度在6~15之间，只能包含字母、数字和下划线'
            break
        // 强密码
        case 'strong_password':
            var reg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$")
            return reg.test(value) ? true : '密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间'
            break
        // 电子邮箱
        case 'e-mail':
            var reg = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")
            return reg.test(value) ? true : '请填写正确的Email地址格式'
            break
        default:
            return true
    }
}

// 全局等待验证码时间
var globalTimeForVerify = 60

/**
 * @name 一分钟后获取验证码
 *
 * @author leek
 */
function waitingForVerify() {
    if (globalTimeForVerify === 0) {
        $('#verify_btn').text('获取验证码').removeClass('disable')
        bindClickVerify()
        globalTimeForVerify = 60
    } else {
        $('#verify_btn').text('等待' + globalTimeForVerify + '秒').addClass('disable')
        globalTimeForVerify--
        setTimeout(function () {
            waitingForVerify()
        }, 1000)
    }
}

/**
 * @name 未获取验证码按钮进行点击事件绑定及取消点击事件绑定
 *
 * @author leek
 */
function bindClickVerify() {
    $('#verify_btn').on('click', function (event) {
        var _this = $(this)
        var phone_num = $('#phone_num').val().trim()

        if (regular('phone_num', phone_num) !== true) {
            dialog_evaluation(TIP_STR, '请填写正确的手机号码', [{text: '确认'}], function (ret, err) {
                closeDialogBox('evaluation')
            })
            return
        }

        var param = {
            phonenum: phone_num
        }

        sendVertifyCode(param, function (ret, err) {
            console.log('send vertify code ret is : ' + JSON.stringify(ret))
            if (ret.result) {
                toast(ret.ret)
                _this.off(event)
                waitingForVerify()
            } else {
                toast(JSON.stringify(err))
            }
        })
    })
}

function randomNum(n) {
    var random = "";
    for (var i = 0; i < n; i++) {
        random += Math.floor(Math.random() * 10);
    }
    return random;
}

//获取文件类型
function getFileType(path) {
    var path_array = path.split('.')
    var type = path_array[path_array.length - 1]

    return type
}

function getFileName(path) {
    var path_array = path.split('/')
    var name = path_array[path_array.length - 1]

    return name
}

function setFileName() {
    var name = '' + moment().year() + (moment().month() + 1) + moment().date() + moment().hour() + moment().minute() + moment().second() + moment().millisecond() + randomNum(6)

    return name
}

function getRealQiniuUrl(key) {
    return BASE_QINIU_URL + key
}

function qiniuUrlTool(img_url, type) {

    if (!img_url) {
        return ''
    }

    //如果不是七牛的头像，则直接返回图片
    //consoledebug.log("img_url:" + img_url + " indexOf('isart.me'):" + img_url.indexOf('isart.me'));
    if (img_url.indexOf('7xku37.com') < 0 && img_url.indexOf('isart.me') < 0) {
        return img_url;
    }
    //七牛链接
    var qn_img_url
    const size_w_500_h_200 = '?imageView2/1/w/500/h/200/interlace/1/q/75'
    const size_w_200_h_200 = '?imageView2/1/w/200/h/200/interlace/1/q/75'
    const size_w_500_h_300 = '?imageView2/1/w/500/h/300/interlace/1/q/75'
    const size_w_300_h_300 = '?imageView2/1/w/300/h/300/interlace/1/q/75'
    const size_w_500_h_250 = '?imageView2/1/w/500/h/250/interlace/1/q/75'
    const size_w_460_h_460 = '?imageView2/1/w/460/h/460/interlace/1/q/75'
    const size_w_600_h_600 = '?imageView2/1/w/600/h/600/interlace/1/q/75'
    const size_w_600_h_300 = '?imageView2/1/w/600/h/300/interlace/1/q/75'
    const size_w_500 = '?imageView1/1/w/500/interlace/1/q/75'
    const size_w_350_h_200 = '?imageView2/1/w/350/h/200/interlace/1/q/100'
    const size_w_75_h_75 = '?imageView2/1/w/75/h/75/interlace/1/q/100'

    if (img_url.indexOf("?") >= 0) {
        img_url = img_url.split('?')[0]
    }

    switch (type) {
        case  'ad':
            qn_img_url = img_url + size_w_600_h_300
            break
        case  'goods':
            qn_img_url = img_url + size_w_500_h_300
            break
        case  'rect':
            qn_img_url = img_url + size_w_300_h_300
            break
        case  'avatar':
            qn_img_url = img_url + size_w_200_h_200
            break
        case  'list':      //头像信息
            qn_img_url = img_url + size_w_200_h_200
            break;
        default:
            qn_img_url = img_url
            break
    }
    return qn_img_url
}

function getSum(array) {
    var arr = array
    var sum = arr.reduce(function (prev, curr, idx, arr) {
        return prev + curr
    })
    return sum
}


// 弹出一个确认框
function showAlert(title, msg) {
    api.alert({
        title: title,
        msg: msg,
    }, function (ret, err) {

    })
}


// 设置frame是否隐藏
function setFrameAttrHidden(frameName, value) {
    api.setFrameAttr({
        name: frameName,
        hidden: value
    });
}

// 判断参数是否为空
function judgeIsAnyNullStr() {
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (!isArray(arguments[i])) {
                if (arguments[i] == null || arguments[i] == "" || arguments[i] == undefined || arguments[i] == "未设置" || arguments[i] == "undefined") {
                    return true
                }
            }
        }
    }
    return false
}

/*
 * 改进版判断参数为空的方法
 *
 * 提示信息
 *
 */

function judgeIsAnyNullStrImp(obj) {
    if (obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var value = obj[i].value;
            var name = obj[i].name;
            if (!isArray(value)) {
                if (value == null || value == "" || value == undefined || value == "未设置") {
                    showToast(name + "不能为空");
                    return true;
                }

            }
        }
    }
    return false;
}


// 判断数组时候为空, 服务于 judgeIsAnyNullStr 方法
function isArray(object) {
    return Object.prototype.toString.call(object) == '[object Array]';
}

//设置值
function setDefaultValue(val, default_val, more_val) {
    if (judgeIsAnyNullStr(val)) {
        return default_val;
    } else {
        if (judgeIsAnyNullStr(more_val)) {
            return val;
        } else {
            return val + more_val;
        }
    }
}


//获取头像，如果未设置头像则返回
/*
 * hi：为图片的url地址
 * dir：为页面相对于html所在的位置
 */
function getHeadIcon(dir, hi) {
    // console.log(hi);
    if (judgeIsAnyNullStr(hi) || hi.length < 15) {
        return dir + "image/default_headicon.png";
    }
    return qiniuUrlTool(hi, "avatar");
}


//获取上传图标，如果未设置头像则返回
/*
 * hi：为图片的url地址
 * dir：为页面相对于html所在的位置
 */
function getRectImg(dir, hi) {
    // console.log(hi);
    if (judgeIsAnyNullStr(hi) || hi.length < 15) {
        return dir + "image/add_pic.png";
    }
    return qiniuUrlTool(hi, "avatar");
}

//获取值，如果为空则设置默认值

/*
 * 用于对象克隆
 *
 * obj 对象，返回克隆对象
 *
 */
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


//打开相机or相册
/*
 *
 * 打开相册或拍照
 *
 * @param {string}      type                类型      取值： image: 相册、 camera: 相机
 * @param {function}    successCallback     成功回调
 * @param {function}    errorCallback       失败回调
 */
function openPhotoOrAlbum(type, callBackFun, dom_id) {
    api.getPicture({
        sourceType: type,
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: false,
        quality: 50,
        targetWidth: 1200,
        saveToPhotoAlbum: false
    }, function (ret, err) {
        if (ret) {
            if (jQuery.isEmptyObject(ret.data) || ret.data == null || ret.data == "") {

            } else {
                callBackFun(ret, err, dom_id);
            }
        } else {
        }
    });
}


function openPhotoOrAlbumbase(type, callBackFun, dom_id) {
    api.getPicture({
        sourceType: type,
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: false,
        quality: 50,
        targetWidth: 1200,
        saveToPhotoAlbum: false
    }, function (ret, err) {
        if (ret) {
            if (jQuery.isEmptyObject(ret.data) || ret.data == null || ret.data == "") {

            } else {
                callBackFun(ret, err, dom_id);
            }
        } else {
        }
    });
}


//获取上传七牛的文件名
function getQiniuKey() {
    var date = new Date();
    var generate_key = "";
    generate_key = date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + ""
        + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + "" + date.getMilliseconds() + ""
        + getRandomNum(6);
    return generate_key;
}

//获取mutils位的随机数
function getRandomNum(mutils) {
    var rand = "";
    for (var i = 0; i < mutils; i++) {
        var a = parseInt(10 * Math.random());
        rand += a + "";
    }
    return rand;
}

//获取图片真实地址
function getImgRealUrl(url) {
    return "http://art.isart.me/" + url;
}

// 关闭窗口
function clickBack(winName) {
    api.closeWin(winName)
}

// 关闭当前窗口并进入某个窗口
function closeToWin(win_name) {
    api.closeToWin({
        name: win_name
    })
}

// 关闭frame
function closeFrame(name) {
    api.closeFrame({
        name: name
    })
}


//拨打电话
function call(phonenum) {
    api.call({
        type: 'tel_prompt',
        number: phonenum
    });
}

//获取未获取到数据的提示
function getNodataTipHtml(dir, tip) {
    var noData_tip_html;
    if (judgeIsAnyNullStr(tip)) {
        tip = "暂无数据";
    }

    if (judgeIsAnyNullStr(dir)) {
        noData_tip_html = "<div style='padding-top:85px;padding-bottom: 85px;'>" +
            "<div class='aui-flex-col aui-flex-center'>" +
            "<img src='../../image/no_data.png' style='width: 120px;height: 80px;'/>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            tip +
            "</div>" +
            "</div>";
    } else {
        noData_tip_html = "<div style='padding-top:85px;padding-bottom: 85px;'>" +
            "<div class='aui-flex-col aui-flex-center  margin-bottom-15'>" +
            "<img src='" + dir + "/image/no_data.png' style='width: 120px;height: 80px;'/>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            tip +
            "</div>" +
            "</div>";
    }
    return noData_tip_html;
}


//获取未获取到数据的提示
function getNodataTipHtmlone(dir, tip) {
    var noData_tip_html;
    if (judgeIsAnyNullStr(tip)) {
        tip = "暂无数据";
    }

    if (judgeIsAnyNullStr(dir)) {
        noData_tip_html = "<div style='padding-top:85px;padding-bottom: 85px;'>" +
            "<div class='aui-flex-col aui-flex-center'>" +
            "<img src='../image/kefu_logo.png' style='width: 120px;height: 80px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            tip +
            "</div>" +
            "</div>";
    } else {
        noData_tip_html = "<div style='padding-top:85px;padding-bottom: 85px;'>" +
            "<div class='aui-flex-col aui-flex-center  margin-bottom-15'>" +
            "<img src='../../../image/nodata.png' height='120' width='80'/>" +
            "</img>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            tip +
            "</div>" +
            "</div>";
    }
    return noData_tip_html;
}


/*
 * 将数据库格式日期转换为显示日期
 *
 * 2017-10-30 09:21:22 转为为 2017年10月30日 09:21
 *
 *
 */
function convertDateToChi(date_str) {
    var ys_arr = date_str.split(" ");
    return convertDateFormate(ys_arr[0], 2) + " " + ys_arr[1].substring(0, 5);
}

/*
 * 获取小时和分钟
 *
 * 2017-10-30 09:21:22 09:21
 *
 *
 */
function convertDateToHourMinute(date_str) {
    var ys_arr = date_str.split(" ");
    return ys_arr[1].substring(0, 5);
}

/*
 * 根据f_table获取相关值
 *
 */
function getStrByFTable(f_table) {
    switch (f_table) {
        case "repair":
            return "维修";
        case "logistics":
            return "物流";
        case "order":
            return "订单";
        case "enterprise":
            return "企业认证";
        case "shEquipment":
            return "二手设备审核";
        case "system":
            return "系统消息";
        case "feedback":
            return "意见反馈";
        default :
            return "未知";
    }
}


// 时间格式转换
function convertDateToChinese(date_str) {
    if (judgeIsAnyNullStr(date_str)) {
        return "";
    }
    var year = date_str.substr(0, 4);
    var month = date_str.substr(5, 2);
    var day = date_str.substr(8, 2);
    return year + "年" + month + "月" + day + "日";
}

//时间戳 转换年月日小时
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}