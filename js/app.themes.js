appGeneral.config(function($mdThemingProvider) {

   console.log("Carregando Temas");
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.definePalette('whitePalette', {
    '50': 'fff',
    '100': '000',
    '200': 'aaa', // shade on mouse over
    '300': '000',
    '400': '000',
    '500': '000',
    '600': '000',
    '700': '000',
    '800': 'fff',
    '900': '000', //fonte
    'A100': 'fff', //fundos select
    'A200': 'fff',
    'A400': 'fff',
    'A700': 'fff',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': 'light',
    'contrastLightColors': 'light'    // could also specify this if default was 'dark'
  	});
  
    $mdThemingProvider.theme('buttons-theme')
     .primaryPalette('blue')
    .accentPalette('green')
    .warnPalette('orange')
	.backgroundPalette('whitePalette');

    $mdThemingProvider.theme('buttons-theme-trasnfer')
    .primaryPalette('blue')
    .accentPalette('lime')
    .warnPalette('red')
	.backgroundPalette('whitePalette');
	
	$mdThemingProvider.theme('header-theme')
    .primaryPalette('blue')
    .accentPalette('grey', {'default': '400'})
    .warnPalette('orange')
	.backgroundPalette('whitePalette');

	
	$mdThemingProvider.theme('buttons-grey-theme')
    .primaryPalette('grey')
    .accentPalette('grey')
    .warnPalette('grey')
	.backgroundPalette('grey');

	$mdThemingProvider.theme('grey-theme')
     .primaryPalette('grey')
     .accentPalette('grey')
     .backgroundPalette('grey');

	$mdThemingProvider.theme('light-grey-theme')
     .primaryPalette('grey', {'default': '100'})
     .accentPalette('grey', {'default': '100'})
     .backgroundPalette('grey', {'default': '100'});
	
	$mdThemingProvider.theme('grey-dark-theme')
     .primaryPalette('grey')
     .accentPalette('lime')
     .backgroundPalette('grey')
	 .dark();

	$mdThemingProvider.theme('white-theme')
     .primaryPalette('blue')
     .accentPalette('grey', {'default': '400'})
     .warnPalette('orange')
     .backgroundPalette('whitePalette');

$mdThemingProvider.theme('back-white-theme')
     .backgroundPalette('whitePalette');
	 
});