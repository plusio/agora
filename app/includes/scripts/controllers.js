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

$app.controller('questionsController', function($scope, plus){

});

$app.controller('newQuestion', function($scope, plus){
	$scope.question = {};
	$scope.save = function(){	
		$scope.question.time = new Date().getTime().toString();
		plus.add('questions', $scope.question).then(function(){
			$scope.$navigate.go('/questions', 'slide', true);
		});
	}
});

$app.controller('answerQuestion', function($scope, $routeParams, plus){
	console.log('question');

	plus.get('questions', $routeParams.id).then(function(data){
		console.log(data);
		$scope.question = data;
	});

	$scope.answer = function(answer){
		plus.add('answers', {
			questionId : $routeParams.id,
			time : new Date().getTime().toString(),
			response : answer
		}).then(function(){
			$scope.$navigate.go('/questions', 'slide', true);
		});
	}
});
