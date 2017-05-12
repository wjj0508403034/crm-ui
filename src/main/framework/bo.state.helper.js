'use strict';

huoyun.BoState = function(name) {
  return {
    Root: name,
    List: `${name}.list`,
    Detail: `${name}.detail`,
    Create: `${name}.create`,
    Edit: `${name}.edit`
  };
};