module.exports = function (config) {
  console.log(__dirname)
  config.set({
    plugins : [ 'karma-coverage','karma-mocha','karma-chai','karma-phantomjs-launcher'],
    preprocessors : {'../client/app/**/!(*.spec).js':'coverage'},
    frameworks: ['mocha', 'chai'],
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],
    logLevel:'debug',
    coverageReporter: {
       type : 'html'
    //   dir : __dirname + '/../coverage'
     }
  });
};
