var carApp = angular.module('DemoApp', []);

carApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/viewCars', {
                    templateUrl: 'templates/viewcars.html',
                    controller: 'CarController'
                }).
                when('/editCars', {
                    templateUrl: 'templates/editcars.html',
                    controller: 'EditController'
                }).
                otherwise({
                    redirectTo: '/viewCars'
                });
    }]);

carApp.factory('CarFactory',  function () {
    var cars = [
        {id: 1, year: 2014, registered: new Date(1999, 3, 15), make: 'Mclaren', model: 'p1', description: 'ac, abs, moon', price: 10000}
        , {id: 2, year: 2014, registered: new Date(1996, 3, 12), make: 'Mclaren', model: '650sLT', description: 'ac, abs, moon', price: 8000}
        , {id: 3, year: 2013, registered: new Date(199, 12, 22), make: 'Porsche', model: '918 Spider', description: 'ac, abs, moon', price: 9000}
        , {id: 4, year: 2013, registered: new Date(2002, 3, 15), make: 'Porsche', model: '911 GT3', description: 'ac, abs, moon', price: 6500}];
    var nextId = 5;
    var getCars = function () {
        return cars;
    };
    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };
    var addEditCar = function (newcar) {
        alert('New car id is ' + newcar.id);
        
        if (newcar.id === undefined) {
            newcar.id = nextId++;
            cars.push(newcar);
            alert('added');
        }
        else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    alert('added');
                    break;
                }
            }
        }
    };
    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar
    };
});

carApp.controller('CarController', ['$scope', "CarFactory", function ($scope, CarFactory) {
    var cars = CarFactory.getCars();

    $scope.cars = cars;
    $scope.title = "Cars Demo App";
    $scope.predicate = "year";
    $scope.nextId = 5;
}]);

carApp.controller('EditController', ['$scope', "CarFactory", function ($scope, CarFactory) {
        var cars = CarFactory.getCars();

        $scope.cars = cars;
        $scope.title = "Cars Demo App";
        $scope.predicate = "year";
        $scope.nextId = 5;

        $scope.saveCar = function () {
            CarFactory.addEditCar($scope.newcar);
            $scope.newcar = {};
        };

        $scope.deleteCar = function (id) {
            CarFactory.deleteCar(id);
        };

        $scope.editCar = function (id) {
            CarFactory.addEditCar($scope.newcar);
            $scope.newcar = {};
        };
    }]);


