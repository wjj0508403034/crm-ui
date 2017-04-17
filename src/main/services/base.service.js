'use strict';

huoyun.factory("BaseService", function () {

  return {
    baseUrl: "http://localhost:8080/"
  };
});

huoyun.factory("HomepageService", ["$q", "$http", "BaseService", function ($q, $http, BaseService) {

  return {
    getMenus: function () {
      return new Promise(function (reslove, reject) {
        console.log(BaseService.baseUrl);
        reslove([{
          text: "ceshi",
          id: 1
        }]);
      });
    }
  };
}]);

huoyun.factory("BoService", ["$q", "$http", function ($q, $http) {

  return {
    query: function (boNamespace, boName) {
      var data = {
        "content": [{
          "customerCode": "111111",
          "customerName": "xxx",
          "contact": "1@1.com",
          "completionDate": 1489988504000,
          "housingDate": 1489988504000,
          "email": "1@1.com",
          "phone": "12345"
        }, {
          "customerCode": "111112",
          "customerName": "rrr",
          "contact": "2@1.com",
          "completionDate": 1489988504000,
          "housingDate": 1489988504000,
          "email": "2@1.com",
          "phone": "12345"
        }
        ],
        "last": false,
        "totalPages": 23,
        "totalElements": 227,
        "numberOfElements": 10,
        "sort": null,
        "first": true,
        "size": 10,
        "number": 3
      };

      return new Promise(function (reslove, reject) {
        reslove(data);
      });
    }
  };
}]);

huoyun.factory("MetadataService", ["$q", "$http", function ($q, $http) {
  return {
    getMetadata: function (boNamespace, boName) {
      var meta = {
        boName: "Customer",
        boNamespace: "com.huoyun.sbo",
        label: "客户",
        sections: [{
          label: "客户信息",
          properties: ["customerCode", "customerName", "contact", "completionDate", "housingDate", "email", "phone", "traceStatus"]
        }],
        listview: {
          properties: ["customerCode", "customerName", "contact", "completionDate", "housingDate", "email", "phone"]
        },
        properties: [{
          name: "customerCode",
          label: "客户编号",
          type: "String",
          mandatory: true,
          searchable: true
        }, {
          name: "customerName",
          label: "客户姓名",
          type: "String",
          mandatory: true,
          searchable: true
        }, {
          name: "contact",
          label: "联系方式",
          type: "String",
          mandatory: true,
          searchable: true
        }, {
          name: "completionDate",
          label: "交房时间",
          type: "Date",
          mandatory: false,
          searchable: true
        }, {
          name: "housingDate",
          label: "量房时间",
          type: "Date",
          mandatory: false
        }, {
          name: "email",
          label: "邮箱",
          type: "Email",
          mandatory: false,
          searchable: true
        }, {
          name: "phone",
          label: "手机",
          type: "Phone",
          mandatory: false
        }, {
          name: "traceStatus",
          label: "跟踪状态",
          type: "String",
          mandatory: true,
          searchable: true,
          validvalues: [{
            name: "solutionStage",
            label: "方案阶段"
          }, {
            name: "reviewStage",
            label: "综述阶段"
          }]
        }
        ]
      };

      return new Promise(function (reslove, reject) {
        reslove(meta);
      });
    }
  };
}]);