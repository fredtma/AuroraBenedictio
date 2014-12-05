angular.module('AlphaOmega.controllers', [])
.controller('AppCtrl',AppCtrl)
.controller('ArticleCtrl',ArticlesCtrl)
.controller('ArticleLogsCtrl',ArticleLogsCtrl)
.controller('DashCtrl',DashCtrl)
.controller('ProfileCtrl',ProfileCtrl)
.controller('ProfileListCtrl',ProfileListCtrl);

//============================================================================//
/**
 * the controller for the main application.
 * This is located as the top parent controller of the side menus
 */
AppCtrl.$inject = ['helper'];
function AppCtrl(helper) {
   var ctrl = this;
   ctrl.barscan=helper.barscan;
   ctrl.logoff=helper.logoff;
   ctrl.goTo=helper.goTo;
   ctrl.sideMenu=true;
   var row = impetroUser();
   if(row)ctrl.profile = {"givenname":row['nominis'],"position":row['operarius'],"avatar":row['avatar']||"img/default.jpg","jesua":row['jesua']};
}
//============================================================================//
/**
 * the controller for the article
 */
ArticlesCtrl.$inject = ['crud'];
function ArticlesCtrl(crud) {
   var ctrl = this;
   crud.set(ctrl,'article-logs','list');

}
//============================================================================//
/**
 * the controller for the article logs
 */
ArticleLogsCtrl.$inject = ['crud','helper','$stateParams','$ionicSlideBoxDelegate','$timeout'];
function ArticleLogsCtrl(crud,helper,$stateParams,$ionicSlideBoxDelegate,$timeout) {iyona.info("Controller...");
   var ctrl = this;
   crud.set(ctrl,'article-logs','details');
   if($stateParams.field!=="new item"){ctrl.father.barcode=$stateParams.field;}

   ctrl.module.alpha=alpha;
   ctrl.module.delta=delta;
   ctrl.module.slideHasChanged=slideHasChanged;
   ctrl.$on("readyList",readyList);

   function alpha(callback){
      var d = new Date().getTime(),curIndx=$ionicSlideBoxDelegate.currentIndex();
      ctrl.father.sub = ctrl.father.sub||md5(d+'Jesus Christ is Lord');
      ctrl.father.code= ctrl.father.code||uRand(5,true,true,true);
      ctrl.father.barcode= ctrl.father.barcode||($stateParams.search!=="new item")?$stateParams.search:null;
      alphaMerge(ctrl.father,ctrl.generations[curIndx],ctrl);//places the value of the generation saved in father's
      callback(curIndx);//call the service function
   }
   function delta(callback){
      var curIndx=$ionicSlideBoxDelegate.currentIndex();
      alphaMerge(ctrl.father,ctrl.generations[curIndx],ctrl);
      callback.call();//call the service function
   }
   function readyList(data,notitia){
      //creates two record with different values, with the same sub and status, urgency, assign
      var tmp1 = eternalCall('article-logs','details').display.fields,tmp2 = eternalCall('article-logs','details').display.fields,d = new Date().getTime(),sub = md5(d+'Jesus Christ is Lord');
      tmp1.status = tmp1.urgency = tmp1.assign = 1;
      tmp2.status = tmp2.urgency = tmp2.assign = 1;
      tmp1.sub = sub; tmp2.sub = sub;
      if(notitia.iota instanceof Array === false)ctrl.generations = [tmp1,tmp2];
      if(ctrl.generations.length===1){//when there is only one object
         var newObject={};
         angular.copy(ctrl.generations[0],newObject);
         newObject.description= "Add a new description...";
         newObject.location   = "Add a new Location...";
         newObject.path       = null;
         newObject.jesua      = null;
         ctrl.generations.push(newObject);
      }
      iyona.on('ctrl.generations',ctrl.generations,notitia.iota.length,notitia.iota,notitia.iota instanceof Array);
      $timeout(function(){$ionicSlideBoxDelegate.update();});
   }
   function slideHasChanged(){
      var curIndx=$ionicSlideBoxDelegate.currentIndex(),jesua = isalpha(ctrl.generations[curIndx].jesua);
      iyona.on('$ionicSlideBoxDelegate',$ionicSlideBoxDelegate.slidesCount(),curIndx,ctrl.generations[curIndx].jesua, isalpha(ctrl.generations[curIndx].jesua));
      ctrl.formScope = ctrl.$parent.formScope[curIndx];
      //last slide and it must hv Jesua
      if($ionicSlideBoxDelegate.slidesCount()==curIndx+1 && ctrl.generations[curIndx].jesua){
         var newObject = {};
         angular.copy(ctrl.generations[curIndx],newObject);
         newObject.description= "Add a new description...";
         newObject.location   = "Add a new Location...";
         newObject.path       = null;
         newObject.jesua      = null;
         ctrl.generations.push(newObject);
         iyona.info("New Slide",ctrl.generations[curIndx],newObject,curIndx);
         $timeout(function(){$ionicSlideBoxDelegate.update();});
      }
      if(jesua===false){
         ctrl.module.action = function(){helper.action('Create ');};
         ctrl.module.submit = crud.submitFunction.new;
      } else if(jesua){
         ctrl.module.action = function(){helper.action('Update ');};
         ctrl.module.submit = crud.submitFunction.old;
      }
   }
}
//============================================================================//
/**
 * the controller for the Dashboard
 */
DashCtrl.$inject = ['$scope','$ionicModal','online'];
function DashCtrl($scope,$ionicModal,online) {
   var ctrl = $scope;
   angular.extend(ctrl,{"module":{},"service":{}});
   ctrl.father = {};
   ctrl.service.attempt=0;

   startModal();
   ctrl.module.forgot   = callBack;
   ctrl.module.login    = login();
   ctrl.loginDisplay    = loginDisplay;
   ctrl.loginHide       = loginHide;
   ctrl.loginValidation = loginValidation;

   ctrl.$on('$destroy',function(){ctrl.modal.remove();});
   ctrl.$on('modal.hidden',function(){/*...*/});
   ctrl.$on('modal.removed',function(){/*...*/});


   function callBack () {}
   function login (){
      var u,p;

      if(!u || !p) {ctrl.service.msg = "Please enter the username/password."; return false;}
      u=ctrl.father.username;p=md5(ctrl.father.password);//aliquis
      sessionStorage.SITE_ALIQUIS = sessionStorage.SITE_ALIQUIS||'http://demo.xpandit.co.za/aura/aliquis';
      online.post(sessionStorage.SITE_ALIQUIS,{"u":u,"p":p},function(server){

         if(server && server.length){
            var row=server.rows[0];
            row.procurator=(row['level']==='super')?1:0;
            registerUser(row);//will set the USER_NAME & setting.config()
            online.principio();//start and set local db
            ctrl.modal.remove();
            ctrl.$parent.$parent.profile = {"givenname":row['name'],"position":row['email'],"avatar":row['img']||"img/default.jpg","jesua":row['jesua']};
            //@todo:change login details.
         }else{ctrl.service.attempt++;var msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");iyona.on("Failed login",server);
         }
      });//fetch callback
   };
   function loginDisplay () {ctrl.modal.show();}
   function loginHide (){ctrl.modal.hide();}
   function loginValidation () {ctrl.loginHide(); }
   function startModal(){
      $ionicModal
      .fromTemplateUrl('cera/login.html',{"scope":ctrl,"animation":"slide-in-up","focusFirstInput":true,"backdropClickToClose":false,"hardwareBackButtonClose":false})
      .then(function(modal){
         ctrl.modal = modal;
         if(!impetroUser().operarius||false) ctrl.modal.show();
      }).catch(function(err,err2){iyona.on('err::',err,err2); });
   }


}
//============================================================================//
ProfileCtrl.$inject = ['crud','$state','online'];
function ProfileCtrl(crud,$state,online){iyona.on("Calling controller...");
   var ctrl = this;
   crud.set(ctrl,'profile-list','details');

   ctrl.module.alpha=alpha;
   ctrl.module.delta=delta;
   ctrl.$on("failForm",failForm);
   ctrl.$on("newForm",newForm);
   ctrl.$on("readyForm",readyForm);

   function alpha(callback){profileCheck();callback.call();}
   function delta(callback){profileCheck();callback.call();}
   function failForm(data,notitia){ctrl.father.password="";}
   function newForm(data,notitia){
      if(notitia.transaction==="Alpha" && $state.current.name==="main.register") {
         registerUser({"username":ctrl.father.email,"aditum":[],"name":ctrl.service.name,"jesua":ctrl.father.jesua.alpha,"procurator":0,"sess":null,"email":ctrl.father.email});//will set the USER_NAME & setting.config()
         online.principio();//start and set local db
         iyona.msg("Hello and welcome "+ctrl.service.name,true);
         ctrl.$parent.profile = {"givenname":ctrl.service.name,"position":ctrl.father.email,"avatar":row['img']||"img/default.jpg","jesua":ctrl.father.jesua.alpha};
         $state.go("call.dash");
      }
   }
   function profileCheck(){
      if(isset(ctrl.service.name)){var name = ctrl.service.name.split(" ");
      ctrl.father.firstname = name[0];ctrl.father.lastname  = name[1];ctrl.father.dob = ctrl.service.year+'-'+ctrl.service.month+'-'+ctrl.service.day;}
      if(!ctrl.father.jesua.alpha && ctrl.father.password)ctrl.father.password = md5(ctrl.father.password);//sulment les nouveaux mot de pass
   };
   function readyForm(data,notitia){
      if(typeof notitia.iota!=="undefined" && notitia.iota instanceof Array) {
         var dob = notitia.iota[0].dob;
         if(dob){
            dob = dob.split("-")||[];
            if(dob.length>2){ ctrl.service.year=dob[0];ctrl.service.month=dob[1];ctrl.service.day=dob[2];
         }}
         ctrl.service.name = notitia.iota[0].firstname+' '+notitia.iota[0].lastname;
      }
      else iyona.info("Could not set name",data,notitia);
   }

}
//============================================================================//
ProfileListCtrl.$inject = ['crud'];
function ProfileListCtrl(crud){var ctrl = this;crud.set(ctrl,'profile-list','list');}
//============================================================================//