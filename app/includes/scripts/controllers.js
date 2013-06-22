'use strict';

$app.controller('homeController', function ($scope, $rootScope, auth) {
	$rootScope.logout = function(){
		auth.logout();
		$scope.$navigate.go('/', 'none');
	}
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

$app.controller('singleQuestion', function($scope, $routeParams, plus, auth){
	var isNew = false;
	if($routeParams.id == 'new') isNew = true;

	$scope.auth = auth.get();

	$scope.save = function(){
		if(isNew){
			$scope.question.time = new Date().getTime().toString();
		}
		plus.add('questions', $scope.question);
	}
});
