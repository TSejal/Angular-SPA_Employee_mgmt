
var app = angular.module('myApp', ['ngRoute','angularUtils.directives.dirPagination']);
console.log("app loaded...");
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : './pages/home.html',
            controller  : 'mainController'
        })

        .when('/employees', {
            templateUrl : './pages/employee.html',
            controller  : 'empController'
        })
        
        .when('/about', {
            templateUrl : './pages/about.html',
            controller  : 'aboutController'
        });
});
console.log("after config...");
app.controller('mainController', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
    console.log("In main controller...");
});


app.controller('empController', function($scope,$http) {
    console.log("In employee controller...");

    $scope.employeess={id:'',name:'',age:'',department:'',currentEmp:''};
    $scope.employee=[];
    $scope.emps=[];
    $scope.emps=$scope.employeess;
    

    $scope.sort=function(key){
        $scope.sortKey=key;
        $scope.reverse=!$scope.reverse;
    }

    //Initialization

    function _init(){
       _getEmployee();
    }
    _init();

    //Getting data

    function _getEmployee(){
        $http.get("http://localhost:3000/employees", 
    ).then(function(response){
        console.log(response);
        $scope.employee=response.data;
        },function(response){
            console.log(response);
        })
    }

    //Add data

    $scope.addEmployee= function(){
        console.log($scope.employeess);
        $http.post("http://localhost:3000/employees/",$scope.employeess).then(function(response){
           _getEmployee();
            $scope.employeess={id:'',name:'',age:'',department:'',currentEmp:''};
            alert("Employee added successfully....");
          //  console.log("Adding into json");
        }, function(response){
            console.log(response);
        })
    }

    //edit data

    $scope.editEmployee=function(emps){
        _getEmployee();
        console.log("id : ",emps.id);
       $http.get("http://localhost:3000/employees/"+emps.id).then(function(response){
        console.log("id inside get : ",emps.id);
            $scope.emps=response.data;
            },function(response){
                console.log(response);
            })
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/employees/'+ emps.id,
            data: $scope.emps
        }).then(function(response){
            _getEmployee();
            $scope.employeess={id:'',name:'',age:'',department:'',currentEmp:''};
        },function(response){
            console.log(response);
        })

    }

    //delete data
    $scope.deleteEmployee = function(emp){
        $http.delete('http://localhost:3000/employees/'+emp.id).then(function(response){
            _getEmployee();
            alert("Employee Deleted!!!");
        },function(response){
            console.log(response);
        });
    }


    });
    

app.controller('aboutController', function($scope) {
    console.log("In about controller...");
});