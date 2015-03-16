/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 24/04/14
 * Time: 18:05
 * To change this template use File | Settings | File Templates.
 */

var High = High || {};
High.signUpValid = 0;
$(function () {
    var $inputEamil = $("#inputEmail");
    var $inputPassword1 = $("#inputPassword1");
    var $inputPassword2 = $("#inputPassword2");
    var $emailCaution = $("#email-caution");
    var $password1Caution = $("#password-caution");
    var $password2Caution = $("#second-password-caution");
    var $protocolCaution = $("#protocol-caution");
    var $buttonAgree = $("#buttonAgree");
    var $checkAgree = $("#checkAgree");
    var $buttonSubmit = $("#buttonSubmit");
    var $modalProtocol = $("#service-protocol-modal");
    var $signUpForm = $("#signup-form");

    $inputEamil.blur(function () {
        var emailText = $inputEamil.val();
        if (/(.+)@(.+)\.(.+)/.test(emailText)) {
            $.getJSON("/survey/search/CheckEmail", {email: emailText}, function (result) {
                if (result.emailExist) {
                    $emailCaution.text("邮箱已经被注册.");
                    $emailCaution.removeClass("invisible");
                    High.signUpValid &= 6;
                } else {
                    $emailCaution.text(" ");
                    $emailCaution.append("<span class='glyphicon glyphicon-ok-circle text-success'></span>");
                    $emailCaution.removeClass("invisible");
                    High.signUpValid |= 1;
                }
            });
        } else {
            $emailCaution.text("邮箱格式不正确.");
            $emailCaution.removeClass("invisible");
            High.signUpValid &= 6;
        }
    });
    $inputEamil.focus(function () {
        $emailCaution.addClass("invisible");
    });

    $inputPassword1.blur(function () {
        var password1Text = $inputPassword1.val();
        if (password1Text.length < 6 || password1Text.length > 20) {
            $password1Caution.text("密码长度最少6位，最多20位.");
            $password1Caution.removeClass("invisible");
            High.signUpValid &= 5;
        } else if (/[^0-9a-z]/i.test(password1Text)) {
            $password1Caution.text("密码不能包含字母数字外特殊字符.");
            $password1Caution.removeClass("invisible");
            High.signUpValid &= 5;
        }else{
            $password1Caution.text(" ");
            $password1Caution.append("<span class='glyphicon glyphicon-ok-circle text-success'></span>");
            $password1Caution.removeClass("invisible");
            High.signUpValid |= 2;
        }
    });
    $inputPassword1.focus(function () {
        $password1Caution.addClass("invisible");
    });
    $inputPassword2.blur(function () {
        var password2Text = $inputPassword2.val();
        var password1Text = $inputPassword1.val();
        if(password2Text == password1Text){
            $password2Caution.text(" ");
            $password2Caution.append("<span class='glyphicon glyphicon-ok-circle text-success'></span>");
            $password2Caution.removeClass("invisible");
            High.signUpValid |= 4;
        }else{
            $password2Caution.text("两次输入密码不一致.");
            $password2Caution.removeClass("invisible");
            High.signUpValid &= 3;
        }
    });
    $inputPassword2.focus(function () {
        $password2Caution.addClass("invisible");
    });

    $buttonAgree.bind("click", function () {
        $checkAgree.prop("checked", true);
        $modalProtocol.modal("hide");
        $buttonSubmit.prop("disabled", false);
        $protocolCaution.addClass("invisible");
    });
    $checkAgree.bind("click",function () {
        if ($checkAgree.prop("checked")) {
            $protocolCaution.addClass("invisible");
        } else {
            $protocolCaution.removeClass("invisible");
        }
        $buttonSubmit.prop("disabled",
            !$checkAgree.prop("checked"));

    }).prop("checked", true);
    $buttonSubmit.prop("disabled", false);
    $signUpForm.submit(function(event){
        if(High.signUpValid < 7){
            event.preventDefault();
        }
    });
});