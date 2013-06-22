'use strict';

$app.controller('homeController', function ($scope, auth) {
	goToQuestions();

	$scope.$on('authUpdated', function(){
		goToQuestions();
	});

	function goToQuestions(){
		if(auth.isLoggedIn()){
			$scope.$navigate.go('questions', 'slide');
		}
	}

	$scope.login = function(){
		auth.login();
	}
});
