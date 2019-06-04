appGeneral.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/dashboard");
	$stateProvider
		
		.state('dashboard', {
			url: '/dashboard',
			name: '/dashboard',
			cache: false,
			views: {
				'': {
					templateUrl: 'views/dashboard/dashboard.html',
					controller: 'DashCtrl',
					controllerAs: 'vm'
				},
				'janela@dashboard': {
					templateUrl: 'views/dashboard/admin.html',
					controller: 'OwnerCtrl',
					controllerAs: 'vm'
				}
			}
		})
		.state('sales', {
			url: '/sales',
			name: '/sales',
			cache: false,
			views: {
				'': {
					templateUrl: 'views/dashboard/dashboard.html',
					controller: 'DashCtrl',
					controllerAs: 'vm'
				},
				'janela@sales': {
					templateUrl: 'views/crm/sales/listagem.html',
					controller: 'SalesCtrl',
					controllerAs: 'vm'
				}
			}
		})
		.state('sale', {
			url: '/sale',
			name: '/sale',
			params: { sale: null },
			cache: false,
			views: {
				'': {
					templateUrl: 'views/dashboard/dashboard.html',
					controller: 'DashCtrl',
					controllerAs: 'vm'
				},
				'janela@sale': {
					templateUrl: 'views/crm/sales/venda.html',
					controller: 'SaleCtrl',
					controllerAs: 'vm'
				}
			}
		})
		.state('products', {
			url: '/products',
			name: '/products',
			cache: false,
			views: {
				'': {
					templateUrl: 'views/dashboard/dashboard.html',
					controller: 'DashCtrl',
					controllerAs: 'vm'
				},
				'janela@products': {
					templateUrl: 'views/crm/produtos/listagem.html',
					controller: 'ProductsCtrl',
					controllerAs: 'vm'
				}
			}
		})
		.state('product', {
			url: '/product',
			name: '/product',
			params: { product: null },
			cache: false,
			views: {
				'': {
					templateUrl: 'views/dashboard/dashboard.html',
					controller: 'DashCtrl',
					controllerAs: 'vm'
				},
				'janela@product': {
					templateUrl: 'views/crm/produtos/manutencao.html',
					controller: 'ProductCtrl',
					controllerAs: 'vm'
				}
			}
		})
});