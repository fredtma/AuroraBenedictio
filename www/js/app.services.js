angular.module('AlphaOmega.services',['ngResource'])
   .service("online",online)
   .service("helper",helper)
   .service("crud",crud);
//############################################################################//
//CRUD                                                                        //
//############################################################################//
crud.$inject = ["online","helper","$stateParams","$timeout","$state"];
function crud(online,helper,$stateParams,$timeout,$state){
   var that=this,$db,$scope,curNode,curMensa,curDisplay,curTitle,nodeName,nodeDisplay,RECORD,consuetudinem={},submitFunction={};
   that.msg=msg;
   that.set=set;
   that.submitFunction = {
      "new":function(){
         $scope.service.Tau = "Alpha";
         $scope.service.title = "New "+curTitle;
         if(typeof $scope.module.alpha==="function")$scope.module.alpha(function(ndx){alpha(ndx);}); else alpha();},
      "old":function(){
         $scope.service.Tau = "deLta";
         $scope.service.title = curTitle;
         if(typeof $scope.module.delta==="function")$scope.module.delta(function(){delta();}); else delta();},
      "rem":function(rem,ndx){
         rem = rem||$stateParams.jesua;
         if(typeof $scope.module.omega==="function")$scope.module.omega(function(){omega(rem,ndx);}); else omega(rem,ndx);}
   };

   function alpha(ndx){iyona.info("Creating a new record");

      if(validateForm()===false){$scope.$broadcast("failForm");return false;}
      if(typeof $scope.father.created==="undefined") $scope.father.created = new Date().toISOString(); else if ($scope.father.created==="none") delete $scope.father.created;
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);
      RECORD  = new $db();
      angular.extend(RECORD,basilia);
      RECORD.$save(function(server){
         if(online.verify(server)===false){$scope.$broadcast("failForm",server);return false;}
         var notitia = server.notitia;

         //give jesua and service.jesua new value
         iyona.info('stateParams',$stateParams.jesua,ndx,$scope.generations);
         if($scope.generations && isset(ndx) ) {$scope.generations[ndx].jesua = notitia.iota; }
         else if($scope.father.jesua) {
            $scope.father.jesua.alpha = notitia.iota;
            $stateParams.jesua = notitia.iota;
            $state.go($state.$current,{"jesua":notitia.iota},{ location: true, inherit: true, relative: $state.$current, notify: false, reload:false });//change url when creating
         }

         $scope.module.submit = that.submitFunction.old;//change the value of the submit function to delta
         setConsuetudinem(server.notitia);
         iyona.msg(server.notitia.msg,false,'balanced');
         $scope.$broadcast("newForm",server.notitia);
      });

   }//end function alpha
   function delta(){iyona.info("Updating a record");

      if(validateForm()===false){$scope.$broadcast("failForm");return false;}
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);
      var jesua   = isalpha($scope.father.jesua)||$stateParams.jesua;//check the value of jesua from the scope or the url
      delete RECORD.notitia;
      iyona.on("jesua",jesua,$scope.father.jesua,$stateParams.jesua);
      angular.extend(RECORD,basilia);

      RECORD.$militia({"jesua":jesua},function(server){
         if(online.verify(server)===false){$scope.$broadcast("failForm",server);return false;}
         var notitia = server.notitia;
         setConsuetudinem(server.notitia);
         iyona.msg(notitia.msg,false,'balanced');
         $scope.$broadcast("editForm",server.notitia);
      });
   }//end function delta
   function msg(msg,permanent,clss){
      if(!msg) return;
      iyona.info(msg);
      clss=!isset(clss)||clss===true? "balanced": (clss===false||clss===0)?"assertive":clss;
      clss=permanent!==true?clss+" blink_me":clss;
      $scope.$parent.msg = {"text":msg,"clss":clss};
      if(permanent!==true)$timeout(function(){$scope.$parent.msg=false; },5000);
   };
   function omega(jesua,index){iyona.info("Deleting the record",jesua);

      if(!jesua){iyona.msg("You need to add a new record first.",false,"assertive bold"); return false;}
      RECORD.$delete({"jesua":jesua},function(server){iyona.on("server server server",server);
         if(online.verify(server)===false)return;
         if(index)$scope.generations.splice(index,1);
         iyona.msg(server.notitia.msg,false,'balanced');
      });
   }//end function omega
   function set(scope,node,display){

      $scope      = scope;//set the variable to the private var
      nodeName    = node;
      nodeDisplay = display;
      curNode     = eternalCall(node,display);//retrieve the eternal scope
      if(curNode===false) {iyona.err("The defaultScope was not found"); return false;}
      curMensa    = curNode.mensa;
      curDisplay  = curNode.display;
      curTitle    = curNode.title;
      $scope.module = isset($scope.module)?$scope.module:{};
      //setup on $scope the module, service, father, child
      angular.extend($scope,{"father":curDisplay.fields,"child":curDisplay.child,"service":{"title":curTitle},"display":{} });
      angular.extend(consuetudinem,{"child":curDisplay.child,"uProfile":nodeName,"uDisplay":nodeDisplay});

      helper.set(scope,node,display);//set the module on the $scope.module property
      $db = online.notitia({"view":"form","call":"benedictio","mensa":nodeName,"display":nodeDisplay});

      $scope.module.delete = this.submitFunction.rem;
      //NEW::new creationg
      if($stateParams.jesua==="new" || $stateParams.jesua==="") {
         $stateParams.jesua   = null;
         $scope.service.jesua = null;
         $scope.module.submit = this.submitFunction.new;
      }//LIST:: listing of all
      else if($stateParams.jesua==="list"){
         $stateParams.jesua = null;
         $scope.service.Tau = "sigma";
         sigmaList();
      }//SEARCH:: customer search
      else if($stateParams.search && $stateParams.jesua!==null && $stateParams.jesua!==""){
         $db = online.notitia({"view":"form","call":"benedictio","mensa":nodeName,"display":nodeDisplay,"jesua":$stateParams.jesua,"fields":$stateParams.field});
         $scope.service.jesua = $stateParams.jesua.length!==32?null:$stateParams.jesua;//new vs old
         $scope.service.Tau   = "sigma";
         $scope.module.submit = $stateParams.jesua.length!==32?this.submitFunction.new:this.submitFunction.old;//new vs old
         sigmaList();
      }//EDIT
      else if($stateParams.jesua!==null && $stateParams.jesua!==""){
         $scope.service.jesua = $stateParams.jesua;
         $scope.module.submit = this.submitFunction.old;
         sigma($stateParams.jesua);
      }//end if updating

   };//end function set
   function setConsuetudinem(notitia){

      if( isset(notitia.consuetudinem)){
         var cons=notitia.consuetudinem,$parentSocpe=$scope.$parent;
         $parentSocpe.licentia=$parentSocpe.licentia||{};
         $parentSocpe.licentia.jesua="licentia";//la cle pour maitre dans la donner iDB
         if(isset(cons.child))     angular.extend($scope.child,cons.child);
         if(isset(cons.licentia))  angular.extend($parentSocpe.licentia,cons.licentia);
         return cons;
      }
      return false;
   }
   function sigma(jesua){ if($db===false) return;

      RECORD = new $db.get({"jesua":jesua},function(server){
         if(online.verify(server)===false)return;
         var iota = server.notitia.iota[0];setConsuetudinem(server.notitia);
         alphaMerge(curDisplay,iota,$scope);

         $scope.$broadcast("readyForm",server.notitia);iyona.on("Selected record server and father");iyona.msg(server.notitia.msg,false,'balanced');
      });
   }//end function sigma
   function sigmaList(){ if($db===false) return;

      RECORD = new $db.get(function(server){
         if(online.verify(server)===false)return;
         var iota = server.notitia.iota;
         $scope.parent = curDisplay;
         $scope.generations=(server.notitia.iota instanceof Array)?server.notitia.iota:[];
         setConsuetudinem(server.notitia);
         $scope.$broadcast("readyList",server.notitia);iyona.msg(server.notitia.msg,false,true);
      });
   }//end function sigma
   function validateForm(){
      var form = $scope.formScope,dataForm=form.dataForm,msg='';
      if(dataForm.$dirty===false) msg = " No changes detected on the form";
      if(dataForm.$dirty && dataForm.$valid) return true;

      $scope.service.isValide = 'isNotValide';
      iyona.msg("The form is not valid, verify that all field are correct."+msg,true,false);
      iyona.on("Validation form=",form,'dataForm=',dataForm);
      return false;
   }

}
//############################################################################//
//HELPER                                                                      //
//############################################################################//
//the helper is there to set the name of method that will be used by the $scope
helper.$inject = ["$ionicPopup","$ionicActionSheet","$state"];
function helper($ionicPopup,$ionicActionSheet,$state){
   var curNode,$scope,that=this;

   that.action       =action;
   that.addChild     =addChild;
   that.barscan      =barscan;
   that.enumWalk     =enumWalk;
   that.getPicture   =getPicture;
   that.goTo         =goTo;
   that.initForm     =initForm;
   that.logoff       =logoff;
   that.reorderItem  =reorderItem;
   that.set          =set;
   that.showMe       =showMe;

   function action(text){

      var title,submitTxt,buttons,custModule;
      title = curNode.display.title;

      if(!$scope.service.jesua){text = text||'Create '; submitTxt = "<i class='icon ion-ios7-paper-outline' i></i> "+text+title;}
      else {text=text||'Update ';submitTxt = "<i class='icon ion-ios7-compose-outline' i></i> "+text+title;}
      //create default submit and add custom action modules, this includes text & module to be called.
      buttons = [{"text":submitTxt,"type":"submit"}];
      if(curNode.display.action instanceof Array){buttons = buttons.concat(curNode.display.action);}

      var actionSheet = $ionicActionSheet.show({
         "titleText":"Take Action",
         "buttons":buttons,
         "cancelText":"<i class='icon ion-ios7-close-outline' i> Cancel Action",
         "destructiveText":"<i class='icon ion-ios7-trash-outline' i> Delete Article",
         "buttonClicked":function(index){
            iyona.off("button clicked is",index);
            switch(index){
               case 0:
                  //_$("#dataForm")[0].submit();
                  $scope.module.submit();
                  break;//note submit is setup to update or create in the crud service.
               default://buttons has all the custome module & text, select the custome module via the index
                  custModule = buttons[index].module;
                  iyona.on(custModule,buttons,$scope.module,typeof $scope.module[custModule]);
                  if(typeof $scope.module[custModule]==="function") $scope.module[custModule].call();
                  else if(typeof buttons[index].goto ==="string") $state.go(buttons[index].goto);
                  else if(typeof buttons[index].goto ==="object") $state.go(buttons[index].goto.call,buttons[index].goto.params,{"reload":false});
                  break;
            }actionSheet();
         },
         "cancel":function(){iyona.off("cancel button clicked ");},
         "destructiveButtonClicked":function(){$scope.module.delete(); actionSheet();}
      });
   }
   function addChild(set,newObj){

      $scope.display[set]=false;
      $scope.child.gerund[set]['data'].push(newObj);
   }
   function barscan(){
      if(typeof cordova === "undefined"){
         iyona.info("cordova not setup");
         var result = {"text":"new item","format":"string","cancelled":false};
         $state.go('call.article',{"jesua":"create","field":"barcode","search":result.text});
         return;
      }

      cordova.plugins.barcodeScanner.scan(
         function(result){iyona.on("Result",result);
            $ionicPopup.alert({"title":"Captured Content","template":"Result: "+result.text+"\n"+"Format: "+result.format+"\n"+"Candelled: "+result.cancelled});
            $state.go('call.article',{"jesua":"create","field":"barcode","search":result.text});
         },
         function(err){$ionicPopup.alert("Scanning failed: "+err);}
      );
   }
   function enumWalk(opt,index){
      if(typeof index==="undefined"){
         var selected = $scope.father[opt].alpha? $scope.father[opt].alpha:0;
         selected++;

         if(typeof $scope.father[opt].enum[selected]!=="undefined")$scope.father[opt].alpha=selected;
         else $scope.father[opt].alpha = 0;
      }else if($scope.parent){
         var value = $scope.generations[index][opt]? $scope.generations[index][opt]: 0;
         var selected = typeof value==="string"?$scope.parent.fields[opt].enum.indexOf(value):value;
         selected++;

         if(typeof $scope.parent.fields[opt].enum[selected]!=="undefined")$scope.generations[index][opt]=selected;
         else $scope.generations[index][opt] = $scope.parent.fields[opt].enum[0];
      }
   }
   function getPicture(e,field,ele,filename,ndx){
      //native browser
      if(typeof navigator.camera === "undefined") {
         var file,reader;
         $scope.service.tmp = isset(ndx)?ndx:isset($scope.service.tmp)?$scope.service.tmp:null;//this stores the ndx in a tmp. when calling from a desktop the function is called x2, the 2nd time it does not have ndx, heance why it's stored
         ndx = isset(ndx)?ndx:$scope.service.tmp;

         if(!e || (e.target.type!=='file' && !isset(ele)) ) {iyona.msg("Camera option not available.",false,true); return false;}
         else if(e.target.type!=='file' && isset(ele)){_$(ele)[0].click(); return false;}
         iyona.err("Camera option not available.",e.target,ele);

         file = e.target.files[0];//{name,size,type}
         if(!isset(file)) {iyona.msg("Camera option not available.",false,true); return false;}
         else if(file.type!=='image/jpeg') {iyona.msg("Only Jpeg images are allowed"); return false;}
         else if (file.size >1000000)  {iyona.msg("The selected file is larger than 1MB."); return false;}
         reader = new FileReader();
//         reader.readAsBinaryString(file);//for binary
         reader.readAsDataURL(file);
         reader.onload = function(evt){

            if(!ndx)_$(".captureImg")[0].src = evt.target.result;
            else _$(".img"+ndx)[0].src = evt.target.result;

            $scope.$apply(function(){
               $scope.father[field] = {"alpha":evt.target.result,"icon":filename||file.name,"type":file.type};
               if(isset(ndx))$scope.generations[ndx][field] = {"alpha":evt.target.result,"icon":filename||file.name,"type":file.type};
               iyona.on('generation',ndx,$scope.generations[ndx]);
            });
            iyona.off('event',evt,$scope.father[field],'---',file);
         }
         $scope.formScope.dataForm.$dirty = true;
         return false;
      }
      //mobile camera available
      navigator.camera.getPicture(
         function(img){
            iyona.info("Capturing image",Camera);
            e.target.src = "data:image/jpeg;base64,"+img;
            if (img >1200000)  {iyona.msg("The selected file is larger than 1MB."); return false;}
            $scope.father[field] = {"alpha":img,"icon":filename||"image.jpg","type":"image/jpeg"};
            if(isset(ndx))$scope.generations[ndx][field] = {"alpha":img,"icon":filename||"image.jpg","type":"image/jpeg"};
            $scope.formScope.dataForm.$dirty = true;
         },
         function(err){$ionicPopup.alert({"title":"Image Capture","template":"Could not capture the image::"+err}).then(function(){iyona.info("The image was no image captured::"+err);}); },
         {"quality":100,"destinationType":Camera.DestinationType.DATA_URL,"correctOrientation":true});
   }
   function goTo(label,option){$state.go(label,option);}
   function initForm(form){
      iyona.off("initForm",form,$scope);
      $scope.formScope = form;
      if(isset($scope.$parent.formScope)) {
         $scope.$parent.formScope.push(form);
         $scope.formScope = $scope.$parent.formScope[0];}//use for multiple form and innitial to the 1st form.
      else $scope.$parent.formScope = [form];
      $scope.service.patterns = dynamis.get("EXEMPLAR");
   }
   function logoff(){

      $ionicPopup.confirm({"title":"Exit Applicaiton","template":"Are you sure you want to exit?"})
      .then(function(res){
         if(res){
            ionic.Platform.exitApp();
            dynamis.clear();
            iyona.err("Application is closing.");
            if(!ionic.Platform.isWebView()) {dynamis.clear(true); that.goTo("call.dash");}
         }
         else {console.info("Not closing");}
      });

   }
   function reorderItem(item,from,to){
      //Move the item in the array
      $scope.generations.splice(from, 1);
      $scope.generations.splice(to, 0, item);
      iyona.on("Ordering",item,from,to);
   }
   function set(scope,node,display){

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
   }//end func set
   function showMe(opt){//used to display a field on and off
      $scope.display[opt]=true;
   }
}
//############################################################################//
//ONLINE                                                                      //
//############################################################################//
/*
 * online, is used to access the online db
 * @param {function} callback, the call back function for the results
 * @param {string} caller, when using the API to call a report
 * @returns {undefined}
 */
online.$inject = ["$resource","$http","$timeout","$q"];
function online($resource,$http,$timeout,$q) {
   var that=this;
   var isViewLoading={"width": "100%", "display": "block"};
   this.responseType=this.responseType||"json";//async calls

   that.principio = principio;
   that.notitia   = notitia;//setup the API
   that.msg       = msg;
   that.post      = post;
   that.verify    = verify;//general function used to verify the server received data.

   function msg(msg,permanent,clss){
      if(!msg) return;
      iyona.info(msg);
      clss=!isset(clss)||clss===true? "balanced": (clss===false||clss===0)?"assertive":clss;
      clss=permanent!==true?clss+" blink_me":clss;
      var $scopeLayout = _$("#notification").scope();
      $scopeLayout.msg = {"text":msg,"clss":clss};
      if(permanent!==true)$timeout(function(){$scopeLayout.msg=false; },5000);
   }
   function notitia(params){

      var view = ":call,:view,:jesua,:mensa,:display";
      params   = params||{};
      //@todo: check connection mobile & desktop
      if (checkConnection()) {
         var service = $resource(dynamis.get("SITE_API")+view, params, {"militia": {"method": "PUT", isArray: false, "cache": true, "responseType": "json", "withCredentials": true}});
         return service;
      }else{
         iyona.msg("You are currently offline", true, "danger bold");
         isViewLoading = {"display": "none"};
         return false;
      }
   }//endufntion notitia
   function post(url,params,callback){

      var deferred=$q.defer(),promise=deferred.promise,msg;
      if(!checkConnection()){iyona.msg("Your device is currently Offline.",true,false); return false;}//@todo

      $http.post(url,params,{"responseType":this.responseType,"cache":true,"headers":{"Content-Type":"application/x-www-form-urlencoded"},"withCredentials":true})
      .success(function(server){
         isViewLoading = {"display":"none"};
         if(typeof callback==='function')callback(server);
         else deferred.resolve(server);
      })
      .error(function(data,status,headers,config){
         isViewLoading = {"display":"none"};
         msg="There was an error in handling the transaction";
         iyona.msg(msg,true,'danger bold');
         if(data&&"err" in data){iyona.msg(data.err,true,"danger",true);msg=data.err;}
         deferred.reject({'msg':msg,'data':data,'status':status,'headers':headers,'config':config});
         iyona.on(data,status,headers,config,config.url);
      });
      return promise;
   }
   function principio(){//kick start the storage system, used upon login or application start
      //@todo://
   }
   function verify(server){

      isViewLoading = {"display": "none"};
      if (server.notitia && (typeof server.notitia.sql !== "undefined" || typeof server.notitia.quaerre !== "undefined")) iyona.info("QUAERRE", server.notitia.sql || server.notitia.quaerre);
      if (server.notitia && server.notitia.idem !== 0) {//cookie
         var u = dynamis.get("USER_NAME", true) || {};
         u.cons = server.notitia.idem;
         dynamis.set("USER_NAME", u, true);
      }//pour maitre un autre biscuit
      if(typeof server.notitia !=="undefined" && typeof server.notitia.err !=="undefined") { iyona.err(server.notitia.err,server.notitia.msg); iyona.msg(server.notitia.msg,true,false); return false;}
      else if(typeof server.notitia !=="undefined" && typeof server.notitia.iota !=="undefined") return server;
      else {iyona.msg('An Online error occure and the transaction did not go through',false,true);return false;}
   }//end verify
}

