'use strict';

huoyunWidget.provider("PermissionControl", function() {

  var WhiteList = [];
  var AllowAccessStates = [];
  var StateGroups = {};

  this.configure = function(options) {
    StateGroups = options;
  };

  this.getStateGroups = function() {
    return StateGroups;
  };

  this.getCurrentStateGroups = function(stateNames) {
    var group = {};
    Object.keys(StateGroups).forEach(function(groupName) {
      var items = StateGroups[groupName].items;
      items.forEach(function(stateItem) {
        if (stateNames.indexOf(stateItem.name) !== -1) {
          if (!group[groupName]) {
            group[groupName] = {
              label: StateGroups[groupName].label,
              items: []
            };
          }

          group[groupName].items.push(stateItem);
        }
      });
    });

    return group;
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