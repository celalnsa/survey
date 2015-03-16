/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 28/04/14
 * Time: 15:32
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var paperFillInURL = "http://"+location.host+"/survey/?paperId="+High.URLParameter.paperId;
    $("[data-toggle=popover]").popover();
    $('#popover-rewards').on('shown.bs.popover', function () {
        High.initialUpDownEventHandler("paper-discount-ticket");
        High.initialUpDownEventHandler("paper-lottery");
        $("#btn-close-reward-box").click(function(){
            $('#popover-rewards').popover("hide");
        });
    });
    High.setShareConfig(paperFillInURL,"问卷摘要","问卷标题");
    $("#copy-paper-link-text").text(paperFillInURL);
    $("#copy-paper-link-button").zclip({
        path:"/survey/stuff/libs/jquery-plugin/ZeroClipboard.swf",
        copy:paperFillInURL
    });
});