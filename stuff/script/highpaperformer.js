/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 27/05/14
 * Time: 21:11
 * To change this template use File | Settings | File Templates.
 */
var High = High || {};
High.answer = {};
High.getPaper = {};
High.formPaper = {};
High.formPaper.IDCreator = {};
High.formPaper.IDCreator.question = function (questionId) {
    return "question-" + questionId;
}
High.formPaper.IDCreator.rangeValue = function (questionId) {
    return High.formPaper.IDCreator.question(questionId) + "-range-value";
}
High.formPaper.IDCreator.rangeInput = function (questionId) {
    return High.formPaper.IDCreator.question(questionId) + "-range";
}
High.formPaper.IDCreator.sortItem = function (questionId, index) {
    return High.formPaper.IDCreator.question(questionId) + "-sort-item-" + index;
}
High.formPaper.IDCreator.sortItemBadge = function (questionId, index) {
    return High.formPaper.IDCreator.sortItem(questionId, index) + "-badge";
}
High.formPaper.IDCreator.text = function(questionId){
    return High.formPaper.IDCreator.question(questionId) + "-text-area";
}
High.formPaper.NameCreator = {};
High.formPaper.NameCreator.option = function (questionId) {
    return High.formPaper.IDCreator.question(questionId) + "-choice";
}
High.formPaper.paper = function (randerBox) {
    var $paper = $("<div class='panel panel-info'></div>");
    $paper.append(High.formPaper.paperTitle())
        .append(High.formPaper.paperSummary())
        .append(High.formPaper.surveyContent());
    randerBox.prepend($paper);
}
High.formPaper.paperTitle = function () {
    var $title = $("<div class='panel-heading'></div> ");
    var $h4 = $("<h4 class='panel-title text-center paper-title'></h4>");
    $h4.text(High.getPaper.title);
    $title.append($h4);
    return $title;
}
High.formPaper.paperSummary = function () {
    var $summary = $("<div class='panel-body paper-summary'></div>");
    var $p = $("<p class='info'></p>");
    var $strong = $("<strong class='text-primary'>摘要：</strong>");
    $p.text(High.getPaper.summary)
        .prepend($strong);
    $summary.append($p);
    return $summary;
}
High.formPaper.surveyContent = function () {
    var $content = $("<div class='survey-content'></div>");
    $content.append(High.formPaper.welcomeBanner())
        .append($("<hr>"))
        .append(High.formPaper.surveyQuestions(High.getPaper.questionList));
    return $content;
}
High.formPaper.surveyQuestions = function (questionList) {
    var $questions = $("<div class='survey-questions'></div>")
    var formQuestionFunc = null;
    for (var i = 0; i < questionList.length; i++) {
        switch (questionList[i].type) {
            case High.questionType.SingleSelection:
                formQuestionFunc = High.formPaper.singleSelection;
                break;
            case High.questionType.MultiSelection:
                formQuestionFunc = High.formPaper.multiSelection;
                break;
            case High.questionType.Range:
                formQuestionFunc = High.formPaper.range;
                break;
            case High.questionType.TrueFalse:
                formQuestionFunc = High.formPaper.trueFalse;
                break;
            case High.questionType.Sort:
                formQuestionFunc = High.formPaper.sort;
                break;
            case High.questionType.Text:
                formQuestionFunc = High.formPaper.text;
                break;
            default:
                break;
        }
        $questions.append(formQuestionFunc(questionList[i]));
    }
    return $questions;
}
High.formPaper.singleSelection = function (question) {
    var $question = $("<div class='survey-one-question'></div>");
    var $singleSelection = $("<div class='panel panel-success question-type-single-selection'></div>");
    var $questionContentBody = $("<div class='panel-body'></div>");
    for (var i = 0; i < question.optionList.length; i++) {
        $questionContentBody.append(High.formPaper.singleSelectionOption(question.id, question.optionList[i]));
    }
    $singleSelection.append(High.formPaper.questionTitle(question.content))
        .append($questionContentBody);
    $question.append($singleSelection);
    return $question;
}
High.formPaper.multiSelection = function (question) {
    var $question = $("<div class='survey-one-question'></div>");
    var $multiSelection = $("<div class='panel panel-success question-type-multi-selection'></div>");
    var $questionContentBody = $("<div class='panel-body'></div>");
    for (var i = 0; i < question.optionList.length; i++) {
        $questionContentBody.append(High.formPaper.multiSelectionOption(question.id, question.optionList[i]));
    }
    $multiSelection.append(High.formPaper.questionTitle(question.content))
        .append($questionContentBody);
    $question.append($multiSelection);
    return $question;
}
High.formPaper.range = function (question) {
    var $question = $("<div class='survey-one-question'></div>");
    var $range = $("<div class='panel panel-success question-type-range'></div>");
    var $questionContentBody = $("<div class='panel-body'></div>");
    $questionContentBody.append(High.formPaper.rangeControl(question.id));
    $range.append(High.formPaper.questionTitle(question.content))
        .append($questionContentBody);
    $question.append($range);
    return $question;
}
High.formPaper.trueFalse = function (question) {
    var $question = $("<div class='survey-one-question'></div>");
    var $trueFalse = $("<div class='panel panel-success question-type-true-false'></div>");
    var $questionContentBody = $("<div class='panel-body'></div>");
    $questionContentBody.append(High.formPaper.trueFalseControl(question.id));
    $trueFalse.append(High.formPaper.questionTitle(question.content))
        .append($questionContentBody);
    $question.append($trueFalse);
    return $question;
}
High.formPaper.sort = function (question) {
    var $question = $("<div class='survey-one-question'></div>");
    var $sort = $("<div class='panel panel-success question-type-sort'></div>");
    var $questionContentBody = $("<div class='panel-body'></div>");
    var $ul = $("<ul class='nav'></ul>");
    for (var i = 0; i < question.sortItemList.length; i++) {
        $ul.append(High.formPaper.sortItem(question.id, i + 1, question.sortItemList[i]));
    }
    $questionContentBody.append($ul);
    $sort.append(High.formPaper.questionTitle(question.content))
        .append($questionContentBody);
    $question.append($sort);
    var questionId = High.formPaper.IDCreator.question(question.id);
    High.runtimeSpace[questionId] = {};
    High.runtimeSpace[questionId].itemCount = question.sortItemList.length;
    High.runtimeSpace[questionId].maxOrder = 0;
    High.runtimeSpace[questionId].itemOrderList = [];
    return $question;
}
High.formPaper.text = function (question) {
    var $question = $("<div class='survey-one-question'></div>");
    var $text = $("<div class='panel panel-success question-type-text'></div>");
    var $questionContentBody = $("<div class='panel-body'></div>");
    $questionContentBody.append(High.formPaper.textControl(question.id));
    $text.append(High.formPaper.questionTitle(question.content))
        .append($questionContentBody);
    $question.append($text);
    return $question;
}
High.formPaper.questionTitle = function (questionTitle) {
    var $title = $("<div class='panel-heading'></div>");
    $title.text(questionTitle);
    return $title;
}
High.formPaper.singleSelectionOption = function (questionId, option) {
    var $option = $("<div class='radio'></div>");
    var $label = $("<label></label>");
    var $radio = $("<input type='radio'>");
    $radio.attr({"name": High.formPaper.NameCreator.option(questionId), "value": option.id});
    $label.text(option.text)
        .prepend($radio);
    $option.append($label);
    return  $option;
}
High.formPaper.multiSelectionOption = function (questionId, option) {
    var $option = $("<div class='checkbox'></div>");
    var $label = $("<label></label>");
    var $checkbox = $("<input type='checkbox'>");
    $checkbox.attr({"name": High.formPaper.NameCreator.option(questionId), "value": option.id});
    $label.text(option.text)
        .prepend($checkbox);
    $option.append($label);
    return  $option;
}
High.formPaper.sortItem = function (questionId, index, sortItem) {
    var $item = $("<li></li>");
    var $link = $("<a href='#'></a>");
    var $badge = $("<span class='badge'></span>");
    $badge.attr("id", High.formPaper.IDCreator.sortItemBadge(questionId, index))
        .hide();
    $link.text(sortItem.text)
        .prepend($badge)
        .click(function (event) {
            High.formPaper.sortItemClickHandler(questionId, index-1 ,sortItem.id);
            event.preventDefault();
        });
    $item.append($link);
    return $item;
}
High.formPaper.rangeControl = function (questionId) {
    var $rangeControl = $("<div class='input-group'></div>");
    var $spanPleaseRate = $("<span class='input-group-addon'>请打分：</span>");
    var $spanValue = $("<span class='input-group-addon'></span>");
    var $inputRange = $("<input type='range' step='1' max='5' min='0'>");
    $spanValue.attr("id", High.formPaper.IDCreator.rangeValue(questionId))
        .text("3");
    $inputRange.attr({"value": "3", "id": High.formPaper.IDCreator.rangeInput(questionId)})
        .change(function () {
            High.formPaper.rangeValueChangeShowHandler(questionId);
        });
    $rangeControl.append($spanPleaseRate)
        .append($spanValue)
        .append($inputRange);
    return $rangeControl;
}
High.formPaper.trueFalseControl = function (questionId) {
    var $trueFalseControl = $("<div class='btn-group' data-toggle='buttons'></div>");
    var $labelTrue = $("<label class='btn btn-default'></label>");
    var $radioTrue = $("<input type='radio'>");
    var $spanTrue = $("<span class='glyphicon'></span>");
    var $labelFalse = $("<label class='btn btn-default'></label>");
    var $radioFalse = $("<input type='radio'>");
    var $spanFalse = $("<span class='glyphicon'></span>");
    $radioTrue.attr({"name": High.formPaper.NameCreator.option(questionId), "value": "true"});
    $radioFalse.attr({"name": High.formPaper.NameCreator.option(questionId), "value": "false"});
    $spanTrue.addClass("glyphicon-ok")
        .text(" 是");
    $spanFalse.addClass("glyphicon-remove")
        .text(" 否");
    $labelTrue.append($radioTrue)
        .append($spanTrue);
    $labelFalse.append($radioFalse)
        .append($spanFalse);
    $trueFalseControl.append($labelTrue)
        .append($labelFalse);
    return $trueFalseControl;
}
High.formPaper.textControl = function (questionId) {
    var $textControl = $("<textarea class='form-control'></textarea>");
    $textControl.text("答：")
        .attr("id", High.formPaper.IDCreator.text(questionId));
    return $textControl;
}
High.formPaper.welcomeBanner = function () {
    var $banner = $("<div class='survey-welcome-banner'></div>");
    var $p = $("<p class='lead'></p>");
    $p.text(High.getPaper.welcomeSentence);
    $banner.append($p);
    return $banner;
}
High.formPaper.rangeValueChangeShowHandler = function (questionId) {
    $("#" + High.formPaper.IDCreator.rangeValue(questionId)).text(
        $("#" + High.formPaper.IDCreator.rangeInput(questionId)).val()
    );
}
High.formPaper.sortItemClickHandler = function (questionId, itemIndex, itemId) {
    var runningSpace = High.runtimeSpace[High.formPaper.IDCreator.question(questionId)];
    if (runningSpace.itemOrderList[itemIndex]) {
        var cancelOrder = runningSpace.itemOrderList[itemIndex].order;
        runningSpace.itemOrderList[itemIndex] = null;
        $("#" + High.formPaper.IDCreator.sortItemBadge(questionId, itemIndex + 1)).hide();
        for (var i = 0; i < runningSpace.itemCount; i++) {
            if (runningSpace.itemOrderList[i] && runningSpace.itemOrderList[i].order > cancelOrder) {
                $("#" + High.formPaper.IDCreator.sortItemBadge(questionId, i + 1))
                    .text((--runningSpace.itemOrderList[i].order) + "");
            }
        }
        runningSpace.maxOrder--;
    }else{
        runningSpace.itemOrderList[itemIndex] = {};
        runningSpace.itemOrderList[itemIndex].itemId = itemId;
        runningSpace.itemOrderList[itemIndex].order = ++runningSpace.maxOrder;
        $("#" + High.formPaper.IDCreator.sortItemBadge(questionId, itemIndex + 1))
            .text(runningSpace.itemOrderList[itemIndex].order)
            .show();
    }
}
High.runtimeSpace = {};
High.parseAnswer = {};
High.parseAnswer.parse = function () {
}