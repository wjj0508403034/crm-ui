'use strict';

huoyunWidget.provider("PermissionControl", function() {

  function PermissionGroup(options) {
    this.name = options.name;
    this.label = options.label;
    this.items = [];
  }

  PermissionGroup.prototype.addItem = function(item) {
    this.items.push(item);
  };

  PermissionGroup.prototype.findItems = function(itemNames) {
    var items = [];
    this.items.forEach(function(item) {
      if (itemNames.indexOf(item.name) !== -1) {
        items.push(item);
      }
    });

    return items;
  };

  PermissionGroup.prototype.addItemAtLastIndex = function(item, index) {
    if (!Array.isArray(this.items)) {
      this.items = [];
    }
    this.items.splice(this.items.length - index, 0, item);
  }

  function PermissionGroupItem(options) {
    this.name = options.name;
    this.label = options.label;
  }

  function NewPermissionGroup(group) {
    var permissionGroup = new PermissionGroup(group);

    if (Array.isArray(group.items)) {
      group.items.forEach(function(groupItem) {
        permissionGroup.addItem(new PermissionGroupItem(groupItem));
      });
    }

    return permissionGroup;
  }

  var WhiteList = [];
  var AllowAccessStates = [];
  var StateGroups = {};

  var Groups = [];

  this.addGroups = function(groups) {
    if (Array.isArray(groups)) {
      groups.forEach(function(group) {
        Groups.push(NewPermissionGroup(group));
      });
    }
  };

  this.addGroupItemAtLastIndex = function(groupName, options, index) {
    var groupItem = new PermissionGroupItem(options);
    Groups.forEach(function(group) {
      if (group.name === groupName) {
        group.addItemAtLastIndex(groupItem, index);
      }
    });
  };

  this.getPermissionGroups = function() {
    return Groups;
  };

  this.getGroupsByItemNames = function(itemNames) {
    var groups = [];
    Groups.forEach(function(group) {
      var items = group.findItems(itemNames);
      if (items.length > 0) {
        var newGroup = angular.copy(group);
        newGroup.items = angular.copy(items);
        groups.push(newGroup);
      }
    });

    return groups;
  };

  this.setWhiteList = function(whiteList) {
    if (Array.isArray(whiteList)) {
      WhiteList = whiteList;
    }
  };

  this.setAllowAccessStates = function(states) {
    if (Array.isArray(states)) {
      AllowAccessStates = states;
    }
  };

  this.AddAllowAccessStates = function(states) {
    if (Array.isArray(states)) {
      AllowAccessStates = AllowAccessStates.concat(states);
    }
  };

  this.canAccess = function(stateName) {
    if (WhiteList.indexOf(stateName) !== -1) {
      return true;
    }

    if (AllowAccessStates.length === 0) {
      return true;
    }

    if (AllowAccessStates.indexOf(stateName) !== -1) {
      return true;
    }

    return false;
  };

  this.$get = function() {
    return this;
  };
});