/*! PersonListController.js © yamoo9.net, 2016 */
'use strict';

var app = angular.module('PersonListApp');

app.controller('PersonListController', ['$scope', '$http', function($scope, $http){

    // 모델(데이터) 초기 값 설정
    $scope.persons = [];
    // $scope.selectedIndex 속성의 초기값 설정
    $scope.selectedIndex = null;
    // $scope.selectedPerson 속성의 초기값 설정
    $scope.selectedPerson = null;
    // 사용자가 검색하는 이름/메일을 포함하는 객체 초기 설정
    $scope.search = '';
    // 정렬(order) 초기값 설정
    $scope.order = 'name';

    // Ajax를 사용하여 모델 데이터 로드
    $http
      .get('../data/persons.json')
      .then(function successProcess(response) {
        $scope.persons = response.data.results; // [{}, {}, {}]
      }, function errorProcess(response) {
        console.error('데이터 로드에 실패했습니다.');
      });

    // 오더 설정 메소드
    $scope.setOrder = function(value) {
      $scope.order = value;
    };

    // 메소드의 역할: $scope.selectedIndex 속성 값을
    // 사용자가 클릭한 <tr>의 인덱스($index) 값으로 설정
    $scope.selectPerson = function(idx, person) {
      $scope.selectedIndex = idx;
      $scope.selectedPerson = person;
      // console.log($scope.selectedPerson.name.first);
    };

    $scope.sensitiveSearch = function(person) {
      // 초기 로드할 때는 거짓이 나오도록 설정
      if ( $scope.search ) {
        return person.name.first.indexOf($scope.search) === 0 ||
               person.name.last.indexOf($scope.search) === 0 ||
               person.gender.indexOf($scope.search) === 0 ||
               person.email.indexOf($scope.search) === 0;
      }
      // 처음 로드할 때는 모든 조건이 참.
      return true;
    };

  }]);