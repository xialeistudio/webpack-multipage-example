const $ = require('zepto');
require('normalize.css');
require('../common/style.less');
require('./style.less');

$('#home').on('click', function () {
    alert('点击了home按钮');
});