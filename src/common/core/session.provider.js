'use strict';

huoyunWidget.provider("Session", function() {

  const SessionMap = {};
  const EventMap = {};

  this.get = function(name) {
    return SessionMap[name];
  };

  this.set = function(name, value) {
    var oldValue = SessionMap[name];
    SessionMap[name] = value;
    if (EventMap[name]) {
      EventMap[name].forEach(function(eventListener) {
        eventListener.apply(null, [oldValue, value, this])
      }.bind(this))
    }
  };

  this.on = function(name, eventListener) {
    if (!EventMap[name]) {
      EventMap[name] = [];
    }
    EventMap[name].push(eventListener);
  };

  this.$get = function() {
    return this;
  };
});