'use strict';

huoyun.factory("BoDataHelper", [function() {

  function validatorSection(boData, section) {
    var promiseArray = [];
    section.properties.forEach(function(propMetadata, index) {
      var propMetadata = section.properties[index];
      var propData = boData[propMetadata.name];
      promiseArray.push(validatorProp(propData, propMetadata));
    });

    return Promise.all(promiseArray);
  }

  function validatorProp(propData, propMetadata) {
    return new Promise(function(reslove, reject) {
      console.log(`Start validaror property ${propMetadata.name}`);
      if (propMetadata.mandatory && propMetadata.visibility !== false) {
        var res = {
          propData: propData,
          propMetadata: propMetadata,
          errorMessage: "该字段不能为空。"
        };

        if (propData === null || propData === undefined) {
          console.warn(`Validator property ${propMetadata.name} failed.`);
          reject(res);
          return;
        }

        if (typeof propData === "string" && propData.trim() === "") {
          console.warn(`Validator property ${propMetadata.name} failed.`);
          reject(res);
          return;
        }
      }

      console.log(`Validator property ${propMetadata.name} successfully.`);
      reslove();
    });
  }

  return {
    validator: function(boData, boMetadata) {
      var promiseArray = [];
      boMetadata.sections.forEach(function(section, index) {
        promiseArray.push(validatorSection(boData, section));
      });

      return Promise.all(promiseArray);
    }
  };
}]);