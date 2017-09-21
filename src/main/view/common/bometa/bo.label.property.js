'use strict';

huoyun.factory("BoLabelOption", ["BoService", function(BoService) {

  function BoLabelOption(prop) {
    if (prop.type !== "BoLabel") {
      throw new Error("Property type isn't BoLabel");
    }
    this.searchVisibility = true;
    this.valueField = prop.additionInfo.idField;
    this.labelField = prop.additionInfo.labelField;
    this.boName = prop.additionInfo.boName;
    this.boNamespace = prop.additionInfo.boNamespace;
  }

  BoLabelOption.prototype.setDataSource = function(result) {
    this.loadVisibility = !result.last;
    return result.content;
  };

  BoLabelOption.prototype.getDataSource = function() {
    var that = this;
    return BoService.query(this.boNamespace, this.boName)
      .then(function(result) {
        return that.setDataSource(result);
      });
  };

  BoLabelOption.prototype.search = function(searchText) {
    var that = this;
    return BoService.query(this.boNamespace, this.boName, 0, this.getSearchExpr(searchText))
      .then(function(result) {
        return that.setDataSource(result);
      });
  };

  BoLabelOption.prototype.loadMore = function(pageIndex, searchText) {
    var that = this;
    return BoService.query(this.boNamespace, this.boName, pageIndex, this.getSearchExpr(searchText))
      .then(function(result) {
        return that.setDataSource(result);
      });
  };

  BoLabelOption.prototype.getSearchExpr = function(searchText) {
    if (searchText) {
      return `${this.labelField} like '${searchText}'`;
    }
  };


  return BoLabelOption;

}]);