/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 27/04/14
 * Time: 21:38
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var $questionsRange = $("input[type='range']");
    $questionsRange.on("change", function () {
        var $rangeName = $(this).attr("id");
        $("#" + $rangeName + "-value-show").text($(this).val());
    });
    if (High.URLParameter.paperId) {
        $.getJSON("/survey/search/PaperForm", {paperId: High.URLParameter.paperId}, function (paper) {
            if (paper.id > 0) {
                High.getPaper = paper;
                High.formPaper.paper($("#main-body-container"));
                $("p#submit-paper-answer-board").text(paper.thanksSentence);
            }
        });
    } else {
        window.location.href = "/survey/paper";
    }
    /*High.getPaper = $.parseJSON("{\"summary\":\"摘要\",\"questionList\":[{\"id\":1,\"content\":\"问题1\",\"result\":null,\"sortItemList\":[],\"queueOrder\":1,\"type\":1,\"optionList\":[{\"id\":1,\"text\":\"11\",\"queueOrder\":1},{\"id\":2,\"text\":\"12\",\"queueOrder\":2}]},{\"id\":2,\"content\":\"问题2\",\"result\":null,\"sortItemList\":[],\"queueOrder\":2,\"type\":2,\"optionList\":[{\"id\":3,\"text\":\"21\",\"queueOrder\":1},{\"id\":4,\"text\":\"22\",\"queueOrder\":2}]},{\"id\":3,\"content\":\"问题3\",\"result\":null,\"sortItemList\":[],\"queueOrder\":3,\"type\":3,\"optionList\":[]},{\"id\":4,\"content\":\"问题4\",\"result\":null,\"sortItemList\":[],\"queueOrder\":4,\"type\":4,\"optionList\":[]},{\"id\":5,\"content\":\"问题5\",\"result\":null,\"sortItemList\":[{\"id\":1,\"text\":\"51\",\"queueOrder\":1},{\"id\":2,\"text\":\"52\",\"queueOrder\":2}],\"queueOrder\":5,\"type\":5,\"optionList\":[]},{\"id\":6,\"content\":\"问题6\",\"result\":null,\"sortItemList\":[],\"queueOrder\":6,\"type\":6,\"optionList\":[]}],\"lottery\":null,\"discountTicket\":null,\"makerId\":1,\"id\":2,\"paperTagList\":[],\"title\":\"标题\",\"answerCount\":0,\"postedDate\":{\"month\":5,\"year\":2014,\"day\":28},\"bonus\":0,\"welcomeSentence\":\"欢迎参加本次答题。\",\"thanksSentence\":\"您已完成本次问卷，感谢您的帮助与支持。\"}")
    High.formPaper.paper();  */
    $("#btn-paper-answer-submit").click(function () {
        $("#submit-paper-answer-modal").modal("show");
    });
    $("#submit-paper-answer-modal").on('hidden.bs.modal',function(){
        window.location.href = "/survey/paper";
    });
});