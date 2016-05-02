angular.module('app', ['onsen','ngCordova'])

.controller('AppController', function ($scope,$http,$rootScope) {

    var date = new Date();
    console.log(date);

    var userID;
    $scope.user = {};

    $scope.doSomething = function (id) {

        var date1Contact = new Date();

        $rootScope.myTabbar.loadPage("test.html");
        userID = id;

        $http({
            method: 'GET',
            url: 'http://phpapialex.azurewebsites.net/getContact.php',
            params:{id:id}
        }).then(function successCallback(response) {

            var date2Contact = new Date();
            $scope.user = response.data[0];


            var testContact = date2Contact.getTime()-date1Contact.getTime();
            var secondsDifferenceContact = testContact/1000;
            alert("get 1 Contact  : " + secondsDifferenceContact );


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

        var date2 = new Date();
        console.log(date2);
        var test = date2.getTime()-date.getTime();
        var secondsDifference = test/1000;
        alert("time 100 gebruikers: " + secondsDifference );

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
        var date1update = new Date();

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
            var date2update = new Date();
            ons.notification.alert({ message: 'Contact geupdate' });
            $scope.user = {};
            $scope.users= response.data;
            $rootScope.myTabbar.loadPage("home.html");


            var testupdate = date2update.getTime()-date1update.getTime();
            var secondsDifferenceupdate = testupdate/1000;
            alert("update gebruiker: " + secondsDifferenceupdate );

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    $scope.remove = function(){

        var date1remove = new Date();

        $http({
            method:'POST',
            url: 'http://phpapialex.azurewebsites.net/verwijderContact.php',
            data:{
                id:userID,
            },
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {

            var date2remove = new Date();
            ons.notification.alert({ message: 'contact verwijderd ' });
            //console.log(response);
            $scope.user = {};
            $scope.users = response.data;
            $rootScope.myTabbar.loadPage("home.html")

            var testremove = date2remove.getTime()-date1remove.getTime();
            var secondsDifferenceremove = testremove/1000;
            alert("verwijder gebruikers: " + secondsDifferenceremove );



        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.add = function(){
        var date1change = new Date();
        $rootScope.myTabbar.loadPage("add.html");

        var date1change = new Date();
        var testchange = date1change.getTime()-date1change.getTime();
        var secondsDifferencerechange = testchange/1000;
        alert("change page: " + secondsDifferencerechange);

    }

    $scope.save = function(){
        var date1add = new Date();
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
            var date2add = new Date();
            ons.notification.alert({ message: 'contact toegevoed ' });
            $scope.user = {};
            $scope.users = response.data;
            $rootScope.myTabbar.loadPage("home.html")

            var testadd = date2add.getTime()-date1add.getTime();
            var secondsDifferencereadd = testadd/1000;
            alert("time 100 gebruikers: " + secondsDifferencereadd);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
})

.controller('mapController', function ($scope,$cordovaGeolocation) {
   console.log("map controller");

        var date = new Date();

        $scope.loc = {};
        $scope.loc.lat ="";
        $scope.loc.long = "";

        var options = {timeout: 10000, enableHighAccuracy: true};

        $scope.getlocation = function(){
            $cordovaGeolocation.getCurrentPosition(options).then(function(position){

                var date2 = new Date();
                var test = date2.getTime()-date.getTime();
                var secondsDifference = test/1000;
                alert("laden map: " + secondsDifference );

                $scope.loc.lat = position.coords.latitude;
                $scope.loc.long = position.coords.longitude;
                $scope.$apply();

            },function(error){
                console.log("could not get date");
            });
        };



        /*var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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

            var date2 = new Date();
            var test = date2.getTime()-date.getTime();
            var secondsDifference = test/1000;
            alert("laden map: " + secondsDifference );

        });

    }, function(error){
        console.log("Could not get location");
    });*/

});