// Experiment 9: Hello Angular
// Concepts: Module, Controller, $scope, $interval, Expressions
var app = angular.module('helloApp', []);
app.controller('HelloCtrl', ['$scope', '$interval', function($sc, $iv) {
 $sc.name = '';
 $sc.time = new Date().toLocaleTimeString();
 // Function: greeting changes based on time of day
 $sc.greet = function() {
 var h = new Date().getHours();
 var n = $sc.name || 'World';
 if (h < 12) return 'Good morning, ' + n + '! ';
 if (h < 17) return 'Good afternoon, ' + n + '! ';
 return 'Good evening, ' + n + '! ';
 };
 // $interval: digest-cycle-aware timer for live clock
 var tick = $iv(function() {
 $sc.time = new Date().toLocaleTimeString();
 }, 1000);
 // Cleanup on controller destroy
 $sc.$on('$destroy', function() { $iv.cancel(tick); });
}]);
