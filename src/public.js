function getParams(paras) {
    var url = decodeURI(location.href);
    var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
    var returnValue;
    for (i = 0; i < paraString.length; i++) {
        var tempParas = paraString[i].split('=')[0];
        var parasValue = paraString[i].split('=')[1];
        if (tempParas === paras)
            returnValue = parasValue;
    }
    if (typeof(returnValue) == 'undefined') {
        return '';
    } else {
        return returnValue;
    }
}

$(function () {
    var password = getParams('password');
    var url = decodeURIComponent(getParams('url'));
    var MainPicture = decodeURIComponent(getParams('MainPicture'));
    $('#MainPicture').attr('src', MainPicture);
    $('#ComputerLink').attr('href', url);
    $('.itemCopy').attr('data-clipboard-text', '(' + password + ')');
    $('#taokey').text('(' + password + ')');
    //复制文本
    var clipboard = new Clipboard('.itemCopy');
    var RedBag = new Clipboard('#RedBag');
    var Wechat = new Clipboard('#Wechat');
    //链接
    clipboard.on('success',
        function (e) {
            if (e.trigger.disabled == false || e.trigger.disabled == undefined) {
                iziToast.success({
                    message: '复制成功，打开淘宝会自动弹出口令！',
                    position: 'topCenter'
                });
            }
        });
    clipboard.on('error',
        function (e) {
            $('.beatWord').show();
            iziToast.error({
                message: '由于ios9系统原因<br>请手动长按框内复制！',
                position: 'topCenter'
            });
        });
    //红包
    RedBag.on('success',
        function (e) {
            if (e.trigger.disabled == false || e.trigger.disabled == undefined) {
                iziToast.show({
                    theme: 'light',
                    message: '感谢你对我的支持<br>打开支付宝搜索框粘贴<br>即可领取红包！',
                    position: 'topCenter',
                    image: './img/yang.jpg',
                    timeout: '10000',
                    imageWidth: 100
                });
            }
        });
    RedBag.on('error',
        function (e) {
            iziToast.error({
                message: '复制失败，请联系嗷嗷！',
                position: 'topCenter'
            });
        });
    //Wechat
    Wechat.on('success',
        function (e) {
            if (e.trigger.disabled == false || e.trigger.disabled == undefined) {
                iziToast.show({
                    theme: 'dark',
                    message: '打开微信添加好友<br>粘贴后搜索即可添加！',
                    position: 'topCenter',
                    image: './img/yang.jpg',
                    timeout: '10000',
                    imageWidth: 100
                });
            }
        });
    Wechat.on('error',
        function (e) {
            iziToast.error({
                message: '复制失败，请联系嗷嗷！',
                position: 'topCenter'
            });
        });
    //处理iphonex兼容性
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
            $("#ExclusiveButtons").css("bottom", "34px");
            $("#Notice").css("padding-bottom", "84px")
        }
    }


    //UA判断
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iphone/i) == 'iphone' || ua.match(/ipad/i) == 'ipad') {
        $('#copy_tip').text('长按框内 > 拷贝 > 打开手淘');
        var iphoneInfo = ua.match(/iphone os (\d{1,})/i);
        var iosVersion = iphoneInfo[1];
        if (iosVersion < 10 && ua.match(/ipad/i) != 'ipad') {
            $('.beatWord').show();
        }
    }
    //自动选中
    var word = document.querySelector('.itemWord');
    document.addEventListener('selectionchange',
        function (e) {
            window.getSelection().selectAllChildren(word);
        },
        false);
})