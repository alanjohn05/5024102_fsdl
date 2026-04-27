// Experiment 10: Events & Validations - Student Records
// Concepts: ng-submit, ng-click, $valid, $error, $touched,
// ng-repeat, filter, orderBy, custom functions, $timeout
var app = angular.module('studentApp', []);
app.controller('StudentCtrl', ['$scope', '$timeout', function($sc, $to) {
 // State
 $sc.view = 'add';
 $sc.search = '';
 $sc.sortKey = 'name';
 $sc.sortRev = false;
 $sc.depts = ['Computer Engg', 'IT', 'Mechanical', 'Civil', 'Electronics'];
 $sc.form = { year: 1 };
 $sc.toast = { show: false, msg: '', type: '' };
 // Seed data
 $sc.students = [
 { name: 'Kavya Nair', roll: 'ME2305', email: 'kavya@college.edu',
 gpa: 8.2, dept: 'Mechanical', year: 3 },
 { name: 'Rajan Pillai', roll: 'CS2418', email: 'rajan@college.edu',
 gpa: 6.9, dept: 'Computer Engg', year: 2 },
 { name: 'Ananya Singh', roll: 'CV2207', email: 'ananya@college.edu',
 gpa: 7.4, dept: 'Civil', year: 2 },
 ];
 // EVENT: ng-click - switch view
 $sc.setView = function(v) { $sc.view = v; };
 // EVENT: ng-submit - add student (checks $valid from HTML validators)
 $sc.addStudent = function(form) {
 if (!form.$valid) return;
 // Duplicate roll number check
 var dup = $sc.students.some(function(s) {
 return s.roll.toLowerCase() === $sc.form.roll.toLowerCase();
 });
 if (dup) { $sc.notify('Roll number already exists!', 'terr'); return; }
 $sc.students.push(angular.copy($sc.form));
 $sc.notify('Student added successfully ✓', 'tok');
 $sc.resetForm(form);
 $sc.view = 'list';
 };
 // EVENT: ng-click - delete by object reference
 $sc.del = function(student) {
 var i = $sc.students.indexOf(student);
 if (i > -1) { $sc.students.splice(i, 1); $sc.notify('Record deleted.', 'terr'); }
 };
 // EVENT: ng-click - sort columns
 $sc.sortBy = function(key) {
 $sc.sortRev = ($sc.sortKey === key) ? !$sc.sortRev : false;
 $sc.sortKey = key;
 };
 // Reset form + Angular validation states
 $sc.resetForm = function(form) {
 $sc.form = { year: 1 };
 if (form) { form.$setPristine(); form.$setUntouched(); }
 };
 // FUNCTION: average GPA
 $sc.avgGpa = function() {
   if (!$sc.students.length) return '--';
 var sum = $sc.students.reduce(function(a, s) {
 return a + parseFloat(s.gpa);
 }, 0);
 return (sum / $sc.students.length).toFixed(2);
 };
 // FUNCTION: letter grade
 $sc.lg = function(gpa) {
 if (gpa >= 9) return 'O';
 if (gpa >= 8) return 'A+';
 if (gpa >= 7) return 'A';
 if (gpa >= 6) return 'B+';
 if (gpa >= 5) return 'B';
 return 'F';
 };
 // FUNCTION: CSS class for grade colour
 $sc.gc = function(gpa) {
 if (gpa >= 8) return 'gh';
 if (gpa >= 6) return 'gm';
 if (gpa >= 5) return 'gl';
 return 'gf';
 };
 // Toast notification - auto hides via $timeout
 $sc.notify = function(msg, type) {
 $sc.toast = { show: true, msg: msg, type: type };
 $to(function() { $sc.toast.show = false; }, 2800);
 };
}]);
