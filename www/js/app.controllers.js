angular.module('AlphaOmega.controllers', [])
.controller('AppCtrl',['$scope','helper',AppCtrl])
.controller('DashCtrl',['$scope','$ionicModal','online',DashCtrl])
.controller('ProfileCtrl',['$scope','crud','$state','online',ProfileCtrl])
.controller('ProfileListCtrl',['$scope','crud',ProfileListCtrl])
.controller('ArticleCtrl',['$scope','crud',ArticlesCtrl])
.controller('ArticleLogsCtrl',['$scope','crud','helper','$stateParams','$ionicSlideBoxDelegate','$timeout',ArticleLogsCtrl]);

//============================================================================//
/**
 * the controller for the main application.
 * This is located as the top parent controller of the side menus
 */
function AppCtrl($scope,helper) {

   $scope.barscan=helper.barscan;
   $scope.logoff=helper.logoff;
   $scope.goTo=helper.goTo;
   $scope.sideMenu=true;
   var row = impetroUser();
   if(row)$scope.profile = {"givenname":row['nominis'],"position":row['operarius'],"avatar":row['avatar']||"img/default.jpg","jesua":row['jesua']};
}
//============================================================================//
/**
 * the controller for the Dashboard
 */
function DashCtrl($scope,$ionicModal,online) {
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

         if(server && server.length){
            var row=server.rows[0];
            row.procurator=(row['level']==='super')?1:0;
            registerUser(row);//will set the USER_NAME & setting.config()
            online.principio();//start and set local db
            $scope.modal.remove();
            $scope.$parent.$parent.profile = {"givenname":row['name'],"position":row['email'],"avatar":row['img']||"img/default.jpg","jesua":row['jesua']};
            //@todo:change login details.
         }else{$scope.service.attempt++;var msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");iyona.on("Failed login",server);
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
function ArticlesCtrl($scope,crud) {
   crud.set($scope,'article-logs','list');

}
//============================================================================//
/**
 * the controller for the article logs
 */
function ArticleLogsCtrl($scope,crud,helper,$stateParams,$ionicSlideBoxDelegate,$timeout) {iyona.info("Controller...");
   crud.set($scope,'article-logs','details');
   if($stateParams.field!=="new item"){$scope.father.barcode=$stateParams.field;}

   $scope.module.alpha=function(callback){
      var d = new Date().getTime(),curIndx=$ionicSlideBoxDelegate.currentIndex();
      $scope.father.sub = $scope.father.sub||md5(d+'Jesus Christ is Lord');
      $scope.father.code= $scope.father.code||uRand(5,true,true,true);
      $scope.father.barcode= $scope.father.barcode||($stateParams.search!=="new item")?$stateParams.search:null;
      alphaMerge($scope.father,$scope.generations[curIndx],$scope);//places the value of the generation saved in father's
      callback(curIndx);//call the service function
   }
   $scope.module.delta=function(callback){
      var curIndx=$ionicSlideBoxDelegate.currentIndex();
      alphaMerge($scope.father,$scope.generations[curIndx],$scope);
      callback.call();//call the service function
   }
   $scope.module.slideHasChanged=function(){
      var curIndx=$ionicSlideBoxDelegate.currentIndex(),jesua = isalpha($scope.generations[curIndx].jesua);
      iyona.on('$ionicSlideBoxDelegate',$ionicSlideBoxDelegate.slidesCount(),curIndx,$scope.generations[curIndx].jesua, isalpha($scope.generations[curIndx].jesua));
      $scope.formScope = $scope.$parent.formScope[curIndx];
      //last slide and it must hv Jesua
      if($ionicSlideBoxDelegate.slidesCount()==curIndx+1 && $scope.generations[curIndx].jesua){
         var newObject = {};
         angular.copy($scope.generations[curIndx],newObject);
         newObject.description= "Add a new description...";
         newObject.location   = "Add a new Location...";
         newObject.path       = null;
         newObject.jesua      = null;
         $scope.generations.push(newObject);
         iyona.info("New Slide",$scope.generations[curIndx],newObject,curIndx);
         $timeout(function(){$ionicSlideBoxDelegate.update();});
      }
      if(jesua===false){
         $scope.module.action = function(){helper.action('Create ');};
         $scope.module.submit = crud.submitFunction.new;
      } else if(jesua){
         $scope.module.action = function(){helper.action('Update ');};
         $scope.module.submit = crud.submitFunction.old;
      }
   }
   $scope.$on("readyList",function(data,notitia){
      //creates two record with different values, with the same sub and status, urgency, assign
      var tmp1 = eternalCall('article-logs','details').display.fields,tmp2 = eternalCall('article-logs','details').display.fields,d = new Date().getTime(),sub = md5(d+'Jesus Christ is Lord');
      tmp1.status = tmp1.urgency = tmp1.assign = 1;
      tmp2.status = tmp2.urgency = tmp2.assign = 1;
      tmp1.sub = sub; tmp2.sub = sub;
      if(notitia.iota instanceof Array === false)$scope.generations = [tmp1,tmp2];
      if($scope.generations.length===1){//when there is only one object
         var newObject={};
         angular.copy($scope.generations[0],newObject);
         newObject.description= "Add a new description...";
         newObject.location   = "Add a new Location...";
         newObject.path       = null;
         newObject.jesua      = null;
         $scope.generations.push(newObject);
      }
      iyona.on('$scope.generations',$scope.generations,notitia.iota.length,notitia.iota,notitia.iota instanceof Array);
      $timeout(function(){$ionicSlideBoxDelegate.update();});
   });
}
//============================================================================//