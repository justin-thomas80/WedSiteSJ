
var mainMod= angular.module('SandJ', ['ui.router','uiGmapgoogle-maps']);


mainMod.config(['$stateProvider','$urlRouterProvider','uiGmapGoogleMapApiProvider','$locationProvider',function($stateProvider,$urlRouterProvider,uiGmapGoogleMapApiProvider,$locationProvider) {
    $locationProvider.html5Mode(true);

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

    $stateProvider.state('engagement', {
        url: "/engagement",
        templateUrl: "assets/js/partials/engagement.html",
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


    $stateProvider.state('polls', {
        url: "/polls",
        templateUrl: "assets/js/partials/polls.html",
        controller:'pollsCtrl'
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

mainMod.controller('homeCtrl',['$scope','$state','$location',function($scope,$state,$location){
    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });

}]);

mainMod.controller('ceremonyCtrl',['$scope','$state','$location',function($scope,$state,$location){
    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });

}]);

mainMod.controller('contactCtrl',['$scope','$state','$location',function($scope,$state,$location){
    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });
}]);

mainMod.controller('pollsCtrl',['$scope','$state','$location','$http',function($scope,$state,$location,$http){
    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });

    $scope.questions = [];
    $scope.pollAnswersArr  = [];

    $http.get('/api/pollquestions').then(function(response){
        //console.log("success",response);
        $scope.questions = response.data;

        angular.forEach($scope.questions,function(q,index){
             $scope.pollAnswersArr[index]={
                 showQuestionContainer: true,
                 showCommentContainer:false,
                 chosenAnswer:"A1",
                 comment:""

             }
        });
    },function(error){
        console.log("error",error);
    });


    $scope.showCommentsContainer = function(cIndex,showOrHide){
        $scope.pollAnswersArr[cIndex].showCommentsContainer=showOrHide;
    };
    $scope.sendAnswers = function(QID ,qIndex){
        var pollResultsData={};
        pollResultsData.QID=QID;
        pollResultsData.A=$scope.pollAnswersArr[qIndex].chosenAnswer;
        pollResultsData.C=$scope.pollAnswersArr[qIndex].comment;


        $http.post('/api/pollResults',pollResultsData)
            .success(function(data) {
//                console.log("data returned: ", data);
//                showWeddingToast("Thanks for participating in the poll");
//                $scope.showPollFields.showPollQuestionsContainer=false;
                $scope.pollAnswersArr[qIndex].showQuestionContainer=false;
                var submittedQuestion={};
                angular.forEach($scope.questions,function(q,i){
                    if(q._id===QID){
                        submittedQuestion = q;
                    }
                });
                var graphData = accumulatePollResults(data,submittedQuestion);
                $scope.pollAnswersArr[qIndex].graphData=graphData;
//                console.log("graph data: ",graphData);
                drawChart(graphData,qIndex);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };
    function accumulatePollResults(data,q){
//        console.log("got q: ",q);
        var totals ={};
        totals["A1"]=0;
        totals["A2"]=0;
        totals["A3"]=0;
        totals["A4"]=0;
        totals["A5"]=0;
        var comments = [];
        var results={
            labels:[],
            series:[]
        };
        var series1=[];

        var maxVal=0
        $.each(data,function(index,pollResult){
//            console.log("index: +" + index + ": " +pollResult.A);
            totals[pollResult.A]++;
            if(pollResult.C){
                comments.push({comment:pollResult.C, commentDate:pollResult.resultDate});
            }

        });


        for (i = 1; i < 6; i++) {
            var answerString= "A"+i;
            if(q[answerString]!==undefined){
                results.labels.push(q[answerString]);
                results.series.push(totals[answerString]);
                //series1.push(totals[answerString]);
            }
        }

        results.comments=comments;
        return results;

    }

    function drawChart(graphData, chartIndex){
        var data = {
            // A labels array that can contain any sort of values
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            // Our series array that contains series objects or in this case series data arrays
            series: [
                [5, 2, 4, 2, 0]
            ]
        };

        var options={
            fullWidth: true,
            centerBars: false
        };

        var pieChartData={

            series: graphData.series
        }

        var sum = function(a, b) { return a + b };
        var seriesTotal = graphData.series.reduce(sum);
        var adjustedLabels = [];
        $.each(graphData.labels,function(index, labelVal){
            adjustedLabels.push(labelVal + " (" + Math.round(graphData.series[index]/seriesTotal *100) + "%)" );
        });

        pieChartData.labels = adjustedLabels;

        // new Chartist.Bar('.ct-chart', graphData,options);
        //new Chartist.Pie('.ct-chart', graphData);
        var responsiveOptions = [
            ['screen and (min-width: 240px)', {
                chartPadding: 15,
                labelOffset: 15,
                labelDirection: 'explode'
            }],
            ['screen and (min-width: 468px)', {
                chartPadding: 0,
                labelOffset: 35,
                labelDirection: 'explode'
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 35,
                chartPadding: 0,
                labelDirection: 'explode'

            }]
        ];

        new Chartist.Pie('#q-chart-'+chartIndex, pieChartData,{
        },responsiveOptions);

    };



}]);

mainMod.controller('newsCtrl',['$scope','$state','$location',function($scope,$state,$location){
    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });
}]);

mainMod.controller('galleryCtrl',['$scope','$state','$location',function($scope,$state,$location){

    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });

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
            autoHeight : true
            //transitionStyle:"fade"
        });
    });
}]);


mainMod.controller('pointsOfInterestCtrl',['$scope','$state','uiGmapGoogleMapApi','$location',function($scope,$state,uiGmapGoogleMapApi,$location){
    $scope.$on('$viewContentLoaded', function(event) {
        ga('send', 'pageview', {
            'page': $location.url()
        });
    });


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