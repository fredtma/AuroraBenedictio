angular.module('AlphaOmega.services',['ngResource'])
   .service("online",["$resource","$http",online])
   .service("helper",["$ionicPopup","$ionicActionSheet",helper])
   .service("crud",["online","helper","$stateParams","$log","$timeout",crud]);

//############################################################################//
//ONLINE                                                                      //
//############################################################################//
/*
 * online, is used to access the online db
 * @param {function} callback, the call back function for the results
 * @param {string} caller, when using the API to call a report
 * @returns {undefined}
 */
function online($resource,$http) {
   var isViewLoading={"width": "100%", "display": "block"};

   this.notitia=function(basilia,params,callback){
      var view = ",:view,:jesua,:mensa";
      params   = params||{};
      basilia  = basilia||dynamis.get("quaerere");
      var service = $resource(dynamis.get("SITE_MILITIA")+view, params, {"militia": {"method": "POST", isArray: false, "cache": false, "responseType": "json", "withCredentials": true}});
iyona.deb("SERVICE",service);
      if (dynamis.get("SITE_CONFIG").isOnline && dynamis.get("SITE_CONFIG").Online) {
         checkConnection();//@todo: check connection mobile & desktop
         service.militia(basilia, function(j) {
            isViewLoading = {"display": "none"};
            if (j.notitia && (typeof j.notitia.sql !== "undefined" || typeof j.notitia.quaerre !== "undefined")) iyona.info("QUAERRE", j.notitia.sql || j.notitia.quaerre);
            if (j.notitia && j.notitia.idem != '0') {
               var u = dynamis.get("USER_NAME", true) || {};
               u.cons = j.notitia.idem;
               dynamis.set("USER_NAME", u, true)
            }//pour maitre un autre biscuit
            iyona.info(j, 'Online');
            if (typeof callback == "function")callback(j);
         });
      }//endif online
      else{
         iyona.msg("You are currently offline", true, "danger bold");
         isViewLoading = {"display": "none"};
      }
   }//endufntion notitia

   this.responseType=this.responseType||"json";
   if(dynamis.get("SITE_CONFIG").isOnline && dynamis.get("SITE_CONFIG").Online){iyona.msg("Your device is currently Offline.",true,"danger bold"); return false;}//@todo
   this.post=function(url,params,callback){
      $http.post(url,params,{"responseType":this.responseType,"cache":true,"headers":{"Content-Type":"application/x-www-form-urlencoded"},"withCredentials":true})
      .success(function(server){isViewLoading = {"display":"none"};callback(server);})
      .error(function(data,status,headers,config){isViewLoading = {"display":"none"};
         iyona.msg("Please check your internet connection::"+navigator.connection.type,true,'danger bold');
         iyona.info("There was an error in handling the transaction.");
         if(data&&"err" in data)iyona.msg(data.err,true,"danger",true);
         iyona.deb(data,status,headers,config,config.url);
      });
   }
}
//############################################################################//
//HELPER                                                                      //
//############################################################################//
function helper($ionicPopup,$ionicActionSheet){
   var curNode,$scope;

   this.set=function(scope,node,display){
      $scope   = scope;
      curNode  = eternalCall(node,display);
      //enable module that have been set in the Node setting
      if(curNode.display.module instanceof Array){
         var x,module,l=curNode.display.module.length;
         for(x=0;x<l;x++){
            module = curNode.display.module[x];
            $scope.module[module] = this[module];
         }//end for array module
      }//end if module array
   };//end func set

   this.action=function(){
      var title,submitTxt,buttons,custModule;
      title = curNode.display.title;

      if(!$scope.service.jesua) submitTxt = "<i class='icon ion-ios7-paper-outline' i> Create "+title;
      else submitTxt = "<i class='icon ion-ios7-compose-outline' i> Update "+title;
      //create default submit and add custom action modules, this includes text & module to be called.
      buttons = [{"text":submitTxt}];
      if(curNode.display.action instanceof Array){buttons = buttons.concat(curNode.display.action);}

      var actionSheet = $ionicActionSheet.show({
         "titleText":"Take Action",
         "buttons":buttons,
         "cancelText":"<i class='icon ion-ios7-close-outline' i> Cancel Action",
         "destructiveText":"<i class='icon ion-ios7-trash-outline' i> Delete Article",
         "buttonClicked":function(index){
            iyona.info("button clicked is",index);
            switch(index){
               case 0: $scope.module.submit(); actionSheet(); break;//note submit is setup to update or create in the crud service.
               default://buttons has all the custome module & text, select the custome module via the index
                  custModule = buttons[index].module;
                  iyona.deb(custModule,buttons,$scope.module);
                  if(typeof $scope.module[custModule]!=="undefined") $scope.module[custModule](); actionSheet();break;
            }
         },
         "cancel":function(){iyona.info("cancel button clicked ");},
         "destructiveButtonClicked":function(){$scope.module.delete(); actionSheet();}
      });
   };

   this.getPicture=function(e){
      if(typeof navigator.camera === "undefined") {iyona.err("Camera option not available.",navigator); return false;}
      navigator.camera.getPicture(
         function(img){iyona.info("Capturing image",Camera); e.target.src = "data:image/jpeg;base64,"+img; },
         function(err){$ionicPopup.alert({"title":"Image Capture","template":"Could not capture the image::"+err}).then(function(){iyona.info("The image was no image captured::"+err);}); },
         {"quality":100,"destinationType":Camera.DestinationType.DATA_URL,"correctOrientation":true});
   };

   this.enumWalk=function(opt){
      var selected = $scope.father[opt].alpha? $scope.father[opt].alpha:0;
      selected++;

      if(typeof $scope.father[opt].enum[selected]!=="undefined")$scope.father[opt].alpha=selected;
      else $scope.father[opt].alpha = 0;
   };
}
//############################################################################//
//CRUD                                                                        //
//############################################################################//
function crud(online,helper,$stateParams,$log,$timeout){
   var that=this,$scope,curNode,curMensa,curDisplay,curTitle;

   this.set=function(scope,node,display){

      $scope      = scope;
      curNode     = eternalCall(node,display);
      curMensa    = curNode.mensa;
      curDisplay  = curNode.display;
      curTitle    = curNode.title;
      $scope.module = typeof $scope.module!=="undefined"?$scope.module:{};
      //setup on $scope the module, service, father, child
      angular.extend($scope,{"father":curDisplay.fields,"child":curDisplay.child,"service":{"title":"New "+curTitle}});
      $scope.service.Tau   = "Alpha";

      $scope.module.submit = function(){ if(typeof $scope.module.alpha==="function")$scope.module.alpha(function(){alpha(node)}); else alpha(node);}
      $scope.module.delete = function(){ if(typeof $scope.module.omega==="function")$scope.module.omega(function(){omega(node)}); else omega();}

      if($stateParams.jesua!==null && $stateParams.jesua!==""){
         $scope.module.submit = function(){ if(typeof $scope.module.delta==="function")$scope.module.delta(function(){delta(node)}); else delta();}
         $scope.service.jesua = $stateParams.jesua;
         $scope.service.Tau   = "deLta";
         $scope.service.title = curTitle;
      }
      helper.set(scope,node,display);//set the module on the $scope.module property

   }
   function alpha(node){iyona.info("Creating a new record");

      var consuetudinem = {"uProfile":node};iyona.deb("SERVICE ALPHA",$scope.father,node);
      var basilia = setQuaerere(node,$scope.father,$scope.service.Tau,consuetudinem);
      online.notitia(basilia,null,function(server){
         iyona.info(server,"data from server");
         $scope.$parent.msg      = (typeof $scope.$parent.msg !=="undefined")?$scope.$parent.msg:{};
         iyona.deb("VALUES",$scope);
         $scope.$parent.msg.text = "passed value";
         $scope.$parent.msg.err  = false;
      });
   }
   function delta(){iyona.info("Updating a record");}
   function omega(){iyona.info("Deleting the record");}
}