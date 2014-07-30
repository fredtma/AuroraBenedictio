angular.module('ngCordova.plugins.barcodeScanner', [])

.factory('$cordovaBarcodeScanner', ['$q', function ($q) {

  return {
    scan: function (options) {
      var q = $q.defer();

      cordova.plugins.barcodeScanner.scan(function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    },

    encode: function (type, data) {
      var q = $q.defer();

      /* TODO needs work for type:
       make the default:  BarcodeScanner.Encode.TEXT_TYPE
       other options: .EMAIL_TYPE, .PHONE_TYPE, .SMS_TYPE

       docs: https://github.com/wildabeast/BarcodeScanner#encoding-a-barcode
       */

      cordova.plugins.barcodeScanner.encode(type, data, function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);
angular.module('ngCordova.plugins.camera', [])

.factory('$cordovaCamera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      if(!navigator.camera) {
        q.resolve(null);
        return q.promise;
      }

      navigator.camera.getPicture(function(imageData) {
        q.resolve(imageData);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    cleanup: function(options) {
      var q = $q.defer();

      navigator.camera.cleanup(function() {
        q.resolve(arguments);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
    
  }
}]);
angular.module('ngCordova.plugins.capture', [])

.factory('$cordovaCapture', ['$q', function($q) {

  return {
    captureAudio: function(options) {
      var q = $q.defer();

      if(!navigator.device.capture) {
        q.resolve(null);
        return q.promise;
      }

      navigator.device.capture.captureAudio(function(audioData) {
          q.resolve(audioData);
        }, function(err) {
          q.reject(err);
        }, options);

      return q.promise;
    },
    captureImage: function(options) {
      var q = $q.defer();

      if(!navigator.device.capture) {
        q.resolve(null);
        return q.promise;
      }

      navigator.device.capture.captureImage(function(imageData) {
          q.resolve(imageData);
        }, function(err) {
          q.reject(err);
        }, options);

      return q.promise;
    },
    captureVideo: function(options) {
      var q = $q.defer();

      if(!navigator.device.capture) {
        q.resolve(null);
        return q.promise;
      }

      navigator.device.capture.captureVideo(function(videoData) {
          q.resolve(videoData);
        }, function(err) {
          q.reject(err);
        }, options);

      return q.promise;
    }
  }
}]);
