/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 01/05/14
 * Time: 15:17
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    High.initialUpDownEventHandler('my-speak-rights');
    High.initialUpDownEventHandler('all-speak-tags');
    var $buttonEditTagBox = $("#button-edit-tag-box");
    $buttonEditTagBox.click(function () {
        if ($(this).children("span").hasClass("glyphicon-pencil")) {
            $("div#my-speak-rights-panel button.close").show();
            $(this).children("span")
                .removeClass("glyphicon-pencil")
                .addClass("glyphicon-ok");
        } else {
            $("div#my-speak-rights-panel button.close").hide();
            $(this).children("span")
                .removeClass("glyphicon-ok")
                .addClass("glyphicon-pencil");
        }
    });
    $("div#my-speak-rights-panel button.close").hide();
});