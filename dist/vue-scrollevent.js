'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var eventData = [];
var $lockCheck = false;
// event结构
// {
//    fn:function() // 需要执行的函数
//    position: //执行位置,数字为滚动条距离,字符为top bottom left right move,对应滚动条到哪个底部位置触发
// }
var t = void 0,
    onscrollEvent = void 0;
// 滚动条在Y轴上的滚动距离
var _d = document;
var getScrollTop = function getScrollTop() {
    var bodyScrollTop = 0;
    var documentScrollTop = 0;
    if (_d.body) {
        bodyScrollTop = _d.body.scrollTop;
    }
    if (_d.documentElement) {
        documentScrollTop = _d.documentElement.scrollTop;
    }
    return bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
};

// 文档的总高度
var getScrollHeight = function getScrollHeight() {
    var bodyScrollHeight = 0;
    var documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    return bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
};

// 浏览器视口的高度
var getWindowHeight = function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
};

var check = function check() {
    // TODO 可以考虑这里加一些预留的参数底
    // 到顶
    if ($lockCheck) return;
    $lockCheck = true;
    if (getScrollTop() === 0) {
        console.log('go to top');
        eventData.filter(function (p) {
            return p.position === 'top';
        }).forEach(function (p) {
            p.fn();
        });
    } else if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 50) {
        console.log('go to bottom');
        // 到底
        eventData.filter(function (p) {
            return p.position === 'bottom';
        }).forEach(function (p) {
            p.fn();
        });
        return true;
    }
    $lockCheck = false;
    return false;
};
// TODO 滚动条自动加载
var fn = {
    bind: function bind(_opt) {
        this.options = _opt;
        console.log('ready ok');
        var event = function event() {
            clearTimeout(t);
            var scrollHeight = getScrollTop() + getWindowHeight();
            eventData.filter(function (p) {
                return p.position === 'move';
            }).forEach(function (p) {
                console.log('move');
                p.fn(scrollHeight);
            });
            t = setTimeout(function () {
                console.log('check position');
                check();
            }, 100);
        };
        // TODO 如有性能问题 将此注释
        // window.addEventListener('touchmove', event);
        window.addEventListener('scroll', function (e) {
            event();
        });
        // document.dispatchEvent('scroll');
    },

    //仅支持到底触发
    push: function push(event) {
        eventData.push(event);
    },

    //清除所有事件
    clear: function clear() {
        eventData.length = 0;
        otherEvent.length = 0;
        if (onscrollEvent) {
            window.onscroll = onscrollEvent;
        }
    }
};
exports.default = {
    install: function install(vue, options) {
        Object.defineProperty(vue.prototype, '$scroll', {
            get: function get() {
                return fn;
            }
        });
        vue.prototype.$scroll.bind(options);
    }
};
