var gulp = require('gulp');
var rg = require('rangle-gulp');
var mocha = require('gulp-mocha');
var karma = require('gulp-karma');

var istanbul = require('gulp-istanbul');
var coverageEnforcer = require("gulp-istanbul-enforcer");
var  gulpSequence = require('gulp-sequence');
var gutil = require('gulp-util')

require('istanbul/lib/register-plugins'); //need to load the check coverage plugin
  var commandFactory = require('istanbul/lib/command')

var clientCoverageEnforcerOptions = {
        thresholds : {
          statements : 100,
          branches : 100,
          lines : 100,
          functions : 100
        },
        rootDirectory:'.',
      };

gulp.task('karma-single', function(){
  return gulp.src([
    'client/bower_components/angular/angular.js',
    'client/bower_components/angular-mocks/angular-mocks.js',
    'client/app/**/*.js'])
  .pipe(karma({
    plugins : [ 'karma-coverage','karma-mocha','karma-chai','karma-phantomjs-launcher'],
    preprocessors : {'./client/app/**/!(*.spec).js':'coverage'},
    frameworks: ['mocha', 'chai'],
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],
    logLevel:'debug',
    coverageReporter: {
       reporters: [{type:'json'},{type:'html'},{type:'text-summary'}],
       dir : './coverage/client/'
     }
  }))
});

gulp.task('enforce-client-coverage',function(cb){
  var checkCoverageCommand = commandFactory.create('check-coverage');

    var args=  [
      '--statements=' + clientCoverageEnforcerOptions.thresholds.statements,
      '--branches=' + clientCoverageEnforcerOptions.thresholds.branches,
      '--lines=' + clientCoverageEnforcerOptions.thresholds.lines,
      '--functions=' + clientCoverageEnforcerOptions.thresholds.functions,
      '--root=' + clientCoverageEnforcerOptions.rootDirectory,
      'coverage/client/*/coverage*.json',
    ];


      checkCoverageCommand.run(args,function(err){
        if(err){
          cb(new gutil.PluginError('enforce-client-coverage', err, {showStack: false}));
        }else{
          cb();
        }
      })


});

gulp.task('client-ci',gulpSequence('karma-single','enforce-client-coverage'));

var coverageReportConfig = {
    dir: 'coverage/server',
    reporters : [
    'json', //for ensuring minimum test coverage
    'text-summary', //for command line display
    'html' //for display on circle ci
    ]
  };

var coverageEnforcerOptions = {
        thresholds : {
          statements : 100,
          branches : 100,
          lines : 100,
          functions : 100
        },
        coverageDirectory : coverageReportConfig.dir +'/coverage*.json',
        rootDirectory:'.'
      };

gulp.task('prepare-server-coverage',function(){
  return  gulp.src(['server/**/!(*.spec).js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
});

gulp.task('mocha-single',function(){
   return gulp.src(['server/**/*.spec.js'],{read:false})
        .pipe(mocha())
        .pipe(istanbul.writeReports(coverageReportConfig))
});

gulp.task('enforce-server-coverage-2',function(cb){
  var checkCoverageCommand = commandFactory.create('check-coverage');

    var args=  [
      '--statements=' + coverageEnforcerOptions.thresholds.statements,
      '--branches=' + coverageEnforcerOptions.thresholds.branches,
      '--lines=' + coverageEnforcerOptions.thresholds.lines,
      '--functions=' + coverageEnforcerOptions.thresholds.functions,
      '--root=' + coverageEnforcerOptions.rootDirectory,

       coverageEnforcerOptions.coverageDirectory+'/coverage*.json',
    ];


      checkCoverageCommand.run(args,function(err){
        if(err){
          cb(new gutil.PluginError('enforce-server-coverage-2', err, {showStack: false}));
        }else{
          cb();
        }
      })


});

gulp.task('server-ci', gulpSequence('prepare-server-coverage','mocha-single','enforce-server-coverage-2'));

gulp.task('pre-mocha',rg.prepareMochaTestCoverage({filesToCover : ['server/**/*.spec.js']}));
gulp.task('rgmocha',rg.mocha({files:['server/**/*.spec.js']}));
gulp.task('rgcovermocha',rg.ensureTestCoverage({coverageDirectory :'coverage/server'}))
gulp.task('server-ci-rg',gulpSequence('pre-mocha','rgmocha','rgcovermocha'));

gulp.task('rgkarma',rg.karma(
  { karmaConf:'',
    files : [
    'client/bower_components/angular/angular.js',
    'client/bower_components/angular-mocks/angular-mocks.js',
    'client/app/**/*.js'],
    plugins : [ 'karma-coverage','karma-mocha','karma-chai','karma-phantomjs-launcher'],
    preprocessors : {'./client/app/**/!(*.spec).js':'coverage'},
    frameworks: ['mocha', 'chai'],
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],
    logLevel:'debug',
    coverageReporter: {
       reporters: [{type:'json'},{type:'html'},{type:'text-summary'}],
       dir : './coverage/client/'
     }
  }
  ));
gulp.task('rgcoverkarma',rg.ensureTestCoverage({coverageDirectory :'coverage/client/*'}))
gulp.task('client-ci-rg',gulpSequence('rgkarma','rgcoverkarma'))
