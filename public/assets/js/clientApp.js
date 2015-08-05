
var mainMod= angular.module('SandJ', ['ui.router','uiGmapgoogle-maps']);


mainMod.config(['$stateProvider','$urlRouterProvider','uiGmapGoogleMapApiProvider','$locationProvider',function($stateProvider,$urlRouterProvider,uiGmapGoogleMapApiProvider,$locationProvider) {
//    $locationProvider.html5Mode(true);

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

    $stateProvider.state('contact', {
        url: "/contact",
        templateUrl: "assets/js/partials/contact.html",
        controller:'contactCtrl'
    });

    $stateProvider.state('news', {
        url: "/news",
        templateUrl: "assets/js/partials/news.html",
        controller:'newsCtrl'
    });

    $stateProvider.state('gallery', {
        url: "/gallery",
        templateUrl: "assets/js/partials/gallery.html",
        controller:'galleryCtrl'
    });
    $stateProvider.state('points-of-interest', {
        url: "/points-of-interest",
        templateUrl: "assets/js/partials/points-of-interest.html",
        controller:'pointsOfInterestCtrl'
    });
    $urlRouterProvider.otherwise('/');


    uiGmapGoogleMapApiProvider.configure({

    });

}]);


mainMod.controller('baseCtrl',['$scope','$state',function($scope,$state){
    $scope.closeDrawer= function(){
        var sjDrawer = angular.element(document.getElementById("sj-drawer-container"));
        sjDrawer.removeClass("is-visible");

    };
}]);

mainMod.controller('homeCtrl',['$scope','$state',function($scope,$state){
}]);

mainMod.controller('ceremonyCtrl',['$scope','$state',function($scope,$state){

}]);

mainMod.controller('contactCtrl',['$scope','$state',function($scope,$state){
}]);

mainMod.controller('newsCtrl',['$scope','$state',function($scope,$state){
}]);

mainMod.controller('galleryCtrl',['$scope','$state',function($scope,$state){
    angular.element(document).ready(function(){
        $("#sj-gallery-container").owlCarousel({
            lazyLoad : true,
            autoPlay : false,//6000,
            stopOnHover : true,
            navigation:false,
            paginationSpeed : 1000,
            paginationNumbers:true,
            goToFirstSpeed : 2000,
            singleItem : true,
            autoHeight : true,
            transitionStyle:"fade"
        });
    });
}]);


mainMod.controller('pointsOfInterestCtrl',['$scope','$state','uiGmapGoogleMapApi',function($scope,$state,uiGmapGoogleMapApi){
    $scope.map = { center: { latitude: -32.999432, longitude: 27.9354535 }, zoom: 10 };


    $scope.gmpMarkers = [{
        id:"1",
        latitude:-32.998616,
        longitude:  27.927984,
        title:"Hoylake Inn",
        desc:"Where the Thomas Family will be staying",
        options:{title:"Hoylake Inn"},
        show:false,
        onClick:function(){console.log("Clicked!!!!!!!");this.show=!this.show}
    },{
        id:"2",
        latitude:-33.036487,
        longitude:  27.824580,
        title:"East London Airport",
        desc:"Flying in and out of here",
        options:{title:"East London Airport"},
        show:false,
        onClick:function(){console.log("Clicked!!!!!!!");this.show=!this.show}
    },{
        id:"3",
        latitude:-32.839027,
        longitude:  28.077665,
        title:"Inkwenkwezi",
        desc:"Inkwenkwezi private game reserve is <br>where the reception will take place",
        options:{title:"Inkwenkwezi Private Game Reserve"},
        show:false,
        onClick:function(){console.log("Clicked!!!!!!!");this.show=!this.show}
    },{
        id:"4",
        latitude:-32.972707,
        longitude:  27.882338,
        title:"St Marks Anglican Church",
        desc:"The church where the ceremony will take place",
        options:{title:"St Marks Anglican Church"},
        show:false,
        onClick:function(){console.log("Clicked!!!!!!!");this.show=!this.show}
    }];


    uiGmapGoogleMapApi.then(function(maps) {
        //get current location
        //update map
//        console.log("mapLoaded in controler");
    });



}]);