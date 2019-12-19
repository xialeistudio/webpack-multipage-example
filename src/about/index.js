const $ = require('zepto');
require('normalize.css');
require('../common/style.less');
require('./style.less');

$('#about').on('click', function () {
    alert('点击了about按钮');
});