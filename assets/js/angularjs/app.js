angular.module('libraries', ["ngRoute", "dndLists"]);


angular.module("app", ['libraries', 'demo1', 'demo2'])
    .config(function ($routeProvider, $locationProvider) {
    	$locationProvider.hashPrefix('');
    	$routeProvider
			.when('/demo1', {
            	templateUrl: 'demo1/demo1.html',
            	controller: 'Demo1Controller'
			})
			.when('/demo2', {
				templateUrl: 'demo2/demo2.html',
				controller: 'Demo2Controller'
			})
            .otherwise({ redirectTo: '/nested' });
    })
    .directive('navigation', function ($rootScope, $location) {
    	return {
    		template: '<li ng-repeat="option in options" ng-class="{active: isActive(option)}">' +
                      '    <a ng-href="{{option.href}}">{{option.label}}</a>' +
                      '</li>',
    		link: function (scope, element, attr) {
    			scope.options = [
                    { label: "Demo 1", href: "#/demo1" },
                    { label: "Demo 2", href: "#/demo2" },
                    { label: "Github", href: "https://github.com/marceljuenemann/angular-drag-and-drop-lists" }
    			];

    			scope.isActive = function (option) {
    				return option.href.indexOf(scope.location) === 1;
    			};

    			$rootScope.$on("$locationChangeSuccess", function (event, next, current) {
    				scope.location = $location.path();
    			});
    		}
    	};
    });
