var mink = require('cucumber-mink');

// Local Chrome
var parameters = {
  driver: {
    logLevel: 'silent',
    baseUrl: 'http://localhost:3000',
    desiredCapabilities: {
      browserName: 'chrome'
    },
    port: 4444
  }
};

//NOTE: need to do angular wait
// https://github.com/Adezandee/cucumber-mink/issues/26
// https://github.com/Adezandee/cucumber-mink/pull/29
// https://github.com/Adezandee/cucumber-mink/compare/feature/angularjs-support
// http://cucumber-mink.js.org/steps/#wait

module.exports = function () {
  mink.init(this, parameters);
  
  //--
	//-- Then I pause
	//--
	this.Then(/^I pause$/, function (callback) {
		// ?? how do I get: 
    webDriver.pause();
		callback();
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

