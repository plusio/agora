'use strict';

$app.controller('logoutController', function($scope, auth){
	auth.logout();
	$scope.$navigate.go('/', 'slide', true);
});

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

$app.controller('newQuestion', function($scope, plus, auth){
	if(!auth.isLoggedIn()) $scope.$navigate.go('/', 'none');

	$scope.question = {};
	$scope.save = function(){	
		$scope.question.time = new Date().getTime().toString();
		plus.add('questions', $scope.question).then(function(){
			$scope.$navigate.go('/questions', 'slide', true);
		});
	}
});

$app.controller('answerQuestion', function($scope, $routeParams, plus, auth, geolocation){
	if(!auth.isLoggedIn()) $scope.$navigate.go('/', 'none');

	$scope.question = {};
	plus.get('questions', $routeParams.id).then(function(data){
		angular.extend($scope.question, data);
	});

	var latlng = { lat : 0, lng: 0};

	geolocation.getCurrentPosition(function(pos){
		console.log(pos);
		latlng = { lat : pos.coords.latitude, lng : pos.coords.longitude}
	});

	$scope.answer = function(answer){
		console.log(latlng);
		plus.add('answers', {
			questionId : $routeParams.id,
			userId : auth.get('user_id'),
			lat : latlng.lat,
			lng : latlng.lng,
			time : new Date().getTime().toString(),
			response : answer,

		}).then(function(){
			$scope.$navigate.go('/questions', 'slide', true);
		});
	}
});
