appGeneral.controller("OwnerCtrl", function($rootScope, $window, $scope, $state, $http, $translate, notify) {
	console.log("Controller owner loaded");
	$scope.hello = "";
	var date = new Date();
	var hour = date.getHours();   
	$scope.usuario = JSON.parse($window.sessionStorage.getItem("hUsuario"));
	
	$translate('DASHBOARD.TITLE').then(function (headline) {
		$rootScope.titleHTML = headline;
	});

	$translate('GREETINGS.HI').then(function (greetings) {
		$scope.hello  = greetings;
	});

	if(hour >= 0 && hour <= 12){
	$translate('GREETINGS.MORNING').then(function (greetings) {
		$scope.hello  = greetings;
	});

	}
	if(hour > 12 && hour <= 18){
		$translate('GREETINGS.AFTERNOON').then(function (greetings) {
			$scope.hello  = greetings;
		});
	}
	if(hour > 18 && hour <= 24){
		$translate('GREETINGS.NIGHT').then(function (greetings) {
			$scope.hello  = greetings;
		});
	}

});