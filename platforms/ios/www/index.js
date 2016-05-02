angular.module('app', ['onsen','ngCordova'])

.controller('AppController', function ($scope,$http,$rootScope) {
    ons.notification.alert({ message: 'we zijn binnen ' });

    var userID;
    $scope.user = {};

    $scope.doSomething = function (id) {
        $rootScope.myTabbar.loadPage("test.html");
        userID = id;

        $http({
            method: 'GET',
            url: 'http://phpapialex.azurewebsites.net/getContact.php',
            params:{id:id}
        }).then(function successCallback(response) {

            $scope.user = response.data[0];

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });



    };

    $http({
        method: 'GET',
        url: 'http://phpapialex.azurewebsites.net/getContacts.php'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.users = response.data;

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.goback = function(){
        //ons.notification.alert({ message: 'tapped ' });
        $scope.user = {};
        $rootScope.myTabbar.loadPage("home.html")

    }

    $scope.update= function(){
        console.log("geupdate")
        $http({
            method:'POST',
            url: 'http://phpapialex.azurewebsites.net/updateContact.php',
            data:{
                id:userID,
                first_name:$scope.user.first_name,
                last_name:$scope.user.last_name,
                email: $scope.user.email,
                gender : $scope.user.gender,
                ip_address: $scope.user.ip_address
            },
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
            $scope.user = {};
            $scope.users= response.data;
            $rootScope.myTabbar.loadPage("home.html")

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    $scope.remove = function(){
        $http({
            method:'POST',
            url: 'http://phpapialex.azurewebsites.net/verwijderContact.php',
            data:{
                id:userID,
            },
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {

            console.log("contact verwijderd");
            console.log(response);
            $scope.user = {};
            $scope.users = response.data;
            $rootScope.myTabbar.loadPage("home.html")



        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.add = function(){
        $rootScope.myTabbar.loadPage("add.html");
    }

    $scope.save = function(){
        console.log("opgeslaan");

        $http({
            method:'POST',
            url: 'http://phpapialex.azurewebsites.net/addContact.php',
            data:{
                first_name:$scope.user.first_name,
                last_name:$scope.user.last_name,
                email: $scope.user.email,
                gender : $scope.user.gender,
                ip_address: $scope.user.ip_address
            },
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {

            console.log("contact toegevoegd");
            $scope.user = {};
            $scope.users = response.data;
            $rootScope.myTabbar.loadPage("home.html")



        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
})

.controller('mapController', function ($scope,$cordovaGeolocation) {
   console.log("map controller");
    var options = {timeout: 10000, enableHighAccuracy: true};

        /*var latlng = new google.maps.LatLng(35.7042995, 139.7597564);
        var myOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), myOptions);*/

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });

            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });

        });

    }, function(error){
        console.log("Could not get location");
    });

});