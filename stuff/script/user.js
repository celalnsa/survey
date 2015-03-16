/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 24/04/14
 * Time: 22:05
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var $userInfo = $("#user-info");
    var $userSpeakRights = $("#user-speak-rights");
    var $mySurveys = $("#my-surveys");
    var $myAnswers = $("#my-answers");
    var $buttonEditTagBox = $("#button-edit-tag-box");
    $buttonEditTagBox.click(function () {
        if ($(this).children("span").hasClass("glyphicon-pencil")) {
            $("div#user-speak-rights button.close").show();
            $(this).children("span")
                .removeClass("glyphicon-pencil")
                .addClass("glyphicon-ok");
        } else {
            $("div#user-speak-rights button.close").hide();
            $(this).children("span")
                .removeClass("glyphicon-ok")
                .addClass("glyphicon-pencil");
        }
    });

    High.initialUpDownEventHandler("user-speak-rights");
    High.initialUpDownEventHandler("my-surveys");
    High.initialUpDownEventHandler("my-answers");
    $("div.panel-collapse.collapse:lt(2)").addClass("in");
    $("a.collapse-up-down span:lt(2)")
        .removeClass("glyphicon-chevron-down")
        .addClass("glyphicon-chevron-up");
    $buttonEditTagBox.children("span")
        .removeClass("glyphicon-ok")
        .addClass("glyphicon-pencil");
    $("div#user-speak-rights button.close").click(function () {
        $userSpeakRights[0].removeChild(this.parentNode.parentNode);
    }).hide();
});