appGeneral.controller("ProductCtrl", function ($rootScope, $window, $interval, $scope, $state, $stateParams, $http, notify, orderByFilter, ServerRequests, Upload) {
	console.log("Controller product loaded.");
	$scope.hello = "";
	$rootScope.titleHTML = " :: Produto";
	$scope.usuario = JSON.parse($window.sessionStorage.getItem("hUsuario"));
	$scope.produto = {"id":0};
	$scope.tela = "";
	$scope.valueExpand = 0;
	$scope.progressCircularShow = false;
	$scope.progressBarShow = false;

	if ($stateParams.product) {
		$scope.produto = $stateParams.product;
		$window.sessionStorage.setItem("iProduto", JSON.stringify($scope.produto));
	} else if ($window.sessionStorage.getItem("iProduto")) {
		$scope.produto = JSON.parse($window.sessionStorage.getItem("iProduto"));
		$window.sessionStorage.setItem("iProduto", JSON.stringify($scope.produto));
	}


	$scope.novo = function () {
		$scope.produto = {"id":0};
		$window.sessionStorage.removeItem("iProduto");
	}

	$scope.onFormSubmit = function () {
		$scope.progressCircularShow = true;
		console.log(JSON.stringify($scope.produto));
		ServerRequests.post('app/produto', { "produto": JSON.stringify($scope.produto)}, "Commiting Product...").then(
			function (content) {
				console.log("Processing Result");
				if (content.status == "OK") {
					if ($scope.produto.id && $scope.produto.id > 0) {
						console.log("Update Success!");
					} else {
						console.log("Insert Success!");
						$scope.produto = content.produto;
					}
				}
			}).finally(function () {
				$scope.progressCircularShow = false;
			});
	}

	$scope.excluirProduto = function(produto){
		if(window.confirm("Você tem certeza que deseja excluir o Produto "+produto.nome+" ?")){
			$scope.progressCircularShow = true;
			console.log(JSON.stringify($scope.produto));
			ServerRequests.delete('app/produto/'+produto.id, {}, "Deleting Product...").then(
				function (content) {
					console.log("Processing Result");
					if (content.status == "OK") {
						$state.go("products");
					}
				}).finally(function () {
					$scope.progressCircularShow = false;
				});
		}
	}
	
	console.log("Session loading");
});

appGeneral.controller("ProductsCtrl", function ($rootScope, $window, $interval, $scope, $state, $stateParams, $http, $translate, notify, orderByFilter, ServerRequests) {
	console.log("Controller products loaded.");
	$window.sessionStorage.removeItem("iProduto")
	$scope.hello = "";
	$rootScope.titleHTML = " :: Produtos";
	$scope.usuario = JSON.parse($window.sessionStorage.getItem("hUsuario"));
	$scope.produtos = [];
	$scope.propertyName = 'nome';
	$scope.reverse = false;
	$scope.letterSelected = '';
	$scope.pagLetter = [];
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
		ServerRequests.get('app/produtos', {}, "Products Loaded").then(
			function (content) {
				$scope.valueExpand = 50
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Query Success!");
					var produtos = content.produtos;
					$scope.produtos = [];
					$scope.pagLetter = [];
					$scope.valueExpand = 85;
					$scope.produtos = orderByFilter(produtos, $scope.propertyName, $scope.reverse);
					var pLetter = orderByFilter(produtos, 'nome', $scope.reverse);
					var valor = "";
					for (i = 0; i < pLetter.length; i++) {
						if (pLetter[i].nome.substring(0, 1) != valor) {
							$scope.pagLetter.push(pLetter[i].nome.substring(0, 1));
							valor = pLetter[i].nome.substring(0, 1);
						}
					}
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
		$scope.produtos = orderByFilter($scope.produtos, $scope.propertyName, $scope.reverse);
	}

	//Função para organizar as colunas				
	$scope.sortBy = function (propertyName) {
		$scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
			? !$scope.reverse : false;
		$scope.propertyName = propertyName;
		$scope.produtos = orderByFilter($scope.produtos, $scope.propertyName, $scope.reverse);
	};

	$scope.excluir = function(produto){
		if(window.confirm("Você tem certeza que deseja excluir o Produto "+produto.nome+" ?")){
			$scope.progressCircularShow = true;
			console.log(JSON.stringify($scope.produto));
			ServerRequests.delete('app/produto/'+produto.id, {}, "Deleting Product...").then(
				function (content) {
					console.log("Processing Result");
					if (content.status == "OK") {
						$state.reload();
					}
				}).finally(function () {
					$scope.progressCircularShow = false;
				});
		}
	}	
});

appGeneral.controller("ProductsSearchCtrl", function ($uibModalInstance, $rootScope, $window, $interval, $scope, $state, $stateParams, $http, $translate, notify, orderByFilter, ServerRequests) {
	console.log("Controller Tab Products loaded.");
	$scope.sistemas = [];
	$scope.produtos = [];

	$scope.carregarDados = function () {
		ServerRequests.get('app/produtos', {}, "Products Loaded").then(
			function (content) {
				$scope.valueExpand = 50
				console.log("Processing Result");
				if (content.status == "OK") {
					console.log("Query Success!");
					var produtos = content.produtos;
					$scope.produtos = [];
					$scope.pagLetter = [];
					$scope.valueExpand = 85;
					$scope.produtos = orderByFilter(produtos, $scope.propertyName, $scope.reverse);
					$scope.valueExpand = 97;
				}
			}).finally(function () {
				$scope.valueExpand = 97;
				$scope.progressBarShow = false;
			});
	};

	
	$scope.selecionaItem = function (produto) {
	  $uibModalInstance.close(produto);
	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};

	$scope.carregarDados();
});