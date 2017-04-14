angular.module('common',[])
.directive('header',function(){
    return{
        restrict:'A',
        scope:{},
        templateUrl:'./common/header.html?ref='+new Date().getTime(),
        link:function(scope,ele,attrs){
            alert()
        }
    }
});