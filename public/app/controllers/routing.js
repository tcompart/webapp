var app = angular.module('webapp.routing', ["ui.router"]);

app.config(["$stateProvider", "$urlRouterProvider", "$state", function ($stateProvider, $urlRouterProvider, $state) {
  $urlRouterProvider.otherwise("/");

  // Override the internal 'views' builder with a function that takes the state
  // definition, and a reference to the internal function being overridden:
  $stateProvider.decorator('views', function(state, parent) {
    var result = {}, views = parent(state);

    angular.forEach(views, function(config, name) {
      var autoName = (state.name + "." + name).replace(".", "/");
      config.templateUrl = config.templateUrl || "/partials/" + autoName + ".html";
      result[name] = config;
    });
    return result;
  });

  $stateProvider.state('main', {
    url: "/",
    templateUrl: "/app/partials/main.html"
    controller: "ContentCtrl"
  }).state("login", {
    url: "/signin",
    templateUrl: "/app/partials/login/login-overlay.html",
    controller: "CryptCtrl"
  }).state('articles', {
    views: {
      "articles.show" { controller : "ContentCtrl" },
      "articles.add" { controller: "ContentCtrl" },
      "articles.edit" { controller: "ContentCtrl" }
    }
  });

  $state.go("main");
}]);