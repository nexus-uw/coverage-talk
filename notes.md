# Unit Test Coverage using Istabul.
- What is it.
- Why does anyone care.
- When can it be integrated into projects.

# What is it.
Istanbul, formally known as Constantinople.
Formly the capital of the eastern roman empire, then Byzantine Empire before being captured by the Ottomans in 1453 (double check date).
![](http://en.wikipedia.org/wiki/Fall_of_Constantinople#mediaviewer/File:Dardanelles_Gun_Turkish_Bronze_15c.png). 

#Or
a code coverage tools for Javascript.
[gotwarlost/istanbul](https://github.com/gotwarlost/istanbul)

>Since all the good ones are taken. Comes from the loose association of ideas across coverage, carpet-area coverage, the country that makes good carpets and so on...


Test coverage is a collection of 4 interconnected metrics expressing how much of the source code is reached by the unit test suite.
- Statements:  number of seperate code statements (section of code ended with a semi colon or a newline)
- Branches: how many different logic flows are executed at least once.
- Functions: number of declared functions excuted at least once.
- Lines: number of lines of code executed at least once (a line text).


also, not part of code coverage but important never less important to note: Ignored statements, branches, functions, and lines
For when simple statements would take more to mock than they are worth. 
[[todo: link]]

express coverage as  executed by unit tests / total appearances in the code

# why should we have it
- moves testing from just the expected successful case, to all expected cases
- covers all tests
- sets the bar higher for writting code and the tests that go with it
- if cant hit line, then it is junk or the tests need to be better mocked

# where it fails
- just because a statement gets executed once, does not mean that it will work in all instances
[[insert example]]

- does not test execution paths [[TODO: check terminology]]
[[insert examples]]

- does not test what is not written
[[create example of optimistic code]]

- and like all tests, if the code and tests are both wrong, then :(
[[create example of complete shit]]


# Where to use

## Circle CI
 - CI jobs -> generates html report (where to include + display)
[[TODO: suggested mocha and karma ci configs]]

## TDD
 - update watch jobs to print coverage summary
[[TODO: suggested mocha and karma watch configs]]
# How to use
I have created a pull request for rangle gulp here: _____ that provides everything needed

