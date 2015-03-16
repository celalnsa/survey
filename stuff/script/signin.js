/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 20/05/14
 * Time: 01:17
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var $warningTitleLabel = $("#warning-title-label");
    var userSignState = High.getUserSignState();
    if (userSignState == "wrong-password") {
        $warningTitleLabel.text("密码错误");
    } else if(userSignState == "user-no-found"){
        $warningTitleLabel.text("用户名不存在");
    } else{
        $warningTitleLabel.text(" ");
    }
});