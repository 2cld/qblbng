var mink = require('cucumber-mink');

// Local Chrome
var parameters = {
  driver: {
    logLevel: 'silent',
    baseUrl: 'http://localhost:3000',
    desiredCapabilities: {
      browserName: 'firefox'
    },
    port: 4444
  }
};

/*global window, document, angular*/
var debug = require('debug')('mink:driver:angular');


//NOTE: need to do angular wait
// https://github.com/Adezandee/cucumber-mink/issues/26
// https://github.com/Adezandee/cucumber-mink/pull/29
// https://github.com/Adezandee/cucumber-mink/compare/feature/angularjs-support
// http://cucumber-mink.js.org/steps/#wait
// http://webdriver.io/api/utility/pause.html

module.exports = function () {
  mink.init(this, parameters);
  //--
	//-- Then I wait for Angular app rootSelector
	//-- 
  this.Given(/^I wait for Angular app "([^"]*)"$/, function (selector, callback){
      mink.driver.client
      .timeoutsAsyncScript(2000)
      .executeAsync(
        function(rootSelector, cb) {
          if (!window || !document) {
            cb(new Error('window / document not initialized').message);
          }
          var el = document.querySelector(rootSelector);
          if (!window.angular) {
            cb(new Error('angular could not be found on the window').message);
          }
          if (angular.getTestability) {
            angular.getTestability(el).whenStable(cb);
          } else {
            if (!angular.element(el).injector()) {
              cb(new Error('root element (' + rootSelector + ') has no injector.' + ' this may mean it is not inside ng-app.').message);
            }
            angular.element(el).injector().get('$browser').notifyWhenNoOutstandingRequests(cb);
          }
        },
        selector
      )
      .then(debug)
      .call(callback);
  });
  //--
	//-- Then I pause
	//--
	this.Then(/^I pause$/, function (callback) {
		// ?? how do I get: 
    console.log('testing webdriver pause');
    mink.driver.client.pause(10000).call(function(){console.log(mink.driver.client);}).then(callback);
	});
  //--
	//-- Given a user email "arg1" password "arg2" test site "arg3"
	//--
  this.Given(/^a user email "([^"]*)" password "([^"]*)" test site "([^"]*)"$/, function (arg1, arg2, arg3, callback) {
    this.uutemail = arg1;
    this.uutpassw = arg2;
    this.uutsite  = arg3;
    mink.runStep('I am on "' + arg3 + '"', function(err){ assert.isNull(err) });
    callback();
  });
    
};

