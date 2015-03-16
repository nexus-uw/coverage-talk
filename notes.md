layout: true
class: middle
---

class: center, middle, inverse

# Istanbul
![](imgs/Dardanelles_Gun_Turkish_Bronze_15c.png)


---

#What is it?
 Istanbul is a code coverage tools for Javascript that allows for us to calculate how well our tests exercise the code base. 


[gotwarlost/istanbul](https://github.com/gotwarlost/istanbul)

---

#Istanbul calculates 4 coverage metrics
- __Statements__:  number of separate code statements (single command)
- __Branches__: number of control paths.
- __Functions__: number of declared functions.
- __Lines__: number of lines of code executed at least once (a single line of text, can contain multiple statements).

#And expresses coverage as

```
 reached/executed at least once / total appearances in the code
```

---
class: center, middle, inverse
 
# Why should we use it?

---
class: center, middle, inverse

# Because it results in better code.

---

- A code base with high code coverage has been throughly tested and has a lower chance of containing bugs than a code base with low code coverage.

- Shows where the code base is lacking in tests.

- Improves the test suite by forcing the tests to consider all expected cases, not just the successful ones.

- Helps to detect dead code. If the line/function/use-case can not be covered, then it is probably dead code.


---
class: center, middle, inverse
# Where Code Coverage Fails
As shown through trivial examples


![](imgs/bAPfBDRF4Hg0U.gif)

---

# Just because a statement gets executed once, does not mean that it will work in all instances
```javascript
function failFunc(key){
  var something = { 
    foo : function() {
      return 'bar';
    }
  };
  return something[key]();
}
failFunc('foo');
```

---

# It will not catch what is not coded.
```javascript
makeRequestToFlakyAPI()
.then(function(){
  hideLoadingSpinners();
});

```
---
 
# 100% coverage can be a lie.
```javascript
function failFunc(input) {
  var tmp = 0;

  if(input > 0){
    tmp++;
  }

  if(input < 0){
    tmp--;
  }

  return input / tmp;
}

failFunc(1);
failFunc(-1);
```
.footer Istanbul calculates edge pair coverage, for which the above has 100%, but under prime path (or complete coverage), the above would have ~66.66...%.

---

class: center, middle, inverse

# How to Setup Istanbul Test Coverage

---
 
## Mocha
```javascript
  gulp.task('pre-mocha',rg.prepareMochaTestCoverage({
    filesToCover : ['server/**/!(*.spec).js']
  }));

  gulp.task('mocha',rg.mocha({ files : [ 'server/**/*.spec.js' ] }));

  gulp.task('cover-mocha',rg.ensureTestCoverage({ 
    coverageDirectory : './coverage/server'  //where to search for json coverage file
  }));

  gulp.task('mocha-ci',gulpSequence('pre-mocha','mocha','cover-mocha'));

```

---
## Karma

```javascript
gulp.task('rgkarma',rg.karma({ 
    karmaConf:'', //disable karma look up for config file
    files : [
    'client/bower_components/angular/angular.js',
    'client/bower_components/angular-mocks/angular-mocks.js',
    'client/app/**/*.js'],  
    preprocessors : {'./client/app/**/!(*.spec).js':'coverage'},
    frameworks: ['mocha', 'chai'],
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],    
    coverageReporter: {
       reporters: [{type:'json'},{type:'html'},{type:'text-summary'}],
       dir : './coverage/client/'
     }
  }));
gulp.task('cover-karma',rg.ensureTestCoverage({ 
  coverageDirectory : 'coverage/client/*'
}));

gulp.task('mocha-ci',gulpSequence('karma','cover-karma'));

```
---

# rangle/rangle-gulp

## Reporters
rangle-gulp will, by default, use 3 coverage reporters. 
1. coverage/server/coverage-final.json for the ensureTestCoverage().
2. a text summary displayed on the command line
3. coverage/server/index.html for a full human readable coverage report (should be saved as a build artifact  on CircleCI).


## Coverage Thresholds
All 4 thresholds are set to 100% unless overwritten.
---

# And here are some links

- Slides and some working examples [https://github.com/nexus-uw/coverage-talk](https://github.com/nexus-uw/coverage-talk).
- [Wikipedia code coverage page ](http://en.wikipedia.org/wiki/Code_coverage)
- [Coveralls](https://coveralls.io/features): Code coverage CI integration SAS.
- [UW Testing Course ](https://ece.uwaterloo.ca/~lintan/courses/testing/): Deep dive into all the different code coverage methods.

![](imgs/vVD14D.gif)

