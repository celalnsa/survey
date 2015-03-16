/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 24/05/14
 * Time: 01:50
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    if (High.URLParameter.paperId) {
        window.location.href = "/survey/paper/fillin/?paperId=" + High.URLParameter.paperId;
    }
});