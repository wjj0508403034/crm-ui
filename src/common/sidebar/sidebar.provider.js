'use strict';

huoyunWidget.provider("SideBar", function() {
  function MenuGroup(options) {
    Object.keys(options).forEach(function(key) {
      this[key] = options[key];
    }.bind(this));

    this.items = [];
  }

  MenuGroup.prototype.setScope = function($scope) {
    this.$scope = $scope;
    (this.items || []).forEach(function(item) {
      item.setScope($scope);
    });
  };

  MenuGroup.prototype.addItemAtIndex = function(item, index) {
    if (!Array.isArray(this.items)) {
      this.items = [];
    }
    this.items.splice(index, 0, item);
  };

  MenuGroup.prototype.addItemAtLastIndex = function(item, index) {
    if (!Array.isArray(this.items)) {
      this.items = [];
    }
    this.items.splice(this.items.length - index, 0, item);
  };

  MenuGroup.prototype.addItem = function(item) {
    if (!Array.isArray(this.items)) {
      this.items = [];
    }
    this.items.push(item);
  };

  function MenuItem(options) {
    Object.keys(options).forEach(function(key) {
      this[key] = options[key];
    }.bind(this));
  }

  MenuItem.prototype.setScope = function($scope) {
    this.$scope = $scope;
  };

  function NewMenuGroup(group) {
    var menuGroup = new MenuGroup({
      name: group.name,
      icon: group.icon,
      label: group.label,
      active: group.active,
      stateLink: group.stateLink
    });

    if (Array.isArray(group.items)) {
      group.items.forEach(function(groupItem) {
        menuGroup.addItem(NewGroupItem(groupItem))
      });
    }

    return menuGroup;
  }

  function NewGroupItem(groupItem) {
    return new MenuItem({
      name: groupItem.stateLink,
      icon: groupItem.icon,
      label: groupItem.label,
      stateLink: groupItem.stateLink,
      visibility: groupItem.visibility
    });
  }

  const GroupList = [];

  this.addGroups = function(groups) {
    if (Array.isArray(groups)) {
      groups.forEach(function(group) {
        GroupList.push(NewMenuGroup(group));
      });
    }
  };

  this.addMenuItemAtIndex = function(groupName, menuItem, index) {
    var newGroupItem = NewGroupItem(menuItem);
    GroupList.forEach(function(group) {
      if (group.name === groupName) {
        group.addItemAtIndex(newGroupItem, index);
      }
    });
  };

  this.addMenuItemAtLastIndex = function(groupName, menuItem, index) {
    var newGroupItem = NewGroupItem(menuItem);
    GroupList.forEach(function(group) {
      if (group.name === groupName) {
        group.addItemAtLastIndex(newGroupItem, index);
      }
    });
  };

  this.setMenuItemVisibility = function(name, visibility) {
    GroupList.forEach(function(group) {
      (group.items || []).forEach(function(groupItem) {
        if (groupItem.name === name) {
          groupItem.visibility = visibility;
        }
      });
    });
  };

  this.setMenuItemsVisibility = function(visibility) {
    GroupList.forEach(function(group) {
      (group.items || []).forEach(function(groupItem) {
        groupItem.visibility = visibility;
      });
    });
  };

  this.getGroups = function() {
    return GroupList;
  };

  this.$get = function() {
    return this;
  };
});