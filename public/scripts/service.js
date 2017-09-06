angular.module('ekaChallenge')
.constant("baseURL", "http://localhost:3000/")
.factory ('ekaFactory', ['$resource', 'baseURL', '$http', function($resource, baseURL, $http ) {
console.log("Inside ekaFactory");

var ekafac = {};

ekafac.pushForm1Data = function(feedback) {
    console.log("Pushing data from Form1");
    console.log("username: "+feedback.userName);
    console.log("password: "+feedback.password);
    console.log("email: "+feedback.email);
    $http({
    method: 'POST',
    url: baseURL+'api/v1/form1',
    data: feedback
    })
};

ekafac.pushForm2Data = function(feedback) {
    console.log("Pushing data from Form2");
    console.log("firstName: "+feedback.firstName);
    console.log("lastName: "+feedback.lastName);
    console.log("phone: "+feedback.phone);
    console.log("userName: "+feedback.userName);
    $http({
    method: 'POST',
    url: baseURL+'api/v1/form2',
    data: feedback
    })
};
   
ekafac.pushForm3Data = function(feedback) {
    console.log("Pushing data from Form2");
    console.log("firstName: "+feedback.address);
    console.log("lastName: "+feedback.city);
    console.log("phone: "+feedback.state);
    console.log("phone: "+feedback.zip);
    console.log("userName: "+feedback.userName);
    $http({
    method: 'POST',
    url: baseURL+'api/v1/form3',
    data: feedback
    })
};
    
return ekafac;
}]);
