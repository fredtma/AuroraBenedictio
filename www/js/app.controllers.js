angular.module('AlphaOmega.controllers', [])
.controller('AppCtrl',['$scope','helper',AppCtrl])
.controller('DashCtrl',['$scope','$ionicModal','online',DashCtrl])
.controller('ProfileCtrl',['$scope','crud','$state','online',ProfileCtrl])
.controller('ProfileListCtrl',['$scope','crud',ProfileListCtrl])
.controller('ArticleCtrl',['$scope','$log',ArticlesCtrl])
.controller('ArticleDetailsCtrl',['$scope','$stateParams','$ionicActionSheet',function(){}])
.controller('ArticleLogsCtrl',['$scope','crud','$stateParams','$ionicSlideBoxDelegate','$timeout',ArticleLogsCtrl])
.controller('articleListLogsCtrl',['$scope','$ionicSlideBoxDelegate','crud',articleListLogsCtrl])
.controller('logViewsCtrl',['$scope','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup',logViewsCtrl]);

//============================================================================//
/**
 * the controller for the main application.
 * This is located as the top parent controller of the side menus
 */
function AppCtrl($scope,helper) {

   $scope.articles = {};
   $scope.articles.data = [
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
   $scope.goTo=helper.goTo;
   $scope.sideMenu=true;
   var row = impetroUser();
   if(row)$scope.profile = {"givenname":row['nominis'],"position":row['operarius'],"avatar":"img/default.jpg","jesua":row['jesua']};
}
//============================================================================//
/**
 * the controller for the Dashboard
 */
function DashCtrl($scope,$ionicModal,online) {iyona.on("Dasssssh");
   $scope.father = {};
   $ionicModal
   .fromTemplateUrl('cera/login.html',{"scope":$scope,"animation":"slide-in-up","focusFirstInput":true,"backdropClickToClose":false,"hardwareBackButtonClose":false})
   .then(function(modal){
      $scope.modal = modal;
      if(!impetroUser().operarius||false) $scope.modal.show();
   });

   $scope.loginDisplay = function(){ $scope.modal.show();};
   $scope.loginHide = function(){ $scope.modal.hide();};
   $scope.loginValidation = function () {$scope.loginHide(); };
   $scope.$on('$destroy',function(){$scope.modal.remove();});
   $scope.$on('modal.hidden',function(){/*...*/});
   $scope.$on('modal.removed',function(){/*...*/});

   angular.extend($scope,{"module":{},"service":{}});
   $scope.service.attempt=0;
   $scope.module.login  =function(){
      var u,p;

      u=$scope.father.username;p=md5($scope.father.password);//aliquis
      if(!u || !p) {$scope.service.msg = "Please enter the username/password."; return false;}
      sessionStorage.SITE_ALIQUIS = sessionStorage.SITE_ALIQUIS||'http://demo.xpandit.co.za/aura/aliquis';
      online.post(sessionStorage.SITE_ALIQUIS,{"u":u,"p":p},function(server){

         if(server.length){
            var row=server.rows[0];
            row.procurator=(row['level']==='super')?1:0;
            registerUser(row);//will set the USER_NAME & setting.config()
            online.principio();//start and set local db
            $scope.modal.remove();
            $scope.$parent.$parent.profile = {"givenname":row['name'],"position":row['email'],"avatar":row['img']||"img/default.jpg","jesua":row['jesua']};
            //@todo:change login details.
         }else{$scope.service.attempt++;msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");
         }
      });//fetch callback
   };
   $scope.module.forgot =function(){};

}
//============================================================================//
function ProfileCtrl($scope,crud,$state,online){iyona.on("Calling controller...");
   crud.set($scope,'profile-list','details');

   $scope.module.alpha=function(callback){
      profileCheck();callback.call();//call the service function
   }
   $scope.module.delta=function(callback){
      profileCheck();callback.call();//call the service function
   }
   $scope.$on("failForm",function(data,notitia){$scope.father.password="";});
   $scope.$on("newForm",function(data,notitia){
      if(notitia.transaction==="Alpha" && $state.current.name==="main.register") {
         registerUser({"username":$scope.father.email,"aditum":[],"name":$scope.service.name,"jesua":$scope.father.jesua.alpha,"procurator":0,"sess":null,"email":$scope.father.email});//will set the USER_NAME & setting.config()
         online.principio();//start and set local db
         iyona.msg("Hello and welcome "+$scope.service.name,true);
         $scope.$parent.profile = {"givenname":$scope.service.name,"position":$scope.father.email,"avatar":row['img']||"img/default.jpg","jesua":$scope.father.jesua.alpha};
         $state.go("call.dash");
      }
   });
   $scope.$on("readyForm",function(data,notitia){
      if(typeof notitia.iota!=="undefined" && notitia.iota instanceof Array) {
         var dob = notitia.iota[0].dob;
         if(dob){
            dob = dob.split("-")||[];
            if(dob.length>2){ $scope.service.year=dob[0];$scope.service.month=dob[1];$scope.service.day=dob[2];
         }}
         $scope.service.name = notitia.iota[0].firstname+' '+notitia.iota[0].lastname;
      }
      else iyona.info("Could not set name",data,notitia);
   });
   function profileCheck(){
      if(isset($scope.service.name)){var name = $scope.service.name.split(" ");
      $scope.father.firstname = name[0];$scope.father.lastname  = name[1];$scope.father.dob = $scope.service.year+'-'+$scope.service.month+'-'+$scope.service.day;}
      if(!$scope.father.jesua.alpha && $scope.father.password)$scope.father.password = md5($scope.father.password);//sulment les nouveaux mot de pass
   };

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
function ArticleLogsCtrl($scope,crud,$stateParams,$ionicSlideBoxDelegate,$timeout) {
   crud.set($scope,'article-logs','details');
   if($stateParams.field!=="new item"){$scope.father.barcode=$stateParams.field;}

   $scope.module.alpha=function(callback){
      var d = new Date().getTime(),curIndx=$ionicSlideBoxDelegate.currentIndex();
      $scope.father.sub = $scope.father.sub||md5(d+'Jesus Christ is Lord');
      $scope.father.code= $scope.father.code||uRand(5,true,true,true);iyona.on("ALPHA",$scope.father);
      alphaMerge($scope.father,$scope.generations[curIndx],$scope);
      callback.call(curIndx);//call the service function
   }
   $scope.module.delta=function(callback){
      var curIndx=$ionicSlideBoxDelegate.currentIndex();
      alphaMerge($scope.father,$scope.generations[curIndx],$scope);
      callback.call();//call the service function
   }
   $scope.module.slideHasChanged=function(){
      var curIndx=$ionicSlideBoxDelegate.currentIndex();
      iyona.on('$ionicSlideBoxDelegate',$ionicSlideBoxDelegate.slidesCount(),curIndx,$scope.generations[curIndx].jesua);
      $scope.formScope = $scope.$parent.formScope[curIndx];
      if($ionicSlideBoxDelegate.slidesCount()==curIndx+1 && $scope.generations[curIndx].jesua){//last slide and it must hv Jesua
         var newObject = {};
         angular.copy($scope.generations[curIndx],newObject);
         newObject.description= "Add a new description...";
         newObject.location   = "Add a new Location...";
         newObject.path       = null;
         newObject.jesua      = null;
         $scope.generations.push(newObject);
         iyona.info("New Slide",$scope.generations[curIndx],newObject,curIndx);
         $timeout(function(){$ionicSlideBoxDelegate.update();});
      } else if(!$scope.generations[curIndx].jesua){
         $scope.module.submit = crud.submitFunction.new;
      } else if($scope.generations[curIndx].jesua){
         $scope.module.submit = crud.submitFunction.old;
      }
   }
   $scope.$on("readyList",function(data,notitia){
      $timeout(function(){$ionicSlideBoxDelegate.update();});
   });
}
//============================================================================//
/**
 * the controller for the article logs
 */
function articleListLogsCtrl($scope,$ionicSlideBoxDelegate,crud) {
   crud.set($scope,'article-logs','details');
   var num,article,articles = $scope.articles.data;

   $scope.module.alpha=function(callback){
      $scope.father.code = $scope.father.code||uRand(5,true,true,true);iyona.on("ALPHA",$scope.father);
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
//   $scope.$on("$stateChangeStart",function(ev,newLoc,oldLoc){ console.warn("Change side menu"); $ionicSideMenuDelegate.canDragContent(true);});

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