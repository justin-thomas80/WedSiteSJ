
var mainMod= angular.module('SandJ', ['ui.router']);

console.log("in clientapp main");


mainMod.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

    console.log("in app config");
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "assets/js/partials/home.html",
        controller:'homeCtrl'
    });

    $stateProvider.state('ceremony', {
        url: "/ceremony",
        templateUrl: "assets/js/partials/ceremony.html",
        controller:'ceremonyCtrl'
    });

    $stateProvider.state('reception', {
        url: "/reception",
        templateUrl: "assets/js/partials/reception.html",
        controller:'ceremonyCtrl'
    });

    $urlRouterProvider.otherwise('/');

}]);


mainMod.controller('homeCtrl',['$scope','$state',function($scope,$state){
    console.log("HOME CTRL");


}]);


mainMod.controller('ceremonyCtrl',['$scope','$state',function($scope,$state){
    console.log("CEREMONY CTRL");

}]);
