$(function () {
    'use strict';

    window.Validator = function (val, rule) {
        // 最大值
        this.validate_max = function () {
            parseFloatFun();
            return val <= rule.max;
        }
        // 最小值
        this.validate_min = function () {
            parseFloatFun();
            return val >= rule.min;
        }
        // 最大长度
        this.validate_maxlength = function () {
            toStringFun();
            return val.length <= rule.maxlength;
        }
        // 最小长度
        this.validate_minlength = function () {
            toStringFun();
            return val.length >= rule.minlength;
        }
        //必填项目
        this.validate_required = function () {
            var real = $.trim(val);
            if (!real && real !== 0) {
                return false;
            }
            return true;
        }
        // 是否是数字
        this.validate_numeric = function () {
            return $.isNumeric(val);
        }
        // 正则验证
        this.validate_pattern = function () {
            var reg = new RegExp(rule.pattern);
            return reg.test(val)
        }

        // max,min字符串直接转成数字
        function parseFloatFun() {
            val = parseFloat(val);
        }
        // maxlength,minlength字符串直接转成数字
        function toStringFun() {
            val = val.toString();
        }
        // 检测哪个方法要被执行
        this.is_valid = function (new_val) {
            var key;
            if (new_val !== undefined)
                val = new_val;
            // 如果不是必填项，且用户未填写任何内容则直接定位合法
            if (!rule.required && !val) return true;
            for (key in rule) {
                if (key == 'required') continue;
                // 调用rule相对应的方法
                var r = this["validate_" + key]();
                if (!r) return false
            }
            return true;
        }
    }
})