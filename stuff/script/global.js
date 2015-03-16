/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 23/04/14
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
var High = High || {};
High.questionType = {};
High.questionType.SingleSelection = 1;
High.questionType.MultiSelection = 2;
High.questionType.Range = 3;
High.questionType.TrueFalse = 4;
High.questionType.Sort = 5;
High.questionType.Text = 6;
High.newGlyphIconButton = function (id, textStyle, glyphStyleName, clickFunc) {
    var $button = $("<button class='btn btn-default'></button>");
    var $span = $("<span></span>");
    $span.addClass("text-" + textStyle)
        .addClass("glyphicon")
        .addClass("glyphicon-" + glyphStyleName);
    $button.append($span)
        .attr("id", "" + id)
        .click(clickFunc);
    return $button;
}
High.writeGlobalUserCookie = function (key, value) {
    $.cookie(key, value, {
        expires: 7,
        path: '/survey'
    });
}
High.clearGlobalUserCookie = function (key) {
    $.cookie(key, null, {
        path: '/survey'
    });
}
High.userSignedIn = function () {
    return $.cookie("user-sign-state") == "on";
}
High.getUserSignState = function () {
    return $.cookie("user-sign-state");
}
High.setUserSignState = function (state) {
    High.writeGlobalUserCookie("user-sign-state", state);
}
High.getGlobalUserInfo = function (key) {
    return $.cookie("user-" + key);
}
High.setGlobalUserInfo = function (userinfo) {
    High.writeGlobalUserCookie("user-id", userinfo.id);
    High.writeGlobalUserCookie("user-name", userinfo.name);
    High.writeGlobalUserCookie("user-email", userinfo.email);
    High.writeGlobalUserCookie("user-address", userinfo.address);
    High.writeGlobalUserCookie("user-telephone", userinfo.telephone);
    High.writeGlobalUserCookie("user-authorityLevel", userinfo.authorityLevel);
    High.writeGlobalUserCookie("user-accountBalance", userinfo.accountBalance);
    High.writeGlobalUserCookie("user-registeredDate", userinfo.registeredDate.year + "-" + userinfo.registeredDate.manth + "-" + userinfo.registeredDate.day);
}
High.clearGlobalUserInfo = function () {
    High.clearGlobalUserCookie("user-id");
    High.clearGlobalUserCookie("user-name");
    High.clearGlobalUserCookie("user-email");
    High.clearGlobalUserCookie("user-address");
    High.clearGlobalUserCookie("user-telephone");
    High.clearGlobalUserCookie("user-authorityLevel");
    High.clearGlobalUserCookie("user-accountBalance");
    High.clearGlobalUserCookie("user-registeredDate");
    High.clearGlobalUserCookie("user-sign-state");
}
High.initialUpDownEventHandler = function (panelName) {
    $("#" + panelName + "-panel")
        .on("hidden.bs.collapse",function () {
            $("a#" + panelName + "-up-down span")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down");
        }).on("shown.bs.collapse", function () {
            $("a#" + panelName + "-up-down span")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up");
        });
}
High.URLParameter = {};
High.parseURLParameter = function () {
    var searchString = decodeURI(location.search);
    var paramStrArray = searchString.split(/[?&]/);
    var paramCount = paramStrArray.length;
    for (var i = 0; i < paramCount; i++) {
        var paramKeyValuePair = paramStrArray[i].split("=");
        if (paramKeyValuePair.length == 2) {
            High.URLParameter[paramKeyValuePair[0]] = paramKeyValuePair[1];
        }
    }
}


$(function () {
    var $myHeader = $('#my-header');
    var $myFooter = $('#my-footer');
    if ($myHeader.data('headerType') == "sign-header") {
        $myHeader.load("/survey/include/my-sign-header.html");
    } else {
        $myHeader.load("/survey/include/my-header.html", function () {
            var $userSignState = High.getUserSignState();
            var $username = High.getGlobalUserInfo("name");
            if ($username && ($userSignState == "on")) {
                $('#user-sign-in-form').addClass("hidden");
                $('#username-link').text($username);
            } else {
                $('#user-info-nav').addClass("hidden");
            }
            $('#sign-out').click(function () {
                High.clearGlobalUserInfo();
                window.location.href = "/survey";
            });
            $("#user-sign-in-form").submit(function (event) {
                var emailText = $("#user-sign-in-email").val();
                var passwordText = $("#user-sign-in-password").val();
                $.getJSON("/survey/search/CheckUser", {email: emailText, password: passwordText}, function (user) {
                    if (user.id > 0) {
                        High.setGlobalUserInfo(user);
                        High.setUserSignState("on");
                        $('#user-sign-in-form').addClass("hidden");
                        $('#username-link').text(user.name);
                        $('#user-info-nav').removeClass("hidden");
                    } else {
                        if (user.id == -1) {
                            High.setUserSignState("wrong-password");
                        } else if (user.id == -2) {
                            High.setUserSignState("user-no-found");
                        }
                        window.location.href = "/survey/user/signin";
                    }
                });
                event.preventDefault();
            });
        });
    }
    $myFooter.load("/survey/include/my-footer.html");
    $("a[href='#']").click(function (event) {
        event.preventDefault();
    });
    High.parseURLParameter();
});


