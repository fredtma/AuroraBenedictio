angular.module('AlphaOmega.controllers', [])
.controller('AppCtrl',['$scope','helper',AppCtrl])
.controller('DashCtrl',['$scope','$ionicModal',DashCtrl])
.controller('ProfileCtrl',['$scope','crud',ProfileCtrl])
.controller('ProfileListCtrl',['$scope','crud',ProfileListCtrl])
.controller('ArticleCtrl',['$scope','$log',ArticlesCtrl])
.controller('ArticleDetailsCtrl',['$scope','$stateParams','$ionicActionSheet',function(){}])
.controller('ArticleLogsCtrl',['$scope','crud',ArticleLogsCtrl])
.controller('articleListLogsCtrl',['$scope','$ionicSlideBoxDelegate','crud',articleListLogsCtrl])
.controller('logViewsCtrl',['$scope','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup',logViewsCtrl]);

//============================================================================//
/**
 * the controller for the main application.
 * This is located as the top parent controller of the side menus
 */
function AppCtrl($scope,helper) {

   $scope.articles = {};
   $scope.articles.data =[
      {"name":"first item", "desc":"This is the first item", "src":"img/article/first.jpg"},
      {"name":"second item", "desc":"This is the second item", "src":"img/article/second.jpg"},
      {"name":"third item", "desc":"This is the third item", "src":"img/article/third.jpg"},
      {"name":"fourth item", "desc":"This is the fourth item", "src":"img/article/fourth.jpg"},
      {"name":"fith item", "desc":"This is the fith item", "src":"img/article/fith.jpg"},
      {"name":"sixth item", "desc":"This is the sixth item", "src":"img/article/sixth.jpg"},
      {"name":"seventh item", "desc":"This is the seventh item", "src":"img/article/seventh.jpg"},
      {"name":"eight item", "desc":"This is the eight item", "src":"img/article/eight.jpg"},
      {"name":"nineth item", "desc":"This is the nineth item", "src":"img/article/nineth.jpg"},
      {"name":"tenth item", "desc":"This is the tenth item", "src":"img/article/tenth.jpg"}
   ];
   $scope.barscan=helper.barscan;
   $scope.logoff=helper.logoff;
}
//============================================================================//
/**
 * the controller for the Dashboard
 */
function DashCtrl($scope,$ionicModal) {
   $ionicModal.fromTemplateUrl('cera/login.html',{
      "scope":$scope,
      "animation":"slide-in-up"
   }).then(function(modal){
      $scope.modal = modal;
      $scope.modal.show();
   });
   $scope.loginDisplay = function(){ $scope.modal.show();};
   $scope.loginHide = function(){ $scope.modal.hide();};
   $scope.loginValidation = function () {$scope.loginHide(); };
   $scope.$on('$destroy',function(){$scope.modal.remove();});
   $scope.$on('modal.hidden',function(){/*...*/});
   $scope.$on('modal.removed',function(){/*...*/});

}
//============================================================================//
function ProfileCtrl($scope,crud){
   crud.set($scope,'profile-list','details');

   $scope.module.alpha=function(callback){
      var name = $scope.service.name.split(" ");
      $scope.father.firstname = name[0];$scope.father.lastname  = name[1];$scope.father.dob = $scope.service.year+'-'+$scope.service.month+'-'+$scope.service.day
      callback.call();//call the service function
   }
   $scope.module.delta=function(callback){
      var name = $scope.service.name.split(" ");
      $scope.father.firstname = name[0];$scope.father.lastname  = name[1];$scope.father.dob = $scope.service.year+'-'+$scope.service.month+'-'+$scope.service.day
      callback.call();//call the service function
   }
   $scope.$on("readyForm",function(data,notitia){
      if(typeof notitia.iota!=="undefined") {
         var dob = notitia.iota[0].dob;
         dob = dob.split("-")||[];
         if(dob.length>2){ $scope.service.year=dob[0];$scope.service.month=dob[1];$scope.service.day=dob[2];}
         $scope.service.name = notitia.iota[0].firstname+' '+notitia.iota[0].lastname;
      }
      else iyona.info("Could not set name",data,notitia);
   });

}
//============================================================================//
function ProfileListCtrl($scope,crud){crud.set($scope,'profile-list','list');}
//============================================================================//
/**
 * the controller for the article
 */
function ArticlesCtrl($scope,$log) {

   $scope.reorderItem=function(item,from,to){};
   $scope.itemSwipe=function(tmp){}
}
//============================================================================//
/**
 * the controller for the article logs
 */
function ArticleLogsCtrl($scope,crud) {
   crud.set($scope,'article-logs','details');

   $scope.module.alpha=function(callback){
      $scope.father.code = $scope.father.code||uRand(5,true,true,true);iyona.deb("ALPHA",$scope.father);
      callback.call();//call the service function
   }
}
//============================================================================//
/**
 * the controller for the article logs
 */
function articleListLogsCtrl($scope,$ionicSlideBoxDelegate,crud) {
   crud.set($scope,'article-logs','details');
   var num,article,articles = $scope.articles.data;

   $scope.module.alpha=function(callback){
      $scope.father.code = $scope.father.code||uRand(5,true,true,true);iyona.deb("ALPHA",$scope.father);
      callback.call();//call the service function
   }
   $scope.$on("readyList",function(server){
      $ionicSlideBoxDelegate.update();
   });
}
//============================================================================//
/**
 * the controller for the article
 */
function logViewsCtrl($scope,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup) {
   //disable and enable the slide menu
   $ionicSideMenuDelegate.canDragContent(false);
   $scope.$on("$stateChangeStart",function(ev,newLoc,oldLoc){ console.warn("Change side menu"); $ionicSideMenuDelegate.canDragContent(true);});

   //$ionicLoading.show({"template":"<strong>Laoding</strong>...","delay":"0","duration":2000})
   //function to count the changes of the slides
   $scope.slideHasChanged=function(index){console.log("the chosen one is ",index);};

   //capture an image
   $scope.getPicture=function(e){
      if(typeof navigator.camera === "undefined") {console.error("object not there ",navigator); return false;}
      navigator.camera.getPicture(
         function(img){console.info("Capturing image",Camera); e.target.src = "data:image/jpeg;base64,"+img; },
         function(err){$ionicPopup.alert({"title":"Image Capture","template":"Could not capture the image::"+err}).then(function(){console.info("The image was not capture::"+err);}); },
         {"quality":100,"destinationType":Camera.DestinationType.DATA_URL,"correctOrientation":true});
   };
}//