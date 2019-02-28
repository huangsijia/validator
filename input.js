$(function () {
    'use strict';

    window.Input = function (selector) {
        var $ele, rule = { required: true }, me = this, $error_ele;

        function init() {
            find_ele();
            parse_rule();
            get_error_ele()
            me.load_validator();
            listen();
        }
        // 找元素
        function find_ele() {
            if (selector instanceof jQuery) {
                $ele = selector;
            } else {
                $ele = $(selector);
            }
        }
        //解析规则
        function parse_rule() {
            var rule_string = $ele.data("rule");
            if (!rule_string) return;
            var rule_arr = rule_string.split("|");
            for (var i = 0; i < rule_arr.length; i++) {
                var item_str = rule_arr[i];
                var item_arr = item_str.split(":");
                rule[item_arr[0]] = JSON.parse(item_arr[1]);
            }
        }
        // 加载验证
        this.load_validator = function () {
            var val = this.get_val();
            this.validator = new Validator(val, rule);
        }
        // 用户输入的值
        this.get_val = function () {
            return $ele.val();
        }
        //输入完调用
        function listen() {
            $ele.on("blur", function () {
                var valid = me.validator.is_valid(me.get_val());
                if (valid) {
                    $error_ele.hide();
                } else {
                    $error_ele.show();
                }
            })
        }
        // 找到报错信息
        function get_error_selector() {
            return "#" + $ele.attr('name') + "-input-error";
        }
        //显示错误
        function get_error_ele() {
            $error_ele = $(get_error_selector());
        }
        init();
    }
})