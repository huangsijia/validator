
$(function () {// 验证
    'use strict'
    // 选中页面中所有的input[data-rule]
    var $inputs = $("[data-rule]");
    var inputs = [];
    var $form = $("#form");
    $inputs.each(function (index, node) {
        // 解析每一个input验证规则
        var tmp = new Input(node);
        inputs.push(tmp);
    })
    $form.on('submit', function (e) {
        e.preventDefault();
        $inputs.trigger("blur");
        for (var i = 0; i < inputs.length; i++) {
            var item = inputs[i];
            var r = item.validator.is_valid();
            if (!r) {
                alert("没有成功")
                return;
            }
        }
        signup();
        alert("成功")
    })
    function signup() {
        // $.post('/api/signup',{...})
    }
    // 验证
})