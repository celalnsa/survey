/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 23/05/14
 * Time: 21:40
 * To change this template use File | Settings | File Templates.
 */
var High = High || {};
High.paper = {};
High.paper.questionTable = [];
High.paper.questionTable[0] = {name: "Fucking High."};
High.paper.questionCount = 0;
High.paper.questionNextId = 1;
High.paper.questionHeadOffId = 0;
High.newQuestion = {};
High.newQuestion.IDCreator = {};
High.newQuestion.IDCreator.question = function (questionId) {
    return "question-" + questionId;
}
High.newQuestion.IDCreator.titleInput = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-title-input";
}
High.newQuestion.IDCreator.titleNumber = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-title-number";
}
High.newQuestion.IDCreator.buttonPlusOption = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-btn-plus-option";
}
High.newQuestion.IDCreator.buttonPlusOptionBox = function (questionId) {
    return High.newQuestion.IDCreator.buttonPlusOption(questionId) + "-box";
}
High.newQuestion.IDCreator.titleButtonDelete = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-title-btn-delete";
}
High.newQuestion.IDCreator.titleButtonMoveUp = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-title-btn-move-up";
}
High.newQuestion.IDCreator.titleButtonMoveDown = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-title-btn-move-down";
}
High.newQuestion.IDCreator.option = function (questionId, index) {
    return High.newQuestion.IDCreator.question(questionId) + "-option-" + index;
}
High.newQuestion.IDCreator.optionButtonDelete = function (questionId, index) {
    return High.newQuestion.IDCreator.option(questionId, index) + "-btn-delete";
}
High.newQuestion.IDCreator.optionTextBox = function (questionId, index) {
    return High.newQuestion.IDCreator.option(questionId, index) + "-text-input";
}
High.newQuestion.IDCreator.sortItem = function (questionId, index) {
    return High.newQuestion.IDCreator.question(questionId) + "-sort-item-" + index;
}
High.newQuestion.IDCreator.sortItemButtonDelete = function (questionId, index) {
    return High.newQuestion.IDCreator.sortItem(questionId, index) + "-btn-delete";
}
High.newQuestion.IDCreator.sortItemTextBox = function (questionId, index) {
    return High.newQuestion.IDCreator.sortItem(questionId, index) + "-text-input";
}
High.newQuestion.IDCreator.trueFalse = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-true-false";
}
High.newQuestion.IDCreator.rangeValue = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-range-value";
}
High.newQuestion.IDCreator.rangeInput = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-range";
}
High.newQuestion.IDCreator.text = function (questionId) {
    return High.newQuestion.IDCreator.question(questionId) + "-text-area";
}
High.newQuestion.newTitleButtonGroup = function (id) {
    var $buttonGroup = $("<div class='btn-group'></div>");
    $buttonGroup.append(High.newGlyphIconButton(High.newQuestion.IDCreator.titleButtonMoveUp(id), "success", "arrow-up", function () {
            High.newQuestion.questionMoveUpHandler(id);
        }))
        .append(High.newGlyphIconButton(High.newQuestion.IDCreator.titleButtonMoveDown(id), "success", "arrow-down", function () {
            High.newQuestion.questionMoveDownHandler(id);
        }))
        .append(High.newGlyphIconButton(High.newQuestion.IDCreator.titleButtonDelete(id), "danger", "trash", function () {
            High.newQuestion.questionDeleteHandler(id);
        }));
    return $buttonGroup;
}
High.newQuestion.newTitleTextInputGroup = function (id) {
    var $span = $("<span class='input-group-addon'></span>");
    var $input = $("<input type='text' class='form-control'>");
    var $textInputGroup = $("<div class='input-group'></div>");
    $span.attr("id", High.newQuestion.IDCreator.titleNumber(id));
    $input.attr({"name": "survey-question", "id": High.newQuestion.IDCreator.titleInput(id)})
        .val("问题" + id);
    $textInputGroup.append($span)
        .append($input);
    return $textInputGroup;
}
High.newQuestion.newContentTitle = function (id) {
    var $contentTitle = $("<div class='question-content-title'></div>");
    $contentTitle.append(High.newQuestion.newTitleButtonGroup(id))
        .append(High.newQuestion.newTitleTextInputGroup(id));
    return $contentTitle;
}
High.newQuestion.newPlusButton = function (id, addHandler) {
    var $plusButton = $("<div class='input-group'></div>");
    $plusButton.append(High.newGlyphIconButton(High.newQuestion.IDCreator.buttonPlusOption(id), "success", "plus", addHandler))
        .attr("id", High.newQuestion.IDCreator.buttonPlusOptionBox(id));
    return $plusButton;
}
High.newQuestion.newSingleSelectionOption = function (id, index) {
    var $option = $("<div class='input-group'></div>");
    var $spanRadio = $("<span class='input-group-addon'></span>");
    var $radio = $("<input type='radio'>");
    var $text = $("<input type='text' class='form-control'>");
    var $spanButton = $("<span class='input-group-addon btn-inside'></span>");
    $radio.attr("name", "question-" + id + "-radio");
    $spanRadio.append($radio);
    $text.attr({"placeholder": "选项" + index, "id": High.newQuestion.IDCreator.optionTextBox(id, index)});
    $spanButton.append(
        High.newGlyphIconButton(High.newQuestion.IDCreator.optionButtonDelete(id, index), "danger", "trash", function () {
            High.newQuestion.optionDeleteHandler(id, index);
        }));
    $option.append($spanRadio)
        .append($text)
        .append($spanButton)
        .attr("id", High.newQuestion.IDCreator.option(id, index));
    return $option;
}
High.newQuestion.newMultiSelectionOption = function (id, index) {
    var $option = $("<div class='input-group'></div>");
    var $spanCheckbox = $("<span class='input-group-addon'></span>");
    var $checkbox = $("<input type='checkbox'>");
    var $text = $("<input type='text' class='form-control'>");
    var $spanButton = $("<span class='input-group-addon btn-inside'></span>");
    $checkbox.attr("name", "question-" + id + "-checkbox");
    $spanCheckbox.append($checkbox);
    $text.attr({"placeholder": "选项" + index, "id": High.newQuestion.IDCreator.optionTextBox(id, index)});
    $spanButton.append(
        High.newGlyphIconButton(High.newQuestion.IDCreator.optionButtonDelete(id, index), "danger", "trash", function () {
            High.newQuestion.optionDeleteHandler(id, index);
        }));
    $option.append($spanCheckbox)
        .append($text)
        .append($spanButton)
        .attr("id", High.newQuestion.IDCreator.option(id, index));
    return $option;
}
High.newQuestion.newRangeControl = function (id) {
    var $rangeControl = $("<div class='input-group'></div>");
    var $spanPleaseRate = $("<span class='input-group-addon'>请打分：</span>");
    var $spanValue = $("<span class='input-group-addon'></span>");
    var $inputRange = $("<input type='range' step='1' max='5' min='0'>");
    $spanValue.attr("id", High.newQuestion.IDCreator.rangeValue(id))
        .text("3");
    $inputRange.attr({"value": "3", "id": High.newQuestion.IDCreator.rangeInput(id)})
        .change(function () {
            High.newQuestion.rangeValueChangeShowHandler(id);
        });
    $rangeControl.append($spanPleaseRate)
        .append($spanValue)
        .append($inputRange);
    return $rangeControl;
}
High.newQuestion.newTrueFalseControl = function (id) {
    var $trueFalseControl = $("<div class='btn-group' data-toggle='buttons'></div>");
    var $labelTrue = $("<label class='btn btn-default'></label>");
    var $radioTrue = $("<input type='radio'>");
    var $spanTrue = $("<span class='glyphicon'></span>");
    var $labelFalse = $("<label class='btn btn-default'></label>");
    var $radioFalse = $("<input type='radio'>");
    var $spanFalse = $("<span class='glyphicon'></span>");
    $radioTrue.attr({"name": "question-" + id + "-radio", "value": "true"});
    $radioFalse.attr({"name": "question-" + id + "-radio", "value": "false"});
    $spanTrue.addClass("glyphicon-ok")
        .text(" 是");
    $spanFalse.addClass("glyphicon-remove")
        .text(" 否");
    $labelTrue.append($radioTrue)
        .append($spanTrue);
    $labelFalse.append($radioFalse)
        .append($spanFalse);
    $trueFalseControl.append($labelTrue)
        .append($labelFalse)
        .attr("id", High.newQuestion.IDCreator.trueFalse(id));
    return $trueFalseControl;
}
High.newQuestion.newSortItem = function (id, index) {
    var $sortItem = $("<div class='input-group'></div>");
    var $spanSpan = $("<span class='input-group-addon'><span class='glyphicon glyphicon-sort'></span></span>");
    var $text = $("<input type='text' class='form-control'>");
    var $spanButton = $("<span class='input-group-addon btn-inside'></span>");
    $text.attr({"placeholder": "项目" + index, "id": High.newQuestion.IDCreator.sortItemTextBox(id, index)});
    $spanButton.append(
        High.newGlyphIconButton(High.newQuestion.IDCreator.sortItemButtonDelete(id, index), "danger", "trash", function () {
            High.newQuestion.sortItemDeleteHandler(id, index);
        }));
    $sortItem.append($spanSpan)
        .append($text)
        .append($spanButton)
        .attr("id", High.newQuestion.IDCreator.sortItem(id, index));
    return $sortItem;
}
High.newQuestion.newTextControl = function (id) {
    var $textControl = $("<textarea class='form-control'></textarea>");
    $textControl.text("答：")
        .attr("id", High.newQuestion.IDCreator.text(id));
    return $textControl;
}
High.newQuestion.singleSelection = function (id) {
    var $question = $("<div class='survey-one-question'></div>");
    var $singleSelection = $("<div class='question-type-single-selection'></div>");
    var $questionContentTitle = High.newQuestion.newContentTitle(id);
    var $questionContentBody = $("<div class='question-content-body'></div>");
    $questionContentBody.append(High.newQuestion.newSingleSelectionOption(id, 1))
        .append(High.newQuestion.newSingleSelectionOption(id, 2))
        .append(High.newQuestion.newPlusButton(id, function () {
            High.newQuestion.addSingleSelectionOptionHandler(id);
        }));
    $singleSelection.append($questionContentTitle)
        .append($questionContentBody);
    $question.append($singleSelection)
        .attr("id", High.newQuestion.IDCreator.question(id));
    return $question;
}
High.newQuestion.multiSelection = function (id) {
    var $question = $("<div class='survey-one-question'></div>");
    var $multiSelection = $("<div class='question-type-multi-selection'></div>");
    var $questionContentTitle = High.newQuestion.newContentTitle(id);
    var $questionContentBody = $("<div class='question-content-body'></div>");
    $questionContentBody.append(High.newQuestion.newMultiSelectionOption(id, 1))
        .append(High.newQuestion.newMultiSelectionOption(id, 2))
        .append(High.newQuestion.newPlusButton(id, function () {
            High.newQuestion.addMultiSelectionOptionHandler(id);
        }));
    $multiSelection.append($questionContentTitle)
        .append($questionContentBody);
    $question.append($multiSelection)
        .attr("id", High.newQuestion.IDCreator.question(id));
    return $question;
}
High.newQuestion.range = function (id) {
    var $question = $("<div class='survey-one-question'></div>");
    var $range = $("<div class='question-type-range'></div>");
    var $questionContentTitle = High.newQuestion.newContentTitle(id);
    var $questionContentBody = $("<div class='question-content-body'></div>");
    $questionContentBody.append(High.newQuestion.newRangeControl(id));
    $range.append($questionContentTitle)
        .append($questionContentBody);
    $question.append($range)
        .attr("id", High.newQuestion.IDCreator.question(id));
    return $question;
}
High.newQuestion.trueFalse = function (id) {
    var $question = $("<div class='survey-one-question'></div>");
    var $range = $("<div class='question-type-true-false'></div>");
    var $questionContentTitle = High.newQuestion.newContentTitle(id);
    var $questionContentBody = $("<div class='question-content-body'></div>");
    $questionContentBody.append(High.newQuestion.newTrueFalseControl(id));
    $range.append($questionContentTitle)
        .append($questionContentBody);
    $question.append($range)
        .attr("id", High.newQuestion.IDCreator.question(id));
    return $question;
}
High.newQuestion.sort = function (id) {
    var $question = $("<div class='survey-one-question'></div>");
    var $sort = $("<div class='question-type-sort'></div>");
    var $questionContentTitle = High.newQuestion.newContentTitle(id);
    var $questionContentBody = $("<div class='question-content-body'></div>");
    $questionContentBody.append(High.newQuestion.newSortItem(id, 1))
        .append(High.newQuestion.newSortItem(id, 2))
        .append(High.newQuestion.newPlusButton(id, function () {
            High.newQuestion.addSortItemHandler(id);
        }));
    $sort.append($questionContentTitle)
        .append($questionContentBody);
    $question.append($sort)
        .attr("id", High.newQuestion.IDCreator.question(id));
    return $question;
}
High.newQuestion.text = function (id) {
    var $question = $("<div class='survey-one-question'></div>");
    var $range = $("<div class='question-type-text'></div>");
    var $questionContentTitle = High.newQuestion.newContentTitle(id);
    var $questionContentBody = $("<div class='question-content-body'></div>");
    $questionContentBody.append(High.newQuestion.newTextControl(id));
    $range.append($questionContentTitle)
        .append($questionContentBody);
    $question.append($range)
        .attr("id", High.newQuestion.IDCreator.question(id));
    return $question;
}
High.newQuestion.questionMoveUpHandler = function (questionId) {
    var order = High.getQuestionOrder(questionId);
    if (order <= 1)return;
    var $thisQuestion = High.paper.questionTable[questionId].question;
    var maxId = High.paper.questionNextId;
    var nextOrderId = 0;
    for (var i = 1; i < maxId; i++) {
        if (High.paper.questionTable[i]) {
            if (High.getQuestionOrder(i) == order - 1) {
                nextOrderId = i;
                break;
            }
        }
    }
    $thisQuestion.fadeOut()
        .detach()
        .insertBefore(High.paper.questionTable[nextOrderId].question)
        .fadeIn();
    High.setQuestionOrder(questionId, false);
    High.setQuestionOrder(nextOrderId, true);
}
High.newQuestion.questionMoveDownHandler = function (questionId) {
    var order = High.getQuestionOrder(questionId);
    if (order >= High.paper.questionCount)return;
    var $thisQuestion = High.paper.questionTable[questionId].question;
    var maxId = High.paper.questionNextId;
    var lastOrderId = 0;
    for (var i = maxId - 1; i > 0; i--) {
        if (High.paper.questionTable[i]) {
            if (High.getQuestionOrder(i) == order + 1) {
                lastOrderId = i;
                break;
            }
        }
    }
    $thisQuestion.fadeOut()
        .detach()
        .insertAfter(High.paper.questionTable[lastOrderId].question)
        .fadeIn();
    High.setQuestionOrder(questionId, true);
    High.setQuestionOrder(lastOrderId, false);
}
High.newQuestion.questionDeleteHandler = function (questionId) {
    High.paper.questionHeadOffId = questionId;
    High.ensureDeleteQuestion();
}
High.newQuestion.addSingleSelectionOptionHandler = function (questionId) {
    var index = High.paper.questionTable[questionId].nextIndex;
    $("#" + High.newQuestion.IDCreator.buttonPlusOptionBox(questionId)).before(
        High.newQuestion.newSingleSelectionOption(questionId, index)
    );
    High.paper.questionTable[questionId].nextIndex++;
    High.paper.questionTable[questionId].listCount++;
}
High.newQuestion.addMultiSelectionOptionHandler = function (questionId) {
    var index = High.paper.questionTable[questionId].nextIndex;
    $("#" + High.newQuestion.IDCreator.buttonPlusOptionBox(questionId)).before(
        High.newQuestion.newMultiSelectionOption(questionId, index)
    );
    High.paper.questionTable[questionId].nextIndex++;
    High.paper.questionTable[questionId].listCount++;
}
High.newQuestion.addSortItemHandler = function (questionId) {
    var index = High.paper.questionTable[questionId].nextIndex;
    $("#" + High.newQuestion.IDCreator.buttonPlusOptionBox(questionId)).before(
        High.newQuestion.newSortItem(questionId, index)
    );
    High.paper.questionTable[questionId].nextIndex++;
    High.paper.questionTable[questionId].listCount++;
}
High.newQuestion.optionDeleteHandler = function (questionId, index) {
    $("#" + High.newQuestion.IDCreator.option(questionId, index)).remove();
    High.paper.questionTable[questionId].listCount--;
}
High.newQuestion.sortItemDeleteHandler = function (questionId, index) {
    $("#" + High.newQuestion.IDCreator.sortItem(questionId, index)).remove();
    High.paper.questionTable[questionId].listCount--;
}
High.newQuestion.rangeValueChangeShowHandler = function (questionId) {
    $("#" + High.newQuestion.IDCreator.rangeValue(questionId)).text(
        $("#" + High.newQuestion.IDCreator.rangeInput(questionId)).val()
    );
}
High.newQuestion.newSingleSelectionHandler = function () {
    var id = High.paper.questionNextId;
    var $question = High.newQuestion.singleSelection(id);
    High.paper.questionTable[id] = {
        type: High.questionType.SingleSelection,
        listCount: 2,
        nextIndex: 3,
        question: $question
    }
    $("#survey-questions-box").append($question);
    High.setQuestionOrder(id, High.paper.questionCount + 1);
    High.paper.questionNextId++;
    High.paper.questionCount++;
    window.location.href = "#" + High.newQuestion.IDCreator.question(id);
}
High.newQuestion.newMultiSelectionHandler = function () {
    var id = High.paper.questionNextId;
    var $question = High.newQuestion.multiSelection(id);
    High.paper.questionTable[id] = {
        type: High.questionType.MultiSelection,
        listCount: 2,
        nextIndex: 3,
        question: $question
    }
    $("#survey-questions-box").append($question);
    High.setQuestionOrder(id, High.paper.questionCount + 1);
    High.paper.questionNextId++;
    High.paper.questionCount++;
    window.location.href = "#" + High.newQuestion.IDCreator.question(id);
}
High.newQuestion.newRangeHandler = function () {
    var id = High.paper.questionNextId;
    var $question = High.newQuestion.range(id);
    High.paper.questionTable[id] = {
        type: High.questionType.Range,
        listCount: 0,
        nextIndex: 1,
        question: $question
    }
    $("#survey-questions-box").append($question);
    High.setQuestionOrder(id, High.paper.questionCount + 1);
    High.paper.questionNextId++;
    High.paper.questionCount++;
    window.location.href = "#" + High.newQuestion.IDCreator.question(id);
}
High.newQuestion.newTrueFalseHandler = function () {
    var id = High.paper.questionNextId;
    var $question = High.newQuestion.trueFalse(id);
    High.paper.questionTable[id] = {
        type: High.questionType.TrueFalse,
        listCount: 0,
        nextIndex: 1,
        question: $question
    }
    $("#survey-questions-box").append($question);
    High.setQuestionOrder(id, High.paper.questionCount + 1);
    High.paper.questionNextId++;
    High.paper.questionCount++;
    window.location.href = "#" + High.newQuestion.IDCreator.question(id);
}
High.newQuestion.newSortHandler = function () {
    var id = High.paper.questionNextId;
    var $question = High.newQuestion.sort(id);
    High.paper.questionTable[id] = {
        type: High.questionType.Sort,
        listCount: 2,
        nextIndex: 3,
        question: $question
    }
    $("#survey-questions-box").append($question);
    High.setQuestionOrder(id, High.paper.questionCount + 1);
    High.paper.questionNextId++;
    High.paper.questionCount++;
    window.location.href = "#" + High.newQuestion.IDCreator.question(id);
}
High.newQuestion.newTextHandler = function () {
    var id = High.paper.questionNextId;
    var $question = High.newQuestion.text(id);
    High.paper.questionTable[id] = {
        type: High.questionType.Text,
        listCount: 0,
        nextIndex: 1,
        question: $question
    }
    $("#survey-questions-box").append($question);
    High.setQuestionOrder(id, High.paper.questionCount + 1);
    High.paper.questionNextId++;
    High.paper.questionCount++;
    window.location.href = "#" + High.newQuestion.IDCreator.question(id);
}
High.setQuestionOrder = function (questionId, valueOrPlus) {
    var order = High.getQuestionOrder(questionId);
    if (typeof valueOrPlus == "boolean") {
        if (valueOrPlus) {
            order++;
        } else {
            order--;
        }
    } else {
        order = valueOrPlus;
    }
    High.paper.questionTable[questionId].order = order;
    $("#" + High.newQuestion.IDCreator.titleNumber(questionId)).text("Q" + order);
}
High.getQuestionOrder = function (questionId) {
    return High.paper.questionTable[questionId].order;
}
High.ensureDeleteQuestion = function () {
    $("#delete-question-warning-modal").modal("show");
}
High.deleteQuestion = function () {
    var id = High.paper.questionHeadOffId;
    if (id == 0) return;
    var order = High.getQuestionOrder(id);
    var maxId = High.paper.questionNextId;
    $("#" + High.newQuestion.IDCreator.question(id)).fadeOut()
        .remove();
    High.paper.questionTable[id] = null;
    for (var i = 1; i < maxId; i++) {
        if (High.paper.questionTable[i]) {
            if (High.getQuestionOrder(i) > order) {
                High.setQuestionOrder(i, false);
            }
        }
    }
    High.paper.questionHeadOffId = 0;
    High.paper.questionCount--;
}
High.parseQuestion = {};
High.parseQuestion.withItemList = function (id) {
    var question = {};
    var itemCount = High.paper.questionTable[id].listCount;
    var maxIndex = High.paper.questionTable[id].nextIndex;
    var inputTextId = null;
    question.title = $("#" + High.newQuestion.IDCreator.titleInput(id)).val();
    question.type = High.paper.questionTable[id].type;
    question.order = High.getQuestionOrder(id);
    question.itemCount = itemCount;
    question.itemList = [];
    if (question.type == High.questionType.Sort) {
        inputTextId = High.newQuestion.IDCreator.sortItemTextBox;
    } else {
        inputTextId = High.newQuestion.IDCreator.optionTextBox;
    }
    for (var i = 0, j = 1; j < maxIndex; j++) {
        var $input = $("#" + inputTextId(id, j));
        if ($input.length > 0) {
            question.itemList[i] = $input.val();
            i++;
        }
    }
    return question;
}
High.parseQuestion.onlyTitle = function (id) {
    var question = {};
    question.title = $("#" + High.newQuestion.IDCreator.titleInput(id)).val();
    question.type = High.paper.questionTable[id].type;
    question.order = High.getQuestionOrder(id);
    return question;
}
High.parseQuestion.parse = function (id) {
    var type = High.paper.questionTable[id].type;
    var parser = null;
    if (type == High.questionType.TrueFalse || type == High.questionType.Text || type == High.questionType.Range) {
        parser = High.parseQuestion.onlyTitle;
    } else {
        parser = High.parseQuestion.withItemList;
    }
    return parser(id);
}
High.parsePaper = function () {
    var paper = {};
    var maxId = High.paper.questionNextId;
    paper.title = $("#paper-title-input").val();
    paper.summary = $("#paper-summary-input").val();
    paper.welcomeSentence = $("#paper-welcome-sentence-input").val();
    paper.thanksSentence = $("#paper-thanks-sentence-input").val();
    paper.questionTable = [];
    for (var i = 1; i < maxId; i++) {
        if (High.paper.questionTable[i]) {
            paper.questionTable[High.getQuestionOrder(i)-1] = High.parseQuestion.parse(i);
        }
    }
    return paper;
}