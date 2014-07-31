/*
 * library helper functions
 * hasFormValidation
 * load_script
 * objectSize
 * timeFrame
 * ucwords
 * ucfirst
 * alphaNumertic
 * readWorker
 * callWorker
 * setQuaerere
 * checkConnection
 * objSearch
 * timeDifference
 * downloadURL
 * uRand

 * GPLUS_USER
 * GET_IAMGE
 */

//============================================================================//CONFIG

/*
 * The config needs to be a function in order for the user to login again after a logout clear session.
 */

function configuration(){}
configuration.prototype.config=function(){
   var isChrome=(typeof chrome !== "undefined" && typeof chrome.app.window!=="undefined");
   var i = (isChrome)?'':(true)?'i/':'';
   var conf;

   sessionStorage.startTime   = new Date().getTime();
   sessionStorage.runTime     = new Date().getTime();
   sessionStorage.SITE_NAME   = "Aurora benedictio";
   sessionStorage.SITE_DATE   = 'fullDate';
   sessionStorage.SITE_TIME   = 'mediumTime';
   sessionStorage.SITE_LOCA   = 'benedictio';
   sessionStorage.SITE_URL    = 'https://demo.xpandit.co.za/aura/';
   sessionStorage.SITE_API    = sessionStorage.SITE_URL+i;
   sessionStorage.SITE_SERVICE= sessionStorage.SITE_URL+i+'services';
   sessionStorage.SITE_MILITIA= sessionStorage.SITE_URL+i+'notitia';
   sessionStorage.SITE_ALPHA  = sessionStorage.SITE_URL+i+'alpha';
   sessionStorage.SITE_CONNECT= sessionStorage.SITE_URL+i+'is-connect';
   sessionStorage.SITE_ALIQUIS= sessionStorage.SITE_URL+i+'aliquis';
   sessionStorage.SITE_UPLOADS= sessionStorage.SITE_URL+'uploads/';
   sessionStorage.MAIL_SUPPORT= 'support@xpandit.co.za';
   sessionStorage.DB_NAME     = 'app_xpandit';
   sessionStorage.DB_VERSION  = 1;//always use integer bcos of iDB
   sessionStorage.DB_DESC     = 'The local application Database';
   sessionStorage.DB_SIZE     = 15;
   sessionStorage.DB_LIMIT    = 20;
   conf = {
      "Worker":         window.hasOwnProperty('Worker'),
      "openDatabase":   "openDatabase" in window,
      "indexedDB":      "indexedDB" in window||"webkitIndexedDB" in window||"mozIndexedDB" in window||"msIndexedDB" in window,
      "WebSocket":      window.hasOwnProperty('WebSocket'),
      "history":        window.hasOwnProperty('history'),
      "formValidation": hasFormValidation(),
      "useWorker":      true,
      "useIDB":         true,
      "useWebSql":      false,
      "useJSvalidation":true,
      "isOnline":       navigator.onLine,
      "Online":         true,//used in online service
      "projectID":      "17238315752",
      "chromeApp":      (typeof chrome !== "undefined" && typeof chrome.app.window!=="undefined")
   };
   sessionStorage.SITE_CONFIG   = JSON.stringify(conf);
   iyona.sync({"url":sessionStorage.SITE_URL+'json/caecus-benedictio.json',"method":"get","format":"json","callback":function(data){
      iyona.off("eternalScope-",data);
      dynamis.set("eternal",data,true);
   }});
   dynamis.set("EXEMPLAR",{
      "username":["^[A-Za-z0-9_]{6,15}$","requires at least six alpha-numerique character"],
      "pass1":["((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})","requires complex phrase with upperCase, lowerCase, number and a minimum of 6 chars"],
      "pass2":["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$","requires complex phrase with upperCase, lowerCase, number and a minimum of 6 chars"],
      "password":["(?=^.{6,}$)((?=.*[0-9])|(?=.*[^A-Za-z0-9]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
      "pass3":["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
      "fullDate":["(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))","follow the following date format (YYYY-MM-DD)"],
      "phone":["[\(]?[0-9]{3}[\)]?[\-|\ ]?[0-9]{3}[\-|\ ]?[0-9]{4}","follow the format of 011-222-3333"],
      "minMax":["[a-zA-Z0-9]{4,8}","requires at least four to eight character"],
      "number":["[-+]?[0-9]*[.,]?[0-9]+","requires a numberic value"],
      "url":["^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$","requires a valid URL"],
      "colour":["^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$","requires a valid colour in the form of (#ccc or #cccccc)"],
      "bool":["^1|0","requires a boolean value of 0 or 1"],
      "email":["^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$","the email address is not the right formated"],
      "single":["^[a-zA-Z0-9]","requires a single value"]});
   return this;
};
//============================================================================//LOGGER
/*
 * @cons:the representation of the console.log
 * @stack:the stack used to display the line number
 * @obj: an array of object are passed and consoled for each
 * @info:permanent,preferably a single line of formated colour text
 * @msg: displays a message on the interphase
 * @deb: the debbuger for all viriables
 * @sync:ajax obj call with the parms {method,format,url,var}
 */
iyona={
   view: true,
   cons: console.log,
   stack:function(){
      var isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
      if(isChrome||true){
         var stack = new Error().stack,n=isChrome?3:2;
         var file = stack.split("\n")[n].split("/");
         return '('+file[file.length-1]+')';}
      else{return '';}
   },
   obj:  function(){
      var l=arguments.length;
      for(var x=0;x<l;x++){
         if(typeof arguments[x]==="function") console.log(encodeURI(arguments[x].toString()));
         else if(typeof arguments[x]==="undefined"||arguments[x]===null){ console.log("<null>");}
         else if (typeof arguments[x]==="object") {for (var index in arguments[x]) console.log(index+'='+arguments[x][index]);}
         else console.log(arguments[x]);
      }
   },
   info: function(){
      arguments[arguments.length++]=this.stack();
      console.info('%c'+arguments[0],'background:#0099ff;color:#efefef;width:100%;display:block;font-weight:bold;',arguments);
   },
   err: function(){
      arguments[arguments.length++]=this.stack();
      console.warn('%c'+arguments[0],'background:#ff0000;color:#ececec;width:100%;display:block;font-weight:bold;',arguments);
   },
   msg:  function(msg,permanent,clss){
      console.info(arguments);
      clss=clss||'';
      _$("#notification span").html(msg).removeClass().addClass('blink_me '+clss);
      if(permanent!==true)setTimeout(function(){_$("#notification span").html("...").removeClass('blink_me');},5000);
   },
   deb:  function(){
      if(this.view){
         arguments[arguments.length++]=this.stack();
         this.cons.apply(console,arguments);
      }
   }/*break down all set var into arr, custom debug msg re-created*/,
   off:  function(){},
   on:   this.deb,
   sync: function(settings){//{method,format,url,params,callback}
      var xhr=new XMLHttpRequest(),params;

      xhr.open(settings.method,settings.url,true);
      xhr.responseType=settings.format;
      xhr.onreadystatechange=function(e){
         if(this.readyState===4 && this.status===200){
            var response=this.response||"{}";//@fix:empty object so as to not cause an error
            if(typeof response==="string"&&settings.format==="json")response=JSON.parse(response);//wen setting responseType to json does not work
            if(typeof settings.callback==="function")settings.callback(response);
         }
      }//xhr.onload=function(e){iyona.deb("III",e,this.readyState,this.status,this.response);};

      if(typeof settings.params==="object"){
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");params=JSON.stringify(settings.params);
      }else{
         params=settings.params;xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      };
      if(settings.format==="json"){
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");//questionable, to be removed?
         xhr.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;application/json;q=0.9,*/*;q=0.8");//used in FF
      }
      xhr.onerror=function(e){this.deb(e);};
      xhr.send(params);
   }
};
//============================================================================//STORAGE
/*
 * used to store to storage to json objects
 */
dynamis={
   set:function(_key,_value,_local){//chrome.app.window
      var set={},string;set[_key]=_value;var isChrome=(typeof chrome !== "undefined" && typeof chrome.app.window!=="undefined");string=JSON.stringify(_value);
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local===true){chrome.storage.local.set(set);sessionStorage.setItem(_key,string);}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.set(set);sessionStorage.setItem(_key,string);}
      else if(_local===true&&!isChrome){localStorage.setItem(_key,string);}
      else{sessionStorage.setItem(_key,string);}//endif
   },
   get:function(_key,_local){
      var value,isChrome=(typeof chrome !== "undefined" && typeof chrome.app.window!=="undefined");
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local===true){chrome.storage.local.get(_key,function(obj){return obj[_key];});value=sessionStorage.getItem(_key);return (value&&value.indexOf("{")!==-1)?JSON.parse(value):value;}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.get(_key,function(obj){return obj[_key];});value=sessionStorage.getItem(_key);return (value&&value.indexOf("{")!==-1)?JSON.parse(value):value;}
      else if(_local===true&&!isChrome){value=localStorage.getItem(_key);return (value&&value.indexOf("{")!==-1)?JSON.parse(value):value;}
      else{value=sessionStorage.getItem(_key);return (value&&value.indexOf("{")!==-1)?JSON.parse(value):value;}//endif
   },
   del:function(_key,_local){var isChrome=(typeof chrome !== "undefined" && typeof chrome.app.window!=="undefined");
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local===true){chrome.storage.local.remove(_key);sessionStorage.removeItem(_key);}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.remove(_key);sessionStorage.removeItem(_key);}
      else if(_local===true&&!isChrome){localStorage.removeItem(_key);}
      else{sessionStorage.removeItem(_key);}//endif
   },
   clear:function(_local){var isChrome=(typeof chrome !== "undefined" && typeof chrome.app.window!=="undefined");
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local===true){chrome.storage.local.clear();}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.clear();}
      else if(_local===true&&!isChrome){localStorage.clear();}
      else{sessionStorage.clear();}//endif
   }
};
//============================================================================//
(function(opt){var settings = new configuration();settings.config(); })()//run the configurations
_$=function(element){if(typeof element=="string")return angular.element(document.querySelectorAll(element)); else return angular.element(element);}
//============================================================================//
/*
 * check if the browser supports html5 validation
 * @author fredtma
 * @version 2.1
 * @category validation,form
 * @return bool
 */
function hasFormValidation() {
    return (typeof document.createElement( 'input' ).checkValidity === 'function');
}
//============================================================================//
/**
 * load a script dynamically in the header tag
 * @author fredtma *
 * @version 1.2
 * @category dynamic, script
 * @param string <var>url</var> the path of the script to be loaded
 * @param string <var>sync</var> load the script with async option on
 * @return void
 */
function load_script(urls,sync,position,fons){
   var s,ele,c,url;iyona.deb("LOADS",urls, typeof urls);
   var script=document.createElement('script');
   if(typeof urls==="string") url=urls;
   else {url=urls[0]; urls.shift();}

   s=document.querySelector('script[data-fons]');
   c=document.querySelector('script[src="'+url+'"]');
   if(c)return false;
   if(!position)ele=document.getElementsByTagName('head')[0];
   else if(position==='end')ele=document.getElementsByTagName('body')[0];

   if(s)_$(s).remove();//ele.removeChild(s);
   if (sync !== false) script.async = true;
   script.src  = url;script.type="text/javascript";
   if(fons){script.setAttribute('data-fons',fons);}
   script.onreadystatechange = function(){iyona.info("Loaded script StateChange "+url);};
   script.onload = function(){if(typeof urls==="object"&&urls.length>0) load_script(urls,sync,position,fons);};;
   ele.appendChild(script);
}
//============================================================================//
/**
 * get the size of an object
 *
 * It will verify all the variable sent to the function
 * @author tomwrong
 * @category object,size
 * @see http://stackoverflow.com/questions/1248302/javascript-object-size
 * @return bytes
 */
function objectSize(object) {
    var objectList=[];var stack=[object];var bytes=0; var cnt=0; var i;
    while ( stack.length ) {
        var value = stack.pop();
        if ( typeof value === 'boolean') {bytes += 4;}
        else if(typeof value === 'string') {bytes += value.length * 2;}
        else if(typeof value === 'number') {bytes += 8;}
        else if(typeof value === 'object'&& objectList.indexOf( value ) === -1)
        {
           objectList.push( value );
           for( i in value ){
              stack.push( value[ i ] );
              cnt++;
              if(cnt>500)return bytes;
           }
        }
    }
    return bytes;
}
//============================================================================//
/**
 * measure two time frame from the begining of the script TimeElapse
 * for the current script TimeFrame
 * @author fredtma
 * @version 0.8
 * @category performance
 */
function timeFrame(_from,_total){
   var endTime,from,elapse;
   endTime  = new Date().getTime();
   from     = endTime-sessionStorage.runTime;
   elapse   = endTime-sessionStorage.startTime;
   iyona.info('TimeFrame:'+_from+' '+from);
   if(_total)iyona.info('TimeElapse:'+_from+' '+elapse);
   sessionStorage.runTime=endTime;
}
//============================================================================//
/**
 * used in a similar way as the php version of ucwordsn
 * @author fredtma
 * @version 0.2
 * @category string
 * @param string <var>str</var> is the string that will be converted
 * @see PHP ucwords
 * @return string
 */
function ucwords(str)
{
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}//end function
//============================================================================//
function ucfirst(word){if(!word)return false; return word.charAt(0).toUpperCase() + word.substring(1);}
//============================================================================//
/**
 * change into alpha numerical, with no spacing
 * @author fredtma
 * @version 0.3
 * @category string
 * @param string <var>the_str</var> the input string to be changed
 * @param boolean <var>transform</var> choses to make it upper case or not
 * @see ucwords
 * @return string
 */
function alphaNumeric(the_str,transform)
{
   the_str   = the_str.toLowerCase();
   the_str   = (transform)?ucwords(the_str.toLowerCase()): the_str;
   the_str   = the_str.replace(/[^A-Za-z0-9\s]*/ig,'');
   return the_str;
}
//============================================================================//
/**
 * the return value of the worker.
 * @author fredtma
 * @version 3.1
 * @category worker
 * @param object <var>notitiaWorker</var> the worket object
 */
function readWorker(notitiaWorker,callback){
   notitiaWorker.addEventListener('message',function(e){
      if(e.data==="licentia")licentia();
      if(e.data==="reset progress"){profectus("starting db reset",true,10);}
      if(e.data.progress===true){profectus(e.data.resetTable);}
      if(callback)callback(e.data,notitiaWorker);
   },false);
   notitiaWorker.addEventListener('error',function(e){
      iyona.info("Worker on strike "+e.message,true);
   },false);
}
//============================================================================//
/**
 * showrcut to make a call to the worker
 * @author fredtma
 * @version 3.2
 * @category worker, background
 * @param object <var>option</var> the option to be passed to the worker
 * @return void
 */
function callWorker(option,callback){
   var ext=(typeof $!=="undefined")?$.extend:angular.extend,moli=screen.height*screen.width;
   var opt=ext({},
      {
         "procus":dynamis.get("USER_NAME").singularis,
         "moli":moli,
         "DB_VERSION":sessionStorage.DB_VERSION,
         "eternalScope":dynamis.get("eternalScope",true),
         "SITE_SERVICE":sessionStorage.SITE_SERVICE,
         "SITE_MILITIA":sessionStorage.SITE_MILITIA
      },option);
   if(window.Worker&&impetroUser()){
      var notitiaWorker=new Worker("js/biliotheca/worker.notitia.js");
      notitiaWorker.postMessage(opt);
      readWorker(notitiaWorker,callback);
   }
}
//============================================================================//
/*
 * get the user's data whether saved in session or local session.
 */
function impetroUser(){
   var USER_NAME=dynamis.get("USER_NAME",true)?dynamis.get("USER_NAME",true):(dynamis.get("USER_NAME"))?dynamis.get("USER_NAME"):false;
   return USER_NAME;
}
//============================================================================//
/**
 * cette fonction et utiliser pour cree les donner a envoyer dans la DB
 * @author fredtma
 * @version 2.3
 * @category database, query
 * @param array </var>theValue</var> the desc Comment
 * @return object
 */
function setQuaerere(mensa,res,tau,consuetudinem) {
    var procus=impetroUser(),moli=screen.height*screen.width,cons=consuetudinem||0;
    var quaerere={"eternal":res,"Tau":tau,"mensa":mensa,"procus":procus.jesua||0,"moli":moli,"consuetudinem":cons,"cons":procus.cons||0,"location":sessionStorage.SITE_LOCA};
    dynamis.set("quaerere",JSON.stringify(quaerere));
    return quaerere;
}
//=============================================================================//
function checkConnection() {
   var networkState;
   if(typeof navigator.connection!=="undefined")var networkState = navigator.connection.type;
   else if(typeof navigator.network!=="undefined")var networkState = navigator.network.connection.type;
   else return navigator.onLine;


   var states = {};
   states[Connection.UNKNOWN] = 'an Unknown connection';
   states[Connection.ETHERNET] = 'an Ethernet connection';
   states[Connection.WIFI] = 'a WiFi connection';
   states[Connection.CELL_2G] = 'a Cell 2G connection';
   states[Connection.CELL_3G] = 'a Cell 3G connection';
   states[Connection.CELL_4G] = 'a Cell 4G connection';
   states[Connection.NONE] = 'with No network connection';
   iyona.info('Connection type is ' + states[networkState],networkState);
   return networkState;

}
//============================================================================//
/**
 * use prototype to add a function that searches an object value
 * @author fredtma
 * @version 2.3
 * @category search, object
 * @param array </var>value</var> the value to search in the object
 * @return bool
 */
function objSearch(ele,value){
   var key,l,found=false,obj;
   if(ele instanceof Array){
      l=ele.length;
      for(key=0;key<l;key++){obj=ele[key];
         if(typeof obj==='object' )found=objSearch(obj,value);
         if(found!==false) return [found,key];
         if(typeof obj==="string"&&obj.indexOf(value)!==-1 ) return [ele,key];
      }
   }
    for(key in ele ) {obj=ele[key];
        if(typeof obj==='object' )found=objSearch(obj,value);
        if(found!==false) return [found,key];
        if(typeof obj==="string"&&obj.indexOf(value)!==-1 ) return [ele,key];
    }
    return false;
}
//============================================================================//
/**
 * calculate the date difference and returns the value in human language.
 * @author fredtma
 * @version 0.5
 * @category iyona
 * @param array </var>Comment</var> the desc
 * @see get_rich_custom_fields(), $iyona
 * @return void|bool
 * @todo finish the function on this page
 * @uses file|element|class|variable|function|
 */
function timeDifference(t) {
    var day=1000*60*60*24,hour=1000*60*60,minute=1000*60,cur=new Date().getTime(),dif,set;
    var time = new Date(t).getTime();dif=(cur-time);
    var minutes = Math.ceil(dif/minute);
    if( minutes < 2) set=Math.ceil(dif/1000)+' Second';
    else if(minutes < 60) set=minutes+' minute';
    else if(minutes < 60*24) set=Math.ceil(dif/hour)+' hour';
    else set=Math.ceil(dif/day)+' day';
    if(dif>1)set+='s';
    return set;
}
//============================================================================//
//@http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};
//============================================================================//
/**
 * creates a unique id based upon time
 * @author fredtma
 * @version 1.2
 * @category random,generation
 */
function uRand(len,num,date,bin) {
    var possible,
    d = new Date(),text=d.getDate()+''+d.getMonth(),l;
    possible = (num===true)?"0123456789":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    l    = possible.length;
    len  = len||5;
    text = (date===true)?text:'';

    for( var i=0; i < len; i++ ){
       text += possible.charAt(Math.floor(Math.random() * l));
       if(i%2 && i!=0 && num!==true) {text+=Math.floor(Math.random() * 90)+10;i++;}
    }
    text = (date===true)?text+''+d.getMinutes()+''+d.getHours():text;
    text = (num===true && bin===true)? (+parseInt(text)).toString(2):text;
    return text;
}
//============================================================================//
function eternalCall(node,display){
   var eternal    = dynamis.get("eternal",true);
   var curNode    = eternal[node];
   var curMensa   = curNode.mensa;
   var curDisplay = curNode[display];
   var curTitle   = curDisplay.title;
   return {"scope":curNode,"mensa":curMensa,"display":curDisplay,"title":curTitle};
}
//============================================================================//


//============================================================================//
//GOOGLE API USER DETAILS                                                     //
//============================================================================//
function GPLUS_USER() {
   // @corecode_begin getProtectedData
   this.access_token, this.user_info,this.callFunction;//public
   var callback,retry,that=this;//private
   this.getToken = function(method, url, interactive, callBack) {
      retry = false;
      callback = callBack;
      chrome.identity.getAuthToken({"interactive": interactive}, function(token) {
         if (chrome.runtime.lastError) {
            callback(chrome.runtime.lastError); return;
         }
         that.access_token = token;
         that.requestStart(method, url);
      });
   };

   this.requestStart = function(method, url) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
      xhr.onload = this.requestComplete;
      xhr.send();
   };

   this.requestComplete = function() {
      if (this.status === 401 && retry) {
         retry = false;
         chrome.identity.removeCachedAuthToken({token: this.access_token}, this.getToken);
      } else {
         callback(null, this.status, this.response);
      }
   };

   this.getUserInfo = function(interactive,callFunction) {
      this.callFunction=callFunction;
      this.getToken('GET', 'https://www.googleapis.com/plus/v1/people/me', interactive, this.onUserInfoFetched);
   };

   this.onUserInfoFetched = function(error, status, response) {
      if (!error && status === 200) {
         that.user_info = JSON.parse(response);//displayName,image
         that.callFunction(that.user_info,that.access_token,true);
         iyona.deb("AUTO LOGIN",that.user_info,that.access_token);
      } else {
         that.user_info = {"id":0,"type":0,"emails":[{"value":0}]};
         that.callFunction(that.user_info,error, false);
         iyona.log("could not retrive user data:"+error.message,false,"danger",error,response);
      }
   };

   this.revokeToken = function() {
      chrome.identity.getAuthToken({'interactive': false},
      function(current_token) {
         if (!chrome.runtime.lastError) {
            chrome.identity.removeCachedAuthToken({token: current_token},
            function() {
            });
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + current_token);
            xhr.send();
         }
      });
   };
};


//============================================================================//
//FETCH IMAGE
//============================================================================//
function GET_IAMGE(url,ele) {
   this.fetchImageBytes = function(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = this.onImageFetched;
      xhr.send();
   };
   this.onImageFetched = function(e) {
      if (this.status !== 200) return;
      var imgElem = document.createElement('img');
      var objUrl  = window.webkitURL.createObjectURL(this.response);
      imgElem.src = objUrl;
      var element = document.querySelector(ele);element.appendChild(imgElem);
      imgElem.onload = function() {window.webkitURL.revokeObjectURL(objUrl);};
   };
   this.fetchImageBytes(url);
}
//============================================================================//