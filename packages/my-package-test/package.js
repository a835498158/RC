Package.describe({
  name: 'my-package-test',
  version: '0.0.1',
  summary: 'Send to Watson',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use([
		'mongo',
		'ecmascript',
		'rocketchat:lib',
    'modules'
	]);

//  api.use('watson-developer-cloud', 'client');

    api.use('templating','client');
  //api.use('modules');

  api.addFiles([
	'client/actionButton.js'
//	'client/index.js'
],
        'client');


 api.addFiles([
  'server/watson.js'
//  'client/index.js'
],
        'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('my-package-test');
  api.mainModule('my-package-test-tests.js');

});
