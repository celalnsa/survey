/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 28/04/14
 * Time: 15:32
 * To change this template use File | Settings | File Templates.
 */

var High = High || {};
var jiathis_config={
    data_track_clickback:true,
    siteNum:6,
    sm:"pocket,print,pdfonline,xqw,linkedin,ishare",
    url:"http://192.168.1.102/survey",
    summary:"专业商用问卷，就在我见。",
    title:"#我见#主页",
    boldNum:3,
    shortUrl:false,
    hideMore:false
    }

High.setShareConfig = function (paperUrl, paperSummary, paperTitle){
    jiathis_config.url = paperUrl;
    jiathis_config.summary = paperSummary;
    jiathis_config.title = paperTitle+" #填问卷啦#";
}

$(function () {
    var $snsShareButtons = $("<div class='share-box-left'>" +
        "<div class='jiathis_style_32x32'>" +
        "<a class='jiathis_button_weixin'></a>" +
        "<a class='jiathis_button_tsina'></a>" +
        "<a class='jiathis_button_qzone'></a>" +
        "<a class='jiathis_button_tqq'></a>" +
        "<a class='jiathis_button_renren'></a>" +
        "<a class='jiathis_button_kaixin001'></a>" +
        "</div></div>" +
        "<div class='share-box-right'>" +
        "<div class='jiathis_style_32x32'>" +
        "<a class='jiathis_button_yixin'></a>" +
        "<a class='jiathis_button_feixin'></a>" +
        "<a class='jiathis_button_cqq'></a>" +
        "<a class='jiathis_button_douban'></a>" +
        "<a class='jiathis_button_xiaoyou'></a>" +
        "<a class='jiathis_button_msn'></a>" +
        "</div></div>" +
        "<div class='clearfix'></div>" +
        "<div class='share-box-left'>" +
        "<div class='jiathis_style_32x32'>" +
        "<a class='jiathis_button_t163'></a>" +
        "<a class='jiathis_button_fb'></a>" +
        "<a class='jiathis_button_twitter'></a>" +
        "<a class='jiathis_button_googleplus'></a>" +
        "<a class='jiathis_button_huaban'></a>" +
        "<a class='jiathis_button_tumblr'></a>" +
        "</div></div>" +
        "<div class='share-box-right'>" +
        "<div class='jiathis_style_32x32'>" +
        "<a class='jiathis_button_myspace'></a>" +
        "<a href='http://www.jiathis.com/share?uid=1923118' class='jiathis jiathis_txt jiathis_separator jtico jtico_jiathis' target='_blank'></a>" +
        "<a class='jiathis_counter_style'></a>" +
        "</div></div>" +
        "<div class='clearfix'></div>");
    $("#SNS-share-buttons").append($snsShareButtons);
    $("body").append("<script type='text/javascript' src='http://v3.jiathis.com/code_mini/jia.js?uid=1923118' charset='utf-8'></script>");
});
