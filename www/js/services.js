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

   this.notitia=function(params){
      var view = ":call,:view,:jesua,:mensa,:display";
      params   = params||{};
      checkConnection();//@todo: check connection mobile & desktop
      if (dynamis.get("SITE_CONFIG").isOnline && dynamis.get("SITE_CONFIG").Online) {
         var service = $resource(dynamis.get("SITE_API")+view, params, {"militia": {"method": "POST", isArray: false, "cache": false, "responseType": "json", "withCredentials": true}});
         iyona.deb("SERVICE",service);
         return service;
      }else{
         iyona.msg("You are currently offline", true, "danger bold");
         isViewLoading = {"display": "none"};
         return false;
      }
   }//endufntion notitia

   this.verify=function(server){
      isViewLoading = {"display": "none"};
      if (server.notitia && (typeof server.notitia.sql !== "undefined" || typeof server.notitia.quaerre !== "undefined")) iyona.info("QUAERRE", server.notitia.sql || server.notitia.quaerre);
      if (server.notitia && server.notitia.idem !== 0) {//cookie
         var u = dynamis.get("USER_NAME", true) || {};
         u.cons = server.notitia.idem;
         dynamis.set("USER_NAME", u, true)
      }//pour maitre un autre biscuit
      if(typeof server.notitia !=="undefined" && typeof server.notitia.iota !=="undefined") return server; else {iyona.err('Online error',server);return false;}
   }//end verify

   this.responseType=this.responseType||"json";
   this.post=function(url,params,callback){
      if(dynamis.get("SITE_CONFIG").isOnline && dynamis.get("SITE_CONFIG").Online){iyona.msg("Your device is currently Offline.",true,"danger bold"); return false;}//@todo
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
   var that=this,$db,$scope,curNode,curMensa,curDisplay,curTitle,nodeName,nodeDisplay,RECORD;

   this.set=function(scope,node,display){

      $scope      = scope;
      nodeName    = node;
      nodeDisplay = display;
      curNode     = eternalCall(node,display);
      curMensa    = curNode.mensa;
      curDisplay  = curNode.display;
      curTitle    = curNode.title;
      $scope.module = typeof $scope.module!=="undefined"?$scope.module:{};
      //setup on $scope the module, service, father, child
      angular.extend($scope,{"father":curDisplay.fields,"child":curDisplay.child,"service":{"title":curTitle}});
      helper.set(scope,node,display);//set the module on the $scope.module property
      $db = online.notitia({"view":"form","call":"benedictio","mensa":nodeName,"display":nodeDisplay});

      $scope.module.delete = function(){ if(typeof $scope.module.omega==="function")$scope.module.omega(function(){omega()}); else omega();}
      if($stateParams.jesua==="new" || $stateParams.jesua==="") {
         $stateParams.jesua = null;$scope.service.Tau = "Alpha";$scope.service.title = "New "+curTitle;
         $scope.module.submit = function(){ if(typeof $scope.module.alpha==="function")$scope.module.alpha(function(){alpha()}); else alpha();}
      }
      if($stateParams.jesua==="list"){
         $stateParams.jesua = null;$scope.service.Tau = "sigma";
         sigma();
      }
      if($stateParams.jesua!==null && $stateParams.jesua!==""){
         $scope.service.jesua = $stateParams.jesua;$scope.service.Tau = "deLta";
         $scope.module.submit = function(){ if(typeof $scope.module.delta==="function")$scope.module.delta(function(){delta()}); else delta();}
         sigma($stateParams.jesua);
      }//end if updating

   };//end function set

   function sigma(jesua){ if($db===false) return;
      RECORD = new $db.get({"jesua":jesua},function(server){
         if(online.verify(server)===false)return;
         var iota = server.notitia.iota[0];

         for(var key in iota){//merge the result with defaultScope setting
            if (iota[key]!==null&&typeof $scope.father[key]!=="undefined"&&$scope.father[key].hasOwnProperty("alpha")){
               //for enumerators get index
               if(typeof $scope.father[key].enum!=="undefined") {$scope.father[key].alpha = $scope.father[key].enum.indexOf(iota[key]);}
               else $scope.father[key].alpha = iota[key];
            }
            else $scope.father[key]=iota[key];
         }
         iyona.deb("Server sigma",server,$scope.father);
      });
      iyona.deb("RECORD",RECORD);
   }//end function sigma
   function alpha(){iyona.info("Creating a new record");
      var consuetudinem;
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);
      RECORD  = new $db();
      angular.extend(RECORD,basilia);
      RECORD.$save();
      iyona.deb(RECORD,basilia);
      /*
      $scope.$parent.msg      = (typeof $scope.$parent.msg !=="undefined")?$scope.$parent.msg:{};
      iyona.deb("VALUES",$scope);
      $scope.$parent.msg.text = "passed value";
      $scope.$parent.msg.err  = false;
      */
   }//end function alpha
   function delta(){iyona.info("Updating a record");
      var consuetudinem;
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);
      RECORD.get({"jesua":$stateParams.jesua},function(server){
         angular.extend(server,basilia);
         server.$save();
         iyona.deb(RECORD,basilia);
      });


//      iyona.deb(RECORD,basilia);
//      RECORD.$save(RECORD,function(server){iyona.deb("SAVED",server);});
   }//end function delta
   function omega(){iyona.info("Deleting the record");}//end function omega
}