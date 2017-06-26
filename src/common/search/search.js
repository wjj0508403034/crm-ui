'use strict';

huoyunWidget.filter("InputSearchPlaceHolder", function() {
  return function(prop) {
    return prop && `请输入${prop.label}搜索...`;
  };
});

huoyunWidget.filter("PickerSearchPlaceHolder", function() {
  return function(prop) {
    return prop && `请选择${prop.label}搜索...`;
  };
});