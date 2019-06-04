appGeneral.controller("SaleCtrl", function($rootScope, $window, $interval, $timeout, $log, $scope, $state, $stateParams, $http, $templateCache, notify, $translate, orderByFilter, $uibModal, ServerRequests) {
	console.log("Controller sale loaded");
	$scope.hello = "";
	$rootScope.titleHTML = " :: Venda";
	$scope.user = JSON.parse($window.sessionStorage.getItem("hUser"));
	$scope.venda = {"id":0, "status":1, "data":"", "total":"0", "itens":[]};
	$scope.consultorias = [];
	$scope.clientes = [];
	$scope.vendedores = [];
	$scope.progressCircularShow = false;
	$scope.item = {};
	
	if ($stateParams.sale) {
		$scope.venda = $stateParams.sale;
		$window.sessionStorage.setItem("iVenda", JSON.stringify($scope.venda));
	} else if ($window.sessionStorage.getItem("iVenda")) {
		$scope.venda = JSON.parse($window.sessionStorage.getItem("iVenda"));
		$window.sessionStorage.setItem("iVenda", JSON.stringify($scope.venda));
	}

	$scope.pesquisarProduto = function (size) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'ProductsTab.html',
		  controller: 'ProductsSearchCtrl',
		  size: size,
		  resolve: {
			clientes: function () {
			  return $scope.clientes;
			}
		  }
		});

		modalInstance.result.then(function (selectedItem) {
			console.log("Selected item:"+selectedItem.nome);
			selectedItem.qtde = 1;
			$scope.item = selectedItem;
		  }, function () {
			$log.info('Modal dismissed at: ' + new Date());
		  });
	};	

	$scope.limparItem = function(){
		$scope.item = {};
	}
	
	$scope.novo = function () {
		$scope.venda = {"id":0, "status":1, "itens":{}, "empresa":{}}
		$window.sessionStorage.removeItem("iVenda");
	}

	$scope.onFormSubmit = function () {
		$scope.progressCircularShow = true;
		if($scope.venda.id > 0){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'confirmModal.html',
				controller: 'ConfirmVendaCtrl',
				size: 'md'
			  });
			  modalInstance.result.then(function () {
			ServerRequests.put('app/vender/processar/'+$scope.venda.id, { }, "Sale Processed").then(
				function (content) {
					console.log("Processing Result");
					if (content.status == "OK") {
						$scope.venda.status = content.venda.status;
						$scope.venda.itens = {};
						console.log("Processed Success!");
						$translate('CRM.SALE_CLOSED').then(function (msg) {
							notify({
								messageTemplate: '<span><i class="em em-airplane"></i>&nbsp;'+msg+'</span>',
								templateUrl:'',
								classes: "alert-success",
								position: "center",
								duration: 3000
							});
						});
						$timeout(2000, $scope.listarItens());
					}
				}).finally(function () {
					$scope.progressCircularShow = false;
				});
			  }, function () {
				$log.info('Sale Process dismissed at: ' + new Date());
				$scope.progressCircularShow = false;
			});
		}else{
		ServerRequests.post('app/vender/abrir', { "venda": JSON.stringify($scope.venda) }, "Sale Opened").then(
			function (content) {
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Insert Success!");
					$scope.venda.id = content.venda.id;
					$scope.venda.status = content.venda.status;
				}
			}).finally(function () {
				$scope.progressCircularShow = false;
			});
		}

	}	

	$scope.adicionaritem = function () {
		if($scope.item.id){
			$scope.progressCircularShow = true;
			ServerRequests.post('app/vender/itens', { "venda": $scope.venda.id, "produto": JSON.stringify($scope.item) }, "Item inserted").then(
				function (content) {
					console.log("Processing Result");
					if (content.status == "OK") {
						console.log("Insert Success!");
						$scope.listarItens();
						$scope.item = {};
					}
				}).finally(function () {
					$scope.progressCircularShow = false;
				});
			}else{
			$translate('CRM.ITEM_NULL').then(function (msg) {
				notify({
					messageTemplate: '<span><i class="em em-hushed"></i>&nbsp;'+msg+'</span>',
					templateUrl:'',
					classes: "alert-danger",
					position: "center",
					duration: 3000
				});
			});
		}
	}	
	
	$scope.listarItens = function () {
		$scope.progressCircularShow = true;
		ServerRequests.get('app/vender/itens/'+$scope.venda.id, { }, "Items Loaded").then(
			function (content) {
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Query Success!");
					$scope.venda.itens = content.itens;
					var totalIt = $scope.venda.itens.length;
					var totalVenda = 0;
					for(i=0; i <totalIt; i++){
						var it = $scope.venda.itens[i];
						totalVenda += parseFloat(it.valorTotal);
					}
					$scope.venda.total = totalVenda;	
					$scope.item = {};
				}
			}).finally(function () {
				$scope.progressCircularShow = false;
			});
	}
	
	if($scope.venda && $scope.venda.id >0){
		$scope.listarItens();
	}

	$scope.excluirItem = function ($item) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'confirmModal.html',
		  controller: 'ConfirmItemCtrl',
		  size: 'md',
		  resolve: {
			item: function () {
			  return $item;
			}
		  }
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.progressCircularShow = true;
			ServerRequests.delete('app/vender/itens/'+selectedItem.id+"/"+$scope.venda.id, { }, "Item deleted").then(
			function (content) {
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Deleted Success!");
					$scope.listarItens();
					$translate('CRM.ITEM_SALE_DELETED').then(function (msg) {
						notify({
							messageTemplate: '<span><i class="em em-smiley"></i>&nbsp;'+msg+'</span>',
							templateUrl:'',
							classes: "alert-info",
							position: "center",
							duration: 3000
						});
					});
				}
			}).finally(function () {
				$scope.progressCircularShow = false;
			});
		  }, function () {
			$log.info('Modal dismissed at: ' + new Date());
		  });
	};


});



appGeneral.controller("ConfirmVendaCtrl", function ($uibModalInstance, $rootScope, $window, $interval, $scope, $state, $stateParams, $http, $translate, notify, orderByFilter, ServerRequests) {
	console.log("Controller modal confirm sale loaded.");
	$scope.title = "VENDA";
	$scope.message = "Você deseja mesmo encerrar esta venda? ?";

	$scope.ok = function () {
	  $uibModalInstance.close();
	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};

});


appGeneral.controller("ConfirmItemCtrl", function ($uibModalInstance, $rootScope, $window, $interval, $scope, $state, $stateParams, $http, $translate, notify, orderByFilter, ServerRequests, item) {
	console.log("Controller modal confirm loaded.");
	$scope.item = item;
	$scope.title = "ITENS DE VENDA";
	$scope.message = "Você deseja mesmo excluir o item "+item.produto.nome+" ?";

	$scope.ok = function () {
	  $uibModalInstance.close($scope.item );
	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};

});

appGeneral.controller("SalesCtrl", function ($rootScope, $window, $interval, $scope, $state, $stateParams, $http, $translate, notify, orderByFilter, $uibModal, ServerRequests) {
	console.log("Controller sales loaded.");
	$window.sessionStorage.removeItem("iVenda")
	$scope.hello = "";
	$rootScope.titleHTML = " :: Vendas";
	$scope.usuario = JSON.parse($window.sessionStorage.getItem("hUsuario"));
	$scope.vendas = [];
	$scope.propertyName = 'dtVenda';
	$scope.reverse = false;
	$scope.searchText = "";
	$scope.searchStatus = "";
	$scope.valueExpand = 0;
	$scope.progressBarShow = true;

	$scope.progressBar = $interval(function () {
		$scope.valueExpand++;
		if ($scope.valueExpand > 100) {
			$scope.valueExpand = 99;
			$interval.cancel($scope.progressBar);
		}
	}, 600);

	$scope.carregarDados = function () {
		ServerRequests.get('app/crm/vendas', {}, "Sales Loaded").then(
			function (content) {
				$scope.valueExpand = 50
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Query Success!");
					var vendas = content.vendas;
					$scope.vendas = [];
					$scope.pagLetter = [];
					$scope.valueExpand = 85;
					$scope.vendas = orderByFilter(vendas, $scope.propertyName, $scope.reverse);
					$scope.valueExpand = 97;
				}
			}).finally(function () {
				$scope.valueExpand = 97;
				$interval.cancel($scope.progressBar);
				$scope.progressBarShow = false;
			});
	};

	$scope.carregarDados();
	
	//Função para filtrar por letra.				
	$scope.abrir = function (letra) {
		$scope.letterSelected = letra;
		$scope.sistemas = orderByFilter($scope.sistemas, $scope.propertyName, $scope.reverse);
	}

	//Função para organizar as colunas				
	$scope.sortBy = function (propertyName) {
		$scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
			? !$scope.reverse : false;
		$scope.propertyName = propertyName;
		$scope.vendas = orderByFilter($scope.vendas, $scope.propertyName, $scope.reverse);
	};

	$scope.excluirItem = function (item) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'confirmModal.html',
		  controller: 'DelSalesCtrl',
		  size: 'md',
		  resolve: {
			item: function () {
			  return item;
			}
		  }
		});

		modalInstance.result.then(function () {
			$scope.progressCircularShow = true;
			ServerRequests.delete('app/crm/vendas/'+item.id, { }, "Item deleting...").then(
			function (content) {
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Deleted Success!");
					$translate('CRM.SALE_DELETED').then(function (msg) {
						notify({
							messageTemplate: '<span><i class="em em-facepunch"></i></i>&nbsp;'+msg+'</span>',
							templateUrl:'',
							classes: "alert-info",
							position: "center",
							duration: 3000
						});
					});
					var index = $scope.vendas.indexOf(item);
					$scope.vendas.splice(index, 1);
				}
			}).finally(function () {
				$scope.progressCircularShow = false;
			});
		  }, function () {
			$log.info('Modal dismissed at: ' + new Date());
		  });
	};

});

appGeneral.controller("DelSalesCtrl", function ($uibModalInstance, $rootScope, $window, $interval, $scope, $state, $stateParams, $http, $translate, notify, orderByFilter, ServerRequests, item) {
	console.log("Controller modal confirm loaded.");
	$scope.item = item;
	$scope.title = "VENDAS";
	$scope.message = "Você deseja mesmo excluir esta venda no valor de R$ "+item.total+" ?";

	$scope.ok = function () {
	  $uibModalInstance.close();
	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};

});

appGeneral.filter('statusVendas', function () {
	return function (number) {
		if (number == 1) {
			return 'Inciando uma Venda';
		} else if (number == 5) {
			return 'Aberta';
		} else if (number == 10) {
			return 'Venda Aberta';
		} else if (number == 15) {
			return 'Aguardando para Finalizar Venda';
		} else if (number == 20) {
			return 'Venda já Finalizada';
		} else if (number == 25) {
			return 'Venda Cancelada';
		} else if (number == 30) {
			return 'Venda Suspensa';
		} else if (number == 50) {
			return 'Venda Inativa';
		} else {
			return 'Inciando uma Venda';
		}
	};
});