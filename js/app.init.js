var appGeneral = angular.module('modelo', ['ui.router', 'angularUtils.directives.dirPagination', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'cgNotify', '720kb.datepicker', 'googlechart', 'ui.bootstrap.contextMenu', 'pascalprecht.translate', 'ngFileUpload']);

appGeneral.config(['$qProvider', function ($qProvider, $httpProvider, $rootScope) {
  $qProvider.errorOnUnhandledRejections(false);
  console.log("Initializing...");
}]);

appGeneral.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.preferredLanguage('pt-br');
  $translateProvider.useLoader('asyncLoaderLg');
  $translateProvider.useSanitizeValueStrategy('sanitize');
}]);

appGeneral.service("ServerRequests", function($q, $http, $cookies, $rootScope, $window, notify){
	return {
		post: function(url, params, msg) {
      console.log(msg);
      var result = $q.defer();
      $http.post(url, params, $rootScope.headers).then(
				function(content) {
					console.log("Returning datas.");
					if(content.data.status && content.data.status != "CODEERR"){
						console.log("Status response: "+content.data.status);
						result.resolve(content.data);
					}else if(content.data.status && content.data.status == "CODEERR"){
							notify({
								messageTemplate: '<span><i class="fas fa-radiation-alt text-danger"></i>'+content.data.errorMSG+'<br/>Acione o suporte!</span>',
								templateUrl:'',
								classes: "alert-danger",
								position: "center",
								duration: 3000
							});						
							console.warn('Process Error: ' + JSON.stringify(content));						
					} else {
						notify({
							messageTemplate: '<span><i class="em em-warning"></i>Alguma informação de retorno está errada, acione o administrador.<i class="em em-warning"></i></span>',
							templateUrl:'',
							classes: "alert-danger",
							position: "center",
							duration: 3000
						});						
						console.warn('Process Error: ' + JSON.stringify(content));						
					}
				}, function(error){
					notify({
						messageTemplate: '<span><i class="em em-warning"></i>O servidor está com problema, acione o administrador.<i class="em em-warning"></i></span>',
						templateUrl:'',
						classes: "alert-danger",
						position: "center",
						duration: 3000
					});
					console.warn('Error PHP: ' + JSON.stringify(error));
				});
				return result.promise;
      },
      get: function(url, params, msg) {
        console.log(msg);

        var result = $q.defer();
        $http.get(url, params, $rootScope.headers).then(
          function(content) {
            console.log("Returning datas.");
            if(content.data.status && content.data.status != "CODEERR"){
              console.log("Status response: "+content.data.status);
              result.resolve(content.data);
            }else if(content.data.status && content.data.status == "CODEERR"){
                notify({
                  messageTemplate: '<span><i class="fas fa-radiation-alt text-danger"></i>'+content.data.errorMSG+'<br/>Acione o suporte!</span>',
                  templateUrl:'',
                  classes: "alert-danger",
                  position: "center",
                  duration: 3000
                });						
                console.warn('Process Error: ' + JSON.stringify(content));						
            } else {
              notify({
                messageTemplate: '<span><i class="em em-warning"></i>Alguma informação de retorno está errada, acione o administrador.<i class="em em-warning"></i></span>',
                templateUrl:'',
                classes: "alert-danger",
                position: "center",
                duration: 3000
              });						
              console.warn('Process Error: ' + JSON.stringify(content));						
            }
          }, function(error){
            notify({
              messageTemplate: '<span><i class="em em-warning"></i>O servidor está com problema, acione o administrador.<i class="em em-warning"></i></span>',
              templateUrl:'',
              classes: "alert-danger",
              position: "center",
              duration: 3000
            });
            console.warn('Error PHP: ' + JSON.stringify(error));
          });
          return result.promise;
        },      
        delete: function(url, params, msg) {
         console.log(msg);
         var result = $q.defer();
         $http.delete(url, params, $rootScope.headers).then(
           function(content) {
             console.log("Returning datas.");
             if(content.data.status && content.data.status != "CODEERR"){
               console.log("Status response: "+content.data.status);
               result.resolve(content.data);
             }else if(content.data.status && content.data.status == "CODEERR"){
                 notify({
                   messageTemplate: '<span><i class="fas fa-radiation-alt text-danger"></i>'+content.data.errorMSG+'<br/>Acione o suporte!</span>',
                   templateUrl:'',
                   classes: "alert-danger",
                   position: "center",
                   duration: 3000
                 });						
                 console.warn('Process Error: ' + JSON.stringify(content));						
             } else {
               notify({
                 messageTemplate: '<span><i class="em em-warning"></i>Alguma informação de retorno está errada, acione o administrador.<i class="em em-warning"></i></span>',
                 templateUrl:'',
                 classes: "alert-danger",
                 position: "center",
                 duration: 3000
               });						
               console.warn('Process Error: ' + JSON.stringify(content));						
             }
           }, function(error){
             notify({
               messageTemplate: '<span><i class="em em-warning"></i>O servidor está com problema, acione o administrador.<i class="em em-warning"></i></span>',
               templateUrl:'',
               classes: "alert-danger",
               position: "center",
               duration: 3000
             });
             console.warn('Error PHP: ' + JSON.stringify(error));
           });
           return result.promise;
       },      
       put: function(url, params, msg) {
        console.log(msg);
        var result = $q.defer();
        $http.put(url, params, $rootScope.headers).then(
          function(content) {
            console.log("Returning datas.");
            if(content.data.status && content.data.status != "CODEERR"){
              console.log("Status response: "+content.data.status);
              result.resolve(content.data);
            }else if(content.data.status && content.data.status == "CODEERR"){
                notify({
                  messageTemplate: '<span><i class="fas fa-radiation-alt text-danger"></i>'+content.data.errorMSG+'<br/>Acione o suporte!</span>',
                  templateUrl:'',
                  classes: "alert-danger",
                  position: "center",
                  duration: 3000
                });						
                console.warn('Process Error: ' + JSON.stringify(content));						
            } else {
              notify({
                messageTemplate: '<span><i class="em em-warning"></i>Alguma informação de retorno está errada, acione o administrador.<i class="em em-warning"></i></span>',
                templateUrl:'',
                classes: "alert-danger",
                position: "center",
                duration: 3000
              });						
              console.warn('Process Error: ' + JSON.stringify(content));						
            }
          }, function(error){
            notify({
              messageTemplate: '<span><i class="em em-warning"></i>O servidor está com problema, acione o administrador.<i class="em em-warning"></i></span>',
              templateUrl:'',
              classes: "alert-danger",
              position: "center",
              duration: 3000
            });
            console.warn('Error PHP: ' + JSON.stringify(error));
          });
          return result.promise;
        }
      }
  });

appGeneral.factory('asyncLoaderLg', function ($q, $window, $timeout) {

  return function (options) {
    var deferred = $q.defer(),
      translations;


    if (options.key === 'pt-br') {
      translations = {
        GREETINGS: {
          HI: "Olá",
          MORNING: "Bom dia",
          AFTERNOON: "Boa tarde",
          NIGHT: "Boa noite",
        },
        LOGIN: {
          TITLE: ":: Teste Tecnofit"
        },
        DASHBOARD: {
          TITLE: " :: Todas as informações na sua mão"
        },
        CRM: {
          COMPANY_NOT_FOUNDED: "A empresa não foi encontrada.",
          COMPANY_DELETED: "A empresa foi excluída com sucesso.",
          ITEM_SALE_INSERTED: "O item foi inserido com sucesso.",
          ITEM_SALE_DELETED: "O item foi excluído com sucesso.",
          ITEM_NULL: "O Item não foi preenchido",
          SALE_DELETED: "Venda excluída com sucesso!",
          SALE_CLOSED: "Decolando!! Venda processada com sucesso."
        }
      };
    }

    $timeout(function () {
      deferred.resolve(translations);
    }, 2000);

    return deferred.promise;
  };
});


appGeneral.run(function ($rootScope, $state, $window, $location, $http, $translate, notify) {

  $rootScope.headers = {
    'Access-Control-Allow-Origin': true,
    'Content-Type': 'application/json; charset=utf-8',
    "X-Requested-With": "XMLHttpRequest"
  }
  $rootScope.atualState = "";
  $rootScope.previousState = "";

  console.log("Running...");

  $rootScope.$on("$stateChangeStart", function (evt, to, toP, from, fromP) {
    console.log("Change State: " + from.name + " -> " + to.name);
    $rootScope.atualState = from.name;
    $rootScope.previousState = to.name;
  });
  
});


appGeneral.directive('myEnter', function () {
  return function (scope, element, attrs, rootScope) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.myEnter);
        });

        event.preventDefault();
      } else if (event.which === 27) {
        scope.$apply(function () {
          scope.$eval(attrs.myesc);
        });

        event.preventDefault();
      }
    });
  };
});

appGeneral.filter('filterByStatus', function () {
  return function (items, status) {
    var filtered = [];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.status == status) {
          filtered.push(item);
        } else if (status == "") {
          filtered.push(item);
        }
      }
    }
    return filtered;
  };
});

appGeneral.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
    if (items) {
      var letterMatch = new RegExp(letter, 'i');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.nome) {
          if (letterMatch.test(item.nome.substring(0, 1))) {
            filtered.push(item);
          }
        } else if (item.descricao) {
          if (letterMatch.test(item.descricao.substring(0, 1))) {
            filtered.push(item);
          }
        } else if (item.cargo.descricao) {
          if (letterMatch.test(item.cargo.descricao.substring(0, 1))) {
            filtered.push(item);
          }
        } else if (item.cargo) {
          if (letterMatch.test(item.cargo.substring(0, 1))) {
            filtered.push(item);
          }

        }
      }
    }
    return filtered;
  };
});

appGeneral.filter('converterDataHora', function () {
  return function (data) {
    var novaData = "";
    if (data) {
      var data = data.split(" ");
      var horario = data[1];
      data = data[0];
      data = data.replace("-", "");
      data = data.replace("-", "");
      novaData = data.substr(6, 2);
      novaData += "/" + data.substr(4, 2);
      novaData += "/" + data.substr(0, 4) + " " + horario.substr(0, 5);
    }
    return novaData;
  };
});

appGeneral.filter('converterData', function () {
  return function (data) {
    var novaData = "";
    if (data) {
      data = data.replace("-", "");
      data = data.replace("-", "");
      novaData = data.substr(6, 2);
      novaData += "/" + data.substr(4, 2);
      novaData += "/" + data.substr(0, 4);
    }
    return novaData;
  };
});

appGeneral.filter('maiusculas', function () {
  return function (frase) {
    var arrWords = frase.slice(" ");
    var ignore = ['de', 'da', 'das', 'do', 'dos'];

    for (var i in arrWords) {
      if (ignore.indexOf(arrWords[i]) === -1) {
        arrWords[i] = arrWords[i].charAt(0).toUpperCase() + arrWords[i].slice(1);
      }
    }
    return arrWords.join(' ');
  };
});

appGeneral.filter('formatarMoeda', function () {
  return function (valor) {
    if (valor > 0) {
      var arredondado = parseFloat(valor).toFixed(2);
      arredondado = parseFloat(arredondado);
      return arredondado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
      return "R$ 0,00";
    }
  };
});

appGeneral.filter('formatarDecimal', function () {
  return function (valor) {
    if (valor > 0) {
      valor = parseFloat(valor).toFixed(2);
      return parseFloat(valor);
    } else {
      return "0.00";
    }
  };
});


appGeneral.filter('htmlentities', ['$sce', function ($sce) {
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  }
}]);
