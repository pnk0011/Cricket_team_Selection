var app = angular.module('app', ['ngRoute'])
app.service('commonService', function ($http) {
  var palyingEleven = [];
  var selectedPlayerCount = 0;
  var creditScoreLeft = 100;
  var selectedPlayerArr = [];
  var selectedcaption, vselecteicecaption;
  var  data;
  $http.get("http://localhost:8080/data/data.txt")
  .then(function (response) {
    data = response.data;
     })
  .catch(function (response) {

    data = [];
   

  });
  return {
    getInfo: getInfo,
    setInfo: setInfo,
    returnPlayingEleven: returnPlayingEleven,
    modifyPlayingEleven: modifyPlayingEleven,
    modifyCaption: modifyCaption,
    ModifyselectedPlayerCount: ModifyselectedPlayerCount,
    getselectedPlayerCount: getselectedPlayerCount,
    ModifycreditScoreLeft: ModifycreditScoreLeft,
    getcreditScoreLeft: getcreditScoreLeft,
    ModifyselectedPlayerArr: ModifyselectedPlayerArr,
    getselectedPlayerArr: getselectedPlayerArr,
    ModifySelectedCaption: ModifySelectedCaption,
    getSelectedCaption: getSelectedCaption
  };

  // .................

  function getInfo() {
    return data;
  }

  function modifyPlayingEleven(value) {
    var index = palyingEleven.indexOf(value);
    palyingEleven.splice(index, 1);
  }

  function modifyCaption(value) {
    var index = palyingEleven.indexOf(value);
    palyingEleven[index]
  }

  function ModifyselectedPlayerArr(value, player) {
    if (value == 'dec') {
      if (player.style == 7 || player.style == 5)
        selectedPlayerArr['WK'] = -1 + (selectedPlayerArr['WK'] == undefined ? 0 : selectedPlayerArr['WK']);
      if (player.style == 1 || player.style == 3 || player.style == 5)
        selectedPlayerArr['BAT'] = -1 + (selectedPlayerArr['BAT'] == undefined ? 0 : selectedPlayerArr['BAT']);
      if (player.style == 3 || player.style == 9 || player.style == 11)
        selectedPlayerArr['AR'] = -1 + (selectedPlayerArr['AR'] == undefined ? 0 : selectedPlayerArr['AR']);
      if (player.style == 11 || player.style == 13)
        selectedPlayerArr['BOWL'] = -1 + (selectedPlayerArr['BOWL'] == undefined ? 0 : selectedPlayerArr['BOWL']);
    }
    if (value == 'inc') {
      if (player.style == 7 || player.style == 5)
        selectedPlayerArr['WK'] = 1 + (selectedPlayerArr['WK'] == undefined ? 0 : selectedPlayerArr['WK']);
      if (player.style == 1 || player.style == 3 || player.style == 5)
        selectedPlayerArr['BAT'] = 1 + (selectedPlayerArr['BAT'] == undefined ? 0 : selectedPlayerArr['BAT']);
      if (player.style == 3 || player.style == 9 || player.style == 11)
        selectedPlayerArr['AR'] = 1 + (selectedPlayerArr['AR'] == undefined ? 0 : selectedPlayerArr['AR']);
      if (player.style == 11 || player.style == 13)
        selectedPlayerArr['BOWL'] = 1 + (selectedPlayerArr['BOWL'] == undefined ? 0 : selectedPlayerArr['BOWL']);
    }
  }

  function getselectedPlayerArr() {
    return selectedPlayerArr;
  }
  function ModifycreditScoreLeft(value, player) {
    if (value == 'dec')
      creditScoreLeft -= parseFloat(player.value);
    if (value == 'inc')
      creditScoreLeft += parseFloat(player.value);
  }

  function getcreditScoreLeft() {
    return creditScoreLeft;
  }

  function ModifyselectedPlayerCount(value) {
    if (value == 'dec')
      selectedPlayerCount--;
    if (value == 'inc')
      selectedPlayerCount++;
  }

  function getselectedPlayerCount() {
    return selectedPlayerCount;
  }

  function returnPlayingEleven() {
    return palyingEleven;
  }
  function setInfo(value) {
    palyingEleven.push(value);
  }

  function getSelectedCaption(value) {
    if (value == 'C') {
      return selectedcaption;
    }
    if (value == 'VC') {
      return vselecteicecaption;
    }
  }
  function ModifySelectedCaption(value, player) {
    if (value == 'C')
      selectedcaption = player;

    if (value == 'VC')
      vselecteicecaption = player;
  }
})
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.when('/addNewTeam', {
        templateUrl: 'createTeam.html',
        controller: 'Controller'
      })
      $routeProvider.when('/previewScreen', {
        templateUrl: 'teamPreview.html',
        controller: 'Controller'
      })
      $routeProvider.when('/addCaption', {
        templateUrl: 'selectCaptionAndVC.html',
        controller: 'Controller'
      })
      $routeProvider.when('/addTeamPage', {
        templateUrl: 'addNewTeam.html',
        controller: 'Controller'
      })
      $routeProvider.when('/', {
        templateUrl: 'addNewTeam.html',
        controller: 'Controller'
      }).otherwise({
        redirectTo: 'index.html'
      });

    }
  ])
  .controller('Controller', ['$scope', '$location', '$window','$http', 'commonService', function ($scope, $location, $window,$http, commonService) {
    $scope.selectedTab = 'WK';
    $scope.selectedPlayerArr = commonService.getselectedPlayerArr();
    $scope.teamPreview = commonService.returnPlayingEleven();
    $scope.selectedPlayerCount = commonService.getselectedPlayerCount();
    $scope.creditScoreLeft = commonService.getcreditScoreLeft();
    $scope.playerselected = false;
    // $scope.proceedContinue = false;
   
   
    var selectedcaption = commonService.getSelectedCaption('C');
    var vselecteicecaption = commonService.getSelectedCaption('VC');
    $scope.scope = false;
    $scope.addNewTeama = () => {
      commonService.setInfo('value');
      $scope.seerviceData = commonService.getInfo();
    }
    $scope.addNewTeam = () => {
      $location.path("/addNewTeam");
    }
    $scope.openPreview = () => {
      $location.path("/previewScreen");
    }
    $scope.addCaption = () => {
      if ($scope.proceedContinue == true) {
        $location.path("/addCaption");
      } else {
        $('#ruleModal').modal('show');
      }
    }
    $scope.addTeamScreen = () => {
      if($scope.saveTeam == true)
      $location.path("/addTeamPage");
       else
      alert('select Caption and Vice-Caption !!'); 
    }
    $scope.goback = () => {
      $window.history.back();
    }
    $scope.createTeamTabs = style => {
      $scope.selectedTab = style;
    }
    if ($scope.selectedPlayerArr['WK'] >= 1 && $scope.selectedPlayerArr['BAT'] >= 4 &&
      $scope.selectedPlayerArr['AR'] >= 2 && $scope.selectedPlayerArr['BOWL'] >= 2 && $scope.selectedPlayerArr['WK'] <= 1 &&
      $scope.selectedPlayerCount >= 11 && $scope.selectedPlayerArr['AR'] + $scope.selectedPlayerArr['BOWL'] >= 5

    ) {
      $scope.proceedContinue = true;
    } else {
      $scope.proceedContinue = false;
    }
    $scope.myFilter = function (player) {
      if ($scope.selectedTab == 'WK') {
        if (player.style == 7 || player.style == 5) {
          return player;
        }
      }
      if ($scope.selectedTab == 'BAT') {
        if (player.style == 1 || player.style == 3 || player.style == 5) {
          return player;
        }
      }
      if ($scope.selectedTab == 'AR') {
        if (player.style == 3 || player.style == 9 || player.style == 11) {
          return player;
        }
      }
      if ($scope.selectedTab == 'BOWL') {
        if (player.style == 11 || player.style == 13) {
          return player;
        }
      }
    }
    $scope.callMe = player => {
      if (player.selected) {
        player.selected = false;
        $scope.proceedContinue = false;
        commonService.ModifycreditScoreLeft('inc', player);
        $scope.creditScoreLeft = commonService.getcreditScoreLeft();
        commonService.ModifyselectedPlayerCount('dec');
        $scope.selectedPlayerCount = commonService.getselectedPlayerCount();
        commonService.ModifyselectedPlayerArr('dec', player);
        commonService.modifyPlayingEleven(player);
      }
      else {
        if ($scope.selectedPlayerCount < 11 && $scope.creditScoreLeft >= player.value) {
          player.selected = true;
          commonService.ModifycreditScoreLeft('dec', player);
          $scope.creditScoreLeft = commonService.getcreditScoreLeft();
          commonService.ModifyselectedPlayerCount('inc');
          $scope.selectedPlayerCount = commonService.getselectedPlayerCount();
          commonService.ModifyselectedPlayerArr('inc', player);
          if ($scope.selectedPlayerArr['WK'] >= 1 && $scope.selectedPlayerArr['BAT'] >= 4 &&
            $scope.selectedPlayerArr['AR'] >= 2 && $scope.selectedPlayerArr['BOWL'] >= 2 && $scope.selectedPlayerArr['WK'] <= 1 &&
            $scope.selectedPlayerCount >= 11 && $scope.selectedPlayerArr['AR'] + $scope.selectedPlayerArr['BOWL'] >= 5
          ) {
            $scope.proceedContinue = true;
          } else {
            $scope.proceedContinue = false;
          }
          commonService.setInfo(player);
        } else {
          if ($scope.selectedPlayerCount >= 11)
            alert('11 players selected, tap continue to proceed');
          else if ($scope.creditScoreLeft < player.value)
            alert('only ' + $scope.creditScoreLeft + ' left');
        }

      }
    }
    $scope.setCaption = (player, caption) => {
      $scope.saveTeam = false;
      if (caption == 'C') {
        if (selectedcaption) {
          var index = $scope.teamPreview.indexOf(selectedcaption);
          $scope.teamPreview[index].caption = false;
        }
        if (player.viceCaption) {
          player.viceCaption = false;
          vselecteicecaption = undefined;
        }
        player.caption = true;
        commonService.ModifySelectedCaption('C', player);
        selectedcaption = commonService.getSelectedCaption('C');
      }
      else if (caption == 'VC') {
        if (vselecteicecaption) {
          var index = $scope.teamPreview.indexOf(vselecteicecaption);
          $scope.teamPreview[index].viceCaption = false;
        }
        if (player.caption) {
          player.caption = false;
          selectedcaption = undefined
        }
        player.viceCaption = true;
        commonService.ModifySelectedCaption('VC', player);
        vselecteicecaption = commonService.getSelectedCaption('VC');
      }
      if (selectedcaption && vselecteicecaption)
        $scope.saveTeam = true;
    }
    if (selectedcaption && vselecteicecaption)
      $scope.saveTeam = true;

    $scope.respodaata = commonService.getInfo();
  }]);


