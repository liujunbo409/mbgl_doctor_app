/**
 * @name 封装改进版修复头部重叠
 *
 * @author leek
 *
 * @param header_id      header DOM ID
 * @returns {{l, t, w, h}|*|{top, left}}
 * @private
 *
 */
function _fixStatusBar(header_id) {
    var header = $api.byId(header_id)
    $api.fixStatusBar(header)
    var header_pos = $api.offset(header)
    api.setStatusBarStyle({
        style: 'light',
        color: 'rgba(180, 60, 60, .1)'
    })
    return header_pos
}

/**
 * @name 封装改进版修复iphoneX底部重叠
 *
 * @author leek
 *
 * @param header_id      header DOM ID
 * @returns {{l, t, w, h}|*|{top, left}}
 * @private
 *
 */
function _fixTabBar(footer_id) {
    var deviceModel = api.deviceModel
    var footer = $api.byId(footer_id)
    if (deviceModel === 'iPhone X') {
        $api.fixTabBar(footer)
    }
    var footer_pos = $api.offset(footer)
    return footer_pos
}

/**
 * @name 封装打开窗口
 *
 * @param {string}  win_name          win名称
 * @param {string}  win_url           win地址
 * @param {object}  data              参数
 * @param {int}     type_id           取值范围：0 none;1 push;2 movein;
 */
function openWin(win_name, win_url, data, type_id, is_payment) {
    var animationtype = ["none", "push", "movein"]

    if (type_id === 0) {
        api.openWin({
            name: win_name,
            url: win_url + win_name + '.html',
            allowEdit: true,
            animation: {
                type: animationtype[type_id],
                duration: 0
            },
            pageParam: {
                data: data
            }
        })
    } else {
        if (is_payment) {
            api.openWin({
                name: win_name,
                url: win_url,
                allowEdit: true,
                animation: {
                    type: animationtype[type_id],
                    subType: "from_bottom",
                    duration: 300
                },
                pageParam: {
                    data: data
                },
                delay: 100
            })
        } else {
            api.openWin({
                name: win_name,
                url: win_url + win_name + '.html',
                allowEdit: true,
                animation: {
                    type: animationtype[type_id],
                    duration: 300
                },
                pageParam: {
                    data: data
                },
                delay: 100
            })
        }

    }
}

/**
 * @name 打开一个不能返回的窗口
 *
 * @param {string}      win_name        win名称
 * @param {string}      win_url         win地址
 * @param {object}      data            参数
 * @param {int}         type_id         取值范围 0: none; 1: push; 2: movein;
 */
function openWinNotSlidBack(win_name, win_url, data, type_id) {
    var animationtype = ["none", "push", "movein"]
    if (type_id === 0) {
        api.openWin({
            name: win_name,
            url: win_url + win_name + '.html',
            allowEdit: true,
            animation: {
                type: animationtype[type_id],
                duration: 0
            },
            pageParam: {
                data: data
            },
            slidBackEnabled: false
        })
    } else {
        api.openWin({
            name: win_name,
            url: win_url + win_name + '.html',
            allowEdit: true,
            animation: {
                type: animationtype[type_id],
                duration: 200
            },
            pageParam: {
                data: data
            },
            delay: 100,
            slidBackEnabled: false
        })
    }
}

/**
 * @name 封装重新打开窗口
 *
 * @param {string}      win_name        win名称
 * @param {string}      win_url         win地址
 * @param {object}      data            参数
 * @param {int}         type_id         取值范围 0: none; 1: push; 2: movein;
 */
function reopenWin(win_name, win_url, data, type_id) {
    var animationtype = ["none", "push", "movein"]

    if (type_id === 0) {
        api.openWin({
            name: win_name,
            url: win_url + win_name + '.html',
            allowEdit: true,
            reload: true,
            delay: 300,
            animation: {
                type: animationtype[type_id],
                duration: 0
            },
            pageParam: {
                data: data
            }
        })
    } else {
        api.openWin({
            name: win_name,
            url: win_url + win_name + '.html',
            allowEdit: true,
            reload: true,
            delay: 300,
            animation: {
                type: animationtype[type_id],
                duration: 200
            },
            pageParam: {
                data: data
            }
        })
    }
}

/**
 * @name 封装打开frame
 *
 * @param {string}      frame_name      frame名称
 * @param {string}      frame_url       frame地址
 * @param {bool}        is_bounce       bounces页面是否弹动
 * @param {object}      data            参数
 * @param {int}         frameType       取值范围 0: 无footer; 1: 有footer; 2: 均有; 3: 均无; 4: 一半
 */
function openFrame(frame_name, frame_url, is_bounce, data, frameType) {
    var head_h, foot_h

    if (frameType === 0) {
        var header = $api.byId('header')
        _fixStatusBar('header')
        var header_pos = $api.offset(header)
        head_h = header_pos.h
        foot_h = 0
    } else if (frameType === 1) {
        head_h = 0
        var footer = $api.byId('footer')
        _fixTabBar('footer')
        var footer_pos = $api.offset(footer)
        foot_h = footer_pos.h
    } else if (frameType === 2) {
        var header = $api.byId('header')
        _fixStatusBar('header')
        var header_pos = $api.offset(header)
        var footer = $api.byId('footer')
        _fixTabBar('footer')
        var footer_pos = $api.offset(footer)
        head_h = header_pos.h
        foot_h = footer_pos.h
    } else {
        head_h = 0
        foot_h = 0
    }

    api.openFrame({
        name: frame_name,
        url: frame_url + frame_name + '.html',
        allowEdit: true,
        bounces: is_bounce,
        pageParam: {data: data},
        vScrollBarEnabled: false,
        rect: {x: 0, y: head_h, w: 'auto', h: api.winHeight - head_h - foot_h - 2}
    })
}
/**
 * @name 封装打开frame
 *
 * @param {string}      frame_name      frame名称
 * @param {string}      frame_url       frame地址
 * @param {bool}        is_bounce       bounces页面是否弹动
 * @param {object}      data            参数
 * @param {int}         frameType       取值范围 0: 无footer; 1: 有footer; 2: 均有; 3: 均无; 4: 一半
 * @param {int}         animation_type  动画类型: 取值范围 1-10 (不传无动画，传了此值必须传sub_type)
 * @param {int}         sub_type  动画类型: 取值范围 0-3
 */
function openFrame_frm(frame_name, frame_url, is_bounce, data, frameType, animation_type, sub_type) {
    consoledebug.log("openFrame_frm" + animation_type + "-" + sub_type);
    var animation_type_array = ['none', 'push', 'movein', 'fade', 'flip', 'reveal', 'ripple', 'curl', 'un_curl', 'suck', 'cube']
    // none            //无动画效果
    // push            //新视图将旧视图推开
    // movein            //新视图移到旧视图上面
    // fade            //交叉淡化过渡（不支持过渡方向）
    // flip            //翻转效果
    // reveal            //将旧视图移开,显示下面的新视图
    // ripple            //滴水效果（不支持过渡方向）
    // curl            //向上翻一页
    // un_curl            //向下翻一页
    // suck            //收缩效果（不支持过渡方向）
    // cube            //立方体翻滚效果
    var sub_type_array = ['from_right', 'from_left', 'from_top', 'from_bottom']
    // from_right        //从右边开始动画
    // from_left        //从左边开始动画
    // from_top        //从顶部开始动画
    // from_bottom        //从底部开始动画
    var head_h, foot_h

    if (frameType === 0) {
        var header = $api.byId('header')
        _fixStatusBar('header')
        var header_pos = $api.offset(header)
        head_h = header_pos.h
        foot_h = 0
    } else if (frameType === 1) {
        head_h = 0
        var footer = $api.byId('footer')
        _fixTabBar('footer')
        var footer_pos = $api.offset(footer)
        foot_h = footer_pos.h
    } else if (frameType === 2) {
        var header = $api.byId('header')
        _fixStatusBar('header')
        var header_pos = $api.offset(header)
        var footer = $api.byId('footer')
        _fixTabBar('footer')
        var footer_pos = $api.offset(footer)
        head_h = header_pos.h
        foot_h = footer_pos.h
    } else {
        head_h = 0
        foot_h = 0
    }

    if (!animation_type) {
        api.openFrame({
            name: frame_name,
            url: frame_url + frame_name + '.html',
            allowEdit: true,
            bounces: is_bounce,
            pageParam: {data: data},
            vScrollBarEnabled: false,
            rect: {x: 0, y: head_h, w: 'auto', h: api.winHeight - head_h - foot_h - 2},
        })
    } else {
        api.openFrame({
            name: frame_name,
            url: frame_url + frame_name + '.html',
            allowEdit: true,
            bounces: is_bounce,
            pageParam: {data: data},
            vScrollBarEnabled: false,
            rect: {x: 0, y: 0, w: 'auto', h: api.winHeight},
            animation: {
                type: animation_type_array[animation_type],                //动画类型（详见动画类型常量）
                subType: sub_type_array[sub_type],       //动画子类型（详见动画子类型常量）
                duration: 300                //动画过渡时间，默认300毫秒
            }
        })
    }
}
/*
 *
 * @name 封装打开不能获取到 header 或 footer 的frame
 *
 * @auth leek
 *
 * @param {string}      frame_name          frame名称
 * @param {string}      frame_url           frame地址
 * @param {int}         header_h            header的高度
 * @param {int}         footer_h            footer的高度
 * @param {object}        item                参数
 * @param {bool}        is_bounce           bounces页面是否弹动
 */
function openFrameWithHeaderFooter(frame_name, frame_url, header_h, footer_h, item, is_bounce) {
    var body_h = api.winHeight

    api.openFrame({
        name: frame_name,
        url: frame_url + frame_name + '.html',
        rect: {
            x: 0,
            y: header_h,
            w: 'auto',
            h: body_h - header_h - footer_h
        },
        pageParam: {item: item},
        bounces: is_bounce,
        vScrollBarEnabled: true,
        hScrollBarEnabled: false,

        reload:true,
        delay: 200
    })
}

/**
 * @name 封装获取页面传参
 *
 * @return {Object}
 */
function getPageParam() {
    return api.pageParam.data
}

/**
 * @name 封装广播自定义事件
 *
 * @param name
 * @param value
 */
function sendEvent(name, value) {
    api.sendEvent({
        name: name,
        extra: value
    })
}

/**
 * @name 封装监听事件
 *
 * @param name
 * @param callback
 */
function addEventListener(name, callback) {
    api.addEventListener({
        name: name
    }, function (ret, err) {
        callback(ret, err)
    })
}

/**
 * @name 封装移除监听事件
 *
 * @param name
 */
// function removeEventListener (name) {
//     api.removeEventListener({
//         name: name
//     })
// }

/**
 * @name 封装关闭当前 window
 *
 * @param window_name   window名字
 */
function closeWin(window_name) {
    api.closeWin(window_name)
}

/**
 * @name 封装关闭当前 window 并进入 window
 *
 * @param window_name
 */
function closeToWin(window_name) {
    api.closeToWin({
        name: window_name
    })
}

/**
 * @name 封装关闭 frame
 *
 * @param frame_name    frame名字
 */
function closeFrame(frame_name) {
    api.closeFrame({
        name: frame_name
    })
}

/**
 * @name 封装调用 dialogBox 模块
 *
 * @author leek
 *
 * @returns {*}
 */
function dialog() {
    var dialogBox = api.require('dialogBox')
    return dialogBox
}

/**
 * @name 封装关闭 dialogBox 模块
 *
 * @author leek
 *
 * @param name dialogBox名称
 */
function closeDialogBox(name) {
    var dialogBox = dialog()
    dialogBox.close({
        dialogName: name
    })
}

/**
 * @name 封装 dialogBox alert 模块
 *
 * @author leek
 *
 * @param title             string      标题文字
 * @param content           string      内容文字
 * @param left_btn_title    string      左侧按钮文字
 * @param right_btn_title   string      右侧按钮文字
 * @param callback          function    回调函数
 */
function dialog_alert(title, content, left_btn_title, right_btn_title, callback) {
    var dialogBox = dialog()

    if (title) {
        dialogBox.alert({
            texts: {
                title: title,
                content: content,
                leftBtnTitle: left_btn_title,
                rightBtnTitle: right_btn_title
            },
            styles: {
                bg: '#fff',
                corner: 6,
                w: 280,
                title: {
                    marginT: 20,
                    titleSize: 18,
                    titleColor: '#000'
                },
                content: {
                    color: '#000',
                    size: 18
                },
                left: {
                    marginB: 15,
                    marginL: 30,
                    w: 100,
                    h: 40,
                    corner: 2,
                    color: "#000",
                    bg: '#fff',
                    size: 16
                },
                right: {
                    marginB: 15,
                    marginL: 20,
                    w: 100,
                    h: 40,
                    corner: 2,
                    color: "#000",
                    bg: '#fff',
                    size: 16
                }
            },
            tapClose: false
        }, function (ret) {
            callback(ret)
        })
    } else {
        dialogBox.alert({
            texts: {
                content: content,
                leftBtnTitle: left_btn_title,
                rightBtnTitle: right_btn_title
            },
            styles: {
                bg: '#fff',
                corner: 6,
                w: 280,
                content: {
                    color: '#000',
                    size: 18
                },
                left: {
                    marginB: 15,
                    marginL: 30,
                    w: 100,
                    h: 40,
                    corner: 2,
                    color: "#000",
                    bg: '#fff',
                    size: 16
                },
                right: {
                    marginB: 15,
                    marginL: 20,
                    w: 100,
                    h: 40,
                    corner: 2,
                    color: "#000",
                    bg: '#fff',
                    size: 16
                }
            },
            tapClose: false
        }, function (ret) {
            callback(ret)
        })
    }
}

/**
 * @name 封装 dialogBox evaluation 模块
 *
 * @author leek
 *
 * @param title         string      标题文字
 * @param content       string      内容文字
 * @param buttons       array       按钮组         [{text: '下次再说'},{text: '下次再说'}]
 * @param callback      function    回调函数
 */
function dialog_evaluation(title, content, buttons, callback) {
    var dialogBox = dialog()

    dialogBox.evaluation({
        styles: {
            bg: '#fff',
            w: 300,
            title: {
                marginT: 20,
                size: 14,
                color: '#000',
                bold: true
            },
            content: {
                marginT: 20,
                color: '#111',
                size: 16
            },
            buttons: [{
                marginB: 0,
                marginL: 0,
                w: 300,
                h: 35,
                bg: '#fff',
                color: '#007FFF',
                size: 14
            }]
        },
        texts: {
            title: title,
            content: content,
            buttons: buttons
        },
        tapClose: false
    }, function (ret, err) {
        callback(ret, err)
    })
}

/**
 * @name 显示进度提示框
 *
 * @param title             标题
 * @param modal             是否模态，模态时整个页面将不可交互
 * @param animationType     进度提示框动画类型                   取值范围：fade 渐隐渐现, zoom 缩放
 * @param text              内容
 */
function showProgress(title, modal, animationType, text) {
    if (!title) {
        title = "努力加载中..."
    }

    if (!modal) {
        modal = true
    }

    if (!animationType) {
        animationType = 'fade'
    }

    var param

    if (!text) {
        param = {
            title: title,
            modal: modal
        }
    } else {
        param = {
            title: title,
            text: text,
            modal: modal
        }
    }

    param.animationType = animationType

    api.showProgress(param)
}

function hideProgress() {
    api.hideProgress()
}

/**
 * @name  弹出一个定时自动关闭的提示框
 *
 * @param msg           提示信息文字
 * @param duration      自动小时时间（ms）
 * @param location      出现位置            取值范围：top, middle, bottom
 */
function toast(msg, duration, location) {
    if (!duration) {
        duration = 2000
    }

    if (!location) {
        location = 'bottom'
    }

    api.toast({
        msg: msg,
        duration: duration,
        location: location
    })
}

/**
 * @name 封装打开 actionSheet
 *
 * @param title
 * @param buttons
 * @param callback
 * @param cancelTitle
 * @param destructiveTitle
 */
function actionSheet(title, buttons, callback, cancelTitle, destructiveTitle) {
    var param = {
        title: title,
        buttons: buttons
    }

    if (!cancelTitle) {
        param.cancelTitle = '取消'
    } else {
        param.cancelTitle = cancelTitle
    }

    if (cancelTitle) {
        param.destructiveTitle = destructiveTitle
    }

    api.actionSheet(param, function (ret, err) {
        callback(ret, err)
    })
}

/**
 * @name 打开frame组
 *
 * @auth leek
 *
 * @param name
 * @param rect
 * @param frames
 * @param callback
 */
function openFrameGroup(name, rect, frames, callback) {
    api.openFrameGroup({
        name: name,
        rect: rect,
        frames: frames
    }, function (ret, err) {
        callback(ret, err)
    })
}

/**
 * @name 预览文件
 *
 * @auth leek
 *
 * @param file_url
 */
function preview(file_url) {
    consoledebug.log('file url is : ' + JSON.stringify(file_url))

    is_file_exist(file_url, function (ret, err) {
        consoledebug.log('is_exist ret is : ' + JSON.stringify(ret))
        consoledebug.log('is_exist err is : ' + JSON.stringify(err))

        if (ret.is_exist) {
            ret.type = ret.type.toLowerCase()

            if (ret.type === 'jpg' || ret.type === 'jpeg' || ret.type === 'png' || ret.type === 'gif') {
                openPhotoBrowser([ret.path], function (ret, err) {
                    if (ret.eventType === 'click') {
                        closePhotoBrowser()
                    }
                })
            } else {
                openDoc(ret.path, function (ret, err) {

                })
            }
        } else {
            downloadFile(ret.url, function (ret, err) {
                if (ret) {
                    ret.type = ret.type.toLowerCase()

                    if (ret.type === 'jpg' || ret.type === 'jpeg' || ret.type === 'png' || ret.type === 'gif') {
                        openPhotoBrowser([ret.savePath], function (ret, err) {
                            if (ret.eventType === 'click') {
                                closePhotoBrowser()
                            }
                        })
                    } else {
                        openDoc(ret.savePath, function (ret, err) {

                        })
                    }
                } else {

                }
            })
        }
    })
}

/**
 * @name 验证文件是否存在
 *
 * @auth leek
 *
 * @param url
 * @param callback
 */
function is_file_exist(url, callback) {
    consoledebug.log('url is : ' + JSON.stringify(url))
    var path_array = url.split('/')
    consoledebug.log('path_array is : ' + JSON.stringify(path_array))
    var file = path_array[path_array.length - 1]
    consoledebug.log('file is : ' + JSON.stringify(file))
    var file_array = file.split('.')
    consoledebug.log('file_array is : ' + JSON.stringify(file_array))
    var type = file_array[file_array.length - 1]
    consoledebug.log('type is : ' + JSON.stringify(type))
    var name_array = file_array.pop()
    consoledebug.log('name_array is : ' + JSON.stringify(name_array))
    var name = file_array.join('.')
    consoledebug.log('name is : ' + JSON.stringify(name))

    var fs = api.require('fs')

    fs.exist({
        path: "fs://file/" + name + '.' + type
    }, function (ret, err) {
        if (ret) {

            if (ret.exist) {
                var param = {
                    is_exist: true,
                    path: "fs://file/" + name + '.' + type,
                    type: type
                }

            } else {
                var param = {
                    is_exist: false,
                    url: url
                }
            }
            callback(param)
        } else {
            callback(err)
        }
    })
}

/**
 * @name 下载文件
 *
 * @auth leek
 *
 * @param url
 * @param callback
 */
function downloadFile(url, callback) {
    consoledebug.log('download url is : ' + JSON.stringify(url))

    var path_array = url.split('/')
    var file = path_array[path_array.length - 1]
    var file_array = file.split('.')
    var type = file_array[file_array.length - 1]

    api.download({
        url: url,
        savePath: 'fs://file/' + file,
        report: true,
        cache: true,
        allowResume: true
    }, function (ret, err) {
        if (ret) {
            consoledebug.log('download ret is : ' + JSON.stringify(ret))
            if (ret.state === 0) {
                showProgress('正在下载', true, 'fade', ret.percent + ' %')
            }

            if (ret.state === 1) {
                toast('下载完成')

                hideProgress()

                var param = {
                    savePath: 'fs://file/' + file,
                    type: type
                }

                callback(param)
            }

            if (ret.state === 2) {
                hideProgress()

                toast('下载失败')
            }
        } else {
            consoledebug.log('download err is : ' + JSON.stringify(err))
            callback(err)
        }
    })
}

/**
 * @name 打开照片浏览器
 *
 * @auth leek
 *
 * @param images
 * @param callback
 */
function openPhotoBrowser(images, callback) {
    var photoBrowser = api.require('photoBrowser');
    photoBrowser.open({
        images: images,
        placeholderImg: 'widget://res/img/apicloud.png',
        bgColor: '#000',
        zoomEnabled: true
    }, function (ret, err) {
        if (ret) {
            consoledebug.log('openPhotoBrowser ret is : ' + JSON.stringify(ret))
            callback(ret)
        } else {
            consoledebug.log('openPhotoBrowser err is : ' + JSON.stringify(err))
            callback(err)
        }
    })
}

/**
 * @name 关闭照片浏览器
 *
 * @auth leek
 */
function closePhotoBrowser() {
    var photoBrowser = api.require('photoBrowser')
    photoBrowser.close()
}

/**
 * @name 使用第三方app打开文件
 *
 * @auth leek
 *
 * @param path
 * @param callback
 */
function openDoc(path, callback) {
    var path_array = path.split('/')
    var file = path_array[path_array.length - 1]
    var file_array = file.split('.')
    var type = file_array[file_array.length - 1].toLowerCase()

    var docInteraction = api.require('docInteraction')
    docInteraction.open({
        path: path
    }, function (ret, err) {
        if (ret) {
            if (ret.status) {
                consoledebug.log('openDoc ret is : ' + JSON.stringify(ret))
                callback(ret)
            } else {
                consoledebug.log('openDoc err is : ' + JSON.stringify(ret))

                switch (type) {
                    case 'xls':
                        toast('没有能打开此文件的软件，请下载microsoft excel或wps office')
                        break
                    case 'xlsx':
                        toast('没有能打开此文件的软件，请下载microsoft excel或wps office')
                        break
                    case 'doc':
                        toast('没有能打开此文件的软件，请下载microsoft word或wps office')
                        break
                    case 'docx':
                        toast('没有能打开此文件的软件，请下载microsoft excel或wps office')
                        break
                    default:
                        toast('没有能打开此文件的软件')
                        break
                }

            }
        } else {
            consoledebug.log('openDoc err is : ' + JSON.stringify(err))
            callback(err)
        }
    })
}

/**
 * @name 打开多级联动picker
 *
 * @auth leek
 *
 * @param type
 * @param actives
 * @param callback
 */
function openUIActionSelector(type, actives, callback) {
    var data = ''

    switch (type) {
        case 'position':
            data = 'widget://res/position.json'
            break
        default:
            break
    }

    var UIActionSelector = api.require('UIActionSelector')
    UIActionSelector.open({
        datas: data,
        layout: {
            row: 5,
            col: 3,
            height: 30,
            size: 12,
            sizeActive: 14,
            rowSpacing: 5,
            colSpacing: 10,
            maskBg: 'rgba(0,0,0,0.2)',
            bg: '#fff',
            color: '#888',
            colorActive: '#f00',
            colorSelected: '#f00'
        },
        animation: true,
        cancel: {
            text: '取消',
            size: 12,
            w: 90,
            h: 35,
            bg: '#fff',
            bgActive: '#ccc',
            color: '#888',
            colorActive: '#fff'
        },
        ok: {
            text: '确定',
            size: 12,
            w: 90,
            h: 35,
            bg: '#fff',
            bgActive: '#ccc',
            color: '#888',
            colorActive: '#fff'
        },
        title: {
            text: '请选择',
            size: 12,
            h: 44,
            bg: '#eee',
            color: '#888'
        },
        fixedOn: api.frameName,
        actives: actives
    }, function (ret, err) {
        if (ret) {
            consoledebug.log(JSON.stringify(ret))
            callback(ret)
        } else {
            consoledebug.log(JSON.stringify(err))
            callback(err)
        }
    })
}

/**
 * @name 打开相册或拍照
 *
 * @auth leek
 *
 * @param type
 * @param callback
 */
function getPicture(type, callback) {
    var sourceType = ['camera', 'library']

    api.getPicture({
        sourceType: sourceType[type + 1],
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: false,
        saveToPhotoAlbum: false
    }, function (ret, err) {
        if (ret) {
            callback(ret)
        } else {
            callback(err)
        }
    })
}

/**
 * @name 打开日期时间picker
 *
 * @auth leek
 *
 * @param type          类型          取值范围：'date', 'time', 'date_time'
 * @param date          格式          取值范围：'yyyy-MM-dd', 'HH:mm:ss', 'yyyy-MM-dd HH:mm:ss'
 * @param title         标题
 * @param callback
 */
function openPicker(type, title, date, callback) {
    var param = {
        type: type,
        title: title
    }

    switch (type) {
        case 'date':
            if (!date) {
                date = '' + moment().year() + '-' + moment().month() + '-' + moment().date()

                param.date = date
            }
            param.date = date
            break
        case 'time':
            if (!date) {
                date = '' + moment.hour() + ':' + moment.minute()

                param.date = date
            }
            param.date = date
            break
        case 'date_time':
            if (!date) {
                date = '' + moment().year() + '-' + moment().month() + '-' + moment().date() + ' ' + moment.hour() + ':' + moment.minute()

                param.date = date
            }
            param.date = date
            break
        default:
            break
    }

    api.openPicker(param, function (ret, err) {
        if (ret) {
            consoledebug.log(JSON.stringify(ret))
            callback(ret)
        } else {
            consoledebug.log(JSON.stringify(err))
            callback(err)
        }
    })
}

function openUIMultiSelector(items, callback) {
    var UIMultiSelector = api.require('UIMultiSelector')

    UIMultiSelector.open({
        rect: {
            h: 44 + items.length * 35//（可选项）数字类型；模块的高度；默认：244
        },
        text: {
            title: '擅长技术', //（可选项）字符串类型；模块左上按钮和右上按钮中间显示的标题文字，若不传则不显示
            leftBtn: '取消', //（可选项）字符串类型；模块左上按钮的显示文字；默认：取消
            rightBtn: '完成', //（可选项）字符串类型；模块右上按钮的显示文字；默认：完成
            // selectAll : '全选' //（可选项）字符串类型；模块的全选项文字；默认：全选
        },
        max: 5, //最多允许同时选中的项数，0 时可选中所有项
        styles: {
            //bg : 'widget://image/apicloud.png', //（可选项）字符串类型；主体的背景，支持 rgb，rgba，#，widget://，fs://；默认：#fff
            mask: 'rgba(0,0,0,.6)', //（可选项）字符串类型；遮罩层的背景，支持 rgb、rgba、#、img；默认：rgba(0,0,0,0)
            title: {//（可选项）JSON 类型；标题栏样式；默认：见内部字段
                bg: '#f5f5f5', //（可选项）字符串类型；标题栏的背景，支持 rgb、rgba、#、img；默认：#ddd
                color: '#000', //（可选项）字符串类型；标题字体颜色，支持 rgb、gba、#；默认：#444
                size: 16, //（可选项）数字类型；标题字体大小；默认：16
                h: 44 //（可选项）数字类型；标题栏的高度；默认：44
            },
            leftButton: {//（可选项）JSON 类型；左上角按钮样式；默认：见内部字段
                bg: '#e0e0e0', //（可选项）JSON 类型；按钮的背景，支持 rgb、rgba、#、img；默认：#f00
                w: 80, //（可选项）数字类型；按钮的宽度；默认：80
                h: 35, //（可选项）数字类型；按钮的高度；默认：35
                marginT: 5, //（可选项）数字类型；按钮的上边距；默认：5
                marginL: 8, //（可选项）数字类型；按钮的左边距；默认：8
                color: '#000', //（可选项）字符串类型；按钮的文字颜色，支持 rgb、rgba、#；默认：#fff
                size: 14                      //（可选项）数字类型；按钮的文字大小；默认：14
            },
            rightButton: {//（可选项）JSON 类型；右上角按钮样式；默认：见内部字段
                bg: '#f9d44a', //（可选项）JSON 类型；按钮的背景，支持 rgb、rgba、#、img；默认：#0f0
                w: 80, //（可选项）数字类型；按钮的宽度；默认：80
                h: 35, //（可选项）数字类型；按钮的高度；默认：35
                marginT: 5, //（可选项）数字类型；按钮的上边距；默认：5
                marginR: 8, //（可选项）数字类型；按钮的右边距；默认：8
                color: '#000', //（可选项）字符串类型；按钮的文字颜色，支持 rgb、rgba、#；默认：#fff
                size: 14                      //（可选项）数字类型；按钮的文字大小；默认：14
            },
            item: {//（可选项）JSON 类型；每个选项的样式；默认：见内部字段
                h: 35, //（可选项）数字类型；按钮的高度；默认：35
                bg: '#fff', //（可选项）JSON 类型；选项的背景，支持 rgb、rgba、#、img；默认：#fff
                bgActive: '#f9d44a', //（可选项）JSON 类型；已选中选项的背景，支持 rgb、rgba、#、img；默认：bg
                // bgHighlight : 'rgb(238,17,150)', //（可选项）JSON 类型；选项的高亮背景，支持 rgb、rgba、#、img；默认：bg
                color: '#000', //（可选项）字符串类型；选项的文字颜色，支持 rgb，rgba，#；默认：#444
                // active : 'rgb(201,118,126)', //（可选项）字符串类型；已选中选项的文字颜色，支持 rgb、rgba、#；默认：color
                // highlight : 'rgb(255,255,0)', //（可选项）字符串类型；选项的高亮文字颜色，支持 rgb、rgba、#；默认：color
                size: 14, //（可选项）数字类型；选项的文字大小；默认：14
                lineColor: '#e4e4e4', //（可选项）字符串类型；分隔线的颜色，支持 rgb、rgba、#；默认：rgba(0,0,0,0)
                textAlign: 'center'             //（可选项）字符串类型；选项文字的对齐方式，'left|center|right'，当值为 left 或 right 时文字会根据情况空留 icon 已占的位置；默认：left
            },
            icon: {//（可选项）JSON 类型；每个选项的状态图标样式，若不传则不显示选中的状态图标
                w: 0, //（可选项）数字类型；图标的高度；默认：20
                h: 0, //（可选项）数字类型；图标的高度；默认：w
                marginT: 0, //（可选项）数字类型；图标的上边距；默认：(item.h - h) / 2
                marginH: 0, //（可选项）数字类型；图标的横向边距，与 align 的对齐方向相关；默认：8
                bg: '#fff', //（可选项）JSON 类型；图标未选中时的背景，支持 rgb、rgba、#、img；默认：rgba(0,0,0,0)
                // bgActive : 'widget://image/dg.png', //（可选项）JSON 类型；已选中图标的背景，支持 rgb、rgba、#、img；默认：bg
                // bgHighlight : 'widget://image/fangduigou.png', //（可选项）JSON 类型；选项的高亮背景，支持 rgb、rgba、#、img；默认：bg
                align: 'left'                 //（可选项）字符串类型；图标相对与选项的对齐方式：'left|right'；默认：left
            }
        },
        animation: true,
        items: items
    }, function (ret, err) {
        if (ret) {
            callback(ret)
        } else {
            callback(err)
        }
    })
}

function closeUIMultiSelector() {
    var UIMultiSelector = api.require('UIMultiSelector')
    UIMultiSelector.close()
}
