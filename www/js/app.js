if(typeof Build!=="undefined" && typeof WebView!=="undefined" && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
   console.info("Build Set::",Build,WebView);
    WebView.setWebContentsDebuggingEnabled(true);
}
angular.module('AlphaOmega', ['ionic', 'AlphaOmega.controllers', 'AlphaOmega.services'])
.config(["$stateProvider","$urlRouterProvider","$httpProvider",config])
.run(["$ionicPlatform","$location",run]);

function config($stateProvider,$urlRouterProvider,$httpProvider) {
   $httpProvider.defaults.withCredentials = true;
   $stateProvider
      .state('call', {url: "/call",abstract: true,templateUrl: "cera/layout-side.html",controller: 'AppCtrl'})
      .state('call.dash', {url: "/dash",views: {'principle': {templateUrl: 'cera/dashboard.html',controller: 'DashCtrl'}}/**/})
      .state('call.profile', {url: "/profile/{jesua}",views: {'principle': {templateUrl: 'cera/mensa/profile-details.html',controller: 'ProfileCtrl'}}/**/})
      .state('call.profileList', {url: "/profileList/{jesua}",views: {'principle': {templateUrl: 'cera/mensa/profile-list.html',controller: 'ProfileListCtrl'}}/**/})
      .state('call.articles', {url: "/articles",views: {'principle': {templateUrl: 'cera/mensa/articles.html',controller: 'ArticlesCtrl'}}/**/})
      .state('call.article', {url: "/article/{jesua}/{field}/{search}",views: {'principle': {templateUrl: 'cera/mensa/article-logs.html',controller: 'ArticleLogsCtrl'}}/**/})
      .state('call.articleList', {url: "/articleList/{jesua}",views: {'principle': {templateUrl: 'cera/mensa/articleList-logs.html',controller: 'articleListLogsCtrl'}}/**/})
      .state('call.test', {url: "/test",views: {'principle': {templateUrl: 'cera/mensa/article-details.html',controller: 'ArticleDetailsCtrl'}}/**/})
      .state('call.logviews', {url: "/logviews",views: {'principle': {templateUrl: 'cera/mensa/log-views.html',controller: 'logViewsCtrl',onExit:['$ionicSideMenuDelegate',function($ionicSideMenuDelegate){iyona.on('On Exit');$ionicSideMenuDelegate.canDragContent(true);}] }}/**/})
      .state('main', {url: "/main",abstract: true,templateUrl: "cera/layout-single.html"})
      .state('main.register', {url: "/register/{jesua}",views: {'principle': {templateUrl: 'cera/mensa/profile-registration.html',controller: 'ProfileCtrl'}}/**/});
   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/call/dash');

}

function run($ionicPlatform,$location) {

   ionic.Platform.isFullScreen = true;//also set the config.xml to fullscreen
   if(!impetroUser().operarius) {$location.path("/dash");}//less intensive redirect when not login

   $ionicPlatform.ready(function() {
      //@todo: set the phone grade and details captured.
      console.log("GRADE",ionic.Platform.grade,ionic.Platform.platforms,ionic.Platform.platform(),ionic.Platform.version(),ionic.Platform.device());
      if(window.cordova && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);}// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if(window.StatusBar) {StatusBar.styleDefault();} // org.apache.cordova.statusbar required
   });
}
