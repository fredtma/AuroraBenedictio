angular.module('AlphaOmega.controllers', [])
.controller('AppCtrl',['$scope','$ionicPopup',AppCtrl])
.controller('DashCtrl',['$scope','$ionicModal',DashCtrl])
.controller('ProfileCtrl',['$scope','$ionicActionSheet',ProfileCtrl])
.controller('ArticleCtrl',['$scope','$log',ArticlesCtrl])
.controller('ArticleDetailsCtrl',['$scope','$stateParams','$ionicActionSheet',function(){}])
.controller('ArticleLogsCtrl',['$scope','$stateParams','$ionicActionSheet','crud',ArticleLogsCtrl])
.controller('logViewsCtrl',['$scope','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup',logViewsCtrl]);

//============================================================================//
/**
 * the controller for the main application.
 * This is located as the top parent controller of the side menus
 */
function AppCtrl($scope,$ionicPopup) {

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
   $scope.barscan=function(){if(typeof cordova === "undefined"){console.log("cordova not setup");return;}
      cordova.plugins.barcodeScanner.scan(
         function(result){console.info("Result",result);
            $ionicPopup.alert({"title":"Captured Content","template":"Result: "+result.text+"\n"+"Format: "+result.format+"\n"+"Candelled: "+result.cancelled});
         },
         function(err){$ionicPopup.alert("Scanning failed: "+err);}
      );
   };
   $scope.logoff=function(){
      $ionicPopup.confirm({"title":"Exit Applicaiton","template":"Are you sure you want to exit?"})
      .then(function(res){

         if(res){ionic.Platform.exitApp();}
         else {console.info("Not closing");}
      });

   };
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
function ProfileCtrl($scope,$ionicActionSheet){
   angular.extend($scope,{"display":{}, "title":"Frederick Tshimanga's Profile","father":{"year":1985,"month":12,"day":12},"child":{"contact":[{"number":"","type":"mobile"}]}});

   $scope.showMe=function(opt){
      $scope.display[opt]=true;

   };
   $scope.addChild=function(set,type){
      $scope.display[set]=false;
      $scope.child[set].push({"number":"","type":type});
   };
   $scope.setDate=function(type,set){
      var target = set.target;
      $scope.father.year = target.value;
   };

   $scope.action=function(){
      var actionSheet = $ionicActionSheet.show({
         "titleText":"Take Action",
         "buttons":[{"text":"Update Article"},{"text":"Scan Barcode"},{"text":"Capture Article"}],
         "cancelText":"Cancel Action",
         "destructiveText":"Delete Article",
         "buttonClicked":function(index){console.info("button clicked is",index);},
         "cancel":function(index){console.info("cancel button clicked is",index);},
         "destructiveButtonClicked":function(index){console.info("destructiveButtonClicked clicked is",index); actionSheet();}
      });
   };

   $scope.getPicture=function(e){
      if(typeof navigator.camera === "undefined") {console.error("object not there ",navigator); return false;}
      navigator.camera.getPicture(
         function(img){console.info("Capturing image",Camera); e.target.src = "data:image/jpeg;base64,"+img; },
         function(err){$ionicPopup.alert({"title":"Image Capture","template":"Could not capture the image::"+err}).then(function(){console.info("The image was not capture::"+err);}); },
         {"quality":100,"destinationType":Camera.DestinationType.DATA_URL,"correctOrientation":true});
   };
}
//============================================================================//
/**
 * the controller for the article
 */
function ArticlesCtrl($scope,$log) {

   $scope.reorderItem=function(item,from,to){};
   $scope.itemSwipe=function(tmp){

   }
}
//============================================================================//
/**
 * the controller for the article logs
 */
function ArticleLogsCtrl($scope,$stateParams,$ionicActionSheet,crud) {
   crud.set($scope,'article-logs','details');
   var num,article,articles = $scope.articles.data;
   for(num in  articles ){article=articles[num]; if (article.name===$stateParams.jesua){$scope.article = article;break;} }
iyona.deb("SCOPE",$scope.father);
   $scope.module.alpha=function(callback){
      $scope.father.code = $scope.father.code||uRand(5,true,true,true);iyona.deb("ALPHA",$scope.father);
      callback.call();//call the service function
   }
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