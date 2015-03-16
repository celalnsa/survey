/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 27/04/14
 * Time: 19:18
 * To change this template use File | Settings | File Templates.
 */

High.submitNewPaper = function () {
    if (High.paper.questionCount < 1) {
        $("#submit-paper-warning-board").text("这份问卷一道题也没有。");
        $("#submit-paper-warning-modal").modal("show");
        return;
    } else if(!High.userSignedIn()){
        $("#submit-paper-warning-board").text("您还未登录，登录之后才能提交问卷。");
        $("#submit-paper-warning-modal").modal("show");
        return;
    }
    $.post("/survey/create/PaperStore",{paper: $.toJSON(High.parsePaper())},function(result,textStatus){
        if(result.finished){
            window.location.href = "/survey/paper/post/?paperId="+result.paperId;
        }
    },"json");
}
$(function () {
    $("#btn-yes-delete-question").click(function () {
        $("#delete-question-warning-modal").modal("hide");
        High.deleteQuestion();
    });
    $("#new-single-selection-link").click(function () {
        High.newQuestion.newSingleSelectionHandler();
    });
    $("#new-multi-selection-link").click(function () {
        High.newQuestion.newMultiSelectionHandler();
    });
    $("#new-range-link").click(function () {
        High.newQuestion.newRangeHandler();
    });
    $("#new-true-false-link").click(function () {
        High.newQuestion.newTrueFalseHandler();
    });
    $("#new-sort-link").click(function () {
        High.newQuestion.newSortHandler();
    });
    $("#new-text-link").click(function () {
        High.newQuestion.newTextHandler();
    });
    $("button.post-paper").click(function () {
        High.submitNewPaper();
    });
});