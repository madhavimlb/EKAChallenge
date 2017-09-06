'use strict';

var myApp = angular.module('ekaChallenge');

myApp.run(function($rootScope) {
    $rootScope.feedback = {};
});

myApp.controller('FormController', ['$scope', 'ekaFactory', '$window', '$location', '$rootScope', function($scope, ekaFactory, $window, $location, $rootScope) {
    
    $scope.feedback = {'userName': '', 'password': '', 'email': '', 'firstName':'', 'lastName': '', 'phone': '', 'address':'', 'city':'', 'state':'', 'zip':''};
    
    $scope.username = '';
    
    $scope.validateform1 = function() {
        console.log($scope.feedback.userName);
        console.log($scope.feedback.password);
        console.log($scope.feedback.email);
        $window.localStorage.setItem('userName',$scope.feedback.userName);
        $window.localStorage.setItem('password',$scope.feedback.password);
        $window.localStorage.setItem('email',$scope.feedback.email);
        ekaFactory.pushForm1Data($scope.feedback);
        $window.open('form2.html?username='+$scope.feedback.userName,'_self');
    };
    
    $scope.loadLocalStorageForForm1 = function() {
        $scope.feedback.userName = $window.localStorage.getItem('userName');
        $scope.feedback.password = $window.localStorage.getItem('password');
        $scope.feedback.email = $window.localStorage.getItem('email');
    };
    
    $scope.loadLocalStorageForForm2 = function() {
        $scope.feedback.firstName = $window.localStorage.getItem('firstName');
        $scope.feedback.lastName = $window.localStorage.getItem('lastName');
        $scope.feedback.phone = $window.localStorage.getItem('phone');
        $scope.feedback.userName = $window.localStorage.getItem('userName');
    };
    
    $scope.getQueryParam = function() {
        console.log("Inside getQueryParam");
        $scope.feedback.userName = GetURLParameter('username'); 
        $scope.page = GetURLParameter('page');
        if ($scope.page == 'form2') {
            $scope.loadLocalStorageForForm1();
        } else if ($scope.page == 'form3') {
            $scope.loadLocalStorageForForm2();
        }
    };
    
    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                if (sParameterName[1].indexOf('%20') > 0) return sParameterName[1].replace("%20"," ");
                return sParameterName[1];
            }
        }
    }

    $scope.validateform2 = function() {
        console.log("inside validate form 2");
        console.log($scope.feedback.firstName);
        console.log($scope.feedback.lastName);
        console.log($scope.feedback.phone);
        console.log($scope.feedback.userName);
        $window.localStorage.setItem('firstName',$scope.feedback.firstName);
        $window.localStorage.setItem('lastName',$scope.feedback.lastName);
        $window.localStorage.setItem('phone',$scope.feedback.phone);
        $window.localStorage.setItem('userName',$scope.feedback.userName);
        ekaFactory.pushForm2Data($scope.feedback);
        $window.open('form3.html?username='+$scope.feedback.userName,'_self');
    };
    
    
    $scope.validateform3 = function() {
        console.log($scope.feedback.address);
        console.log($scope.feedback.city);
        console.log($scope.feedback.state);
        console.log($scope.feedback.zip);
        console.log($scope.feedback.userName);
        ekaFactory.pushForm3Data($scope.feedback);
        $window.open('index.html','_self');
    };
    
}]);


