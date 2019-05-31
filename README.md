# The ugly but functional form

## How to install
run
```
npm install
npm start
```

then go to `localhost:8080`

that's it!

## The code
I've made a kind of old fashioned solution without the help of any framework.

String tester is a small custom library I created to keep the separation of concerns in between files. it exposes a function constructor with the following methods:

## StringTester Class usage
Make a new tester instance like follows:
```
import StringTester from './StringTester';

const tester = new StringTester('The string to test');
```

### Attributes
#### valid
This flag updates based on the rules applied to the string tester. it defaults to true:

ie:
```
const tester = new StringTester('The string to test');
let valid = tester.valid // -> outputs true.
valid = tester.testConsecutiveChars().value // -> outputs false
```

### Methods
#### testConsecutiveChars
- **arguments**:
    - lengthRequired: {number} How long the string of consecutive characters should be? Default is 3. ie: 'abc'
    - times (optional): {number} How many times this rule needs to be present on the string being tested? Default is 1
- **returns**: {StringTester}
- **examples**
```
const tester = new StringTester('abcabc');
tester.testConsecutiveChars().valid // this is true
tester.testConsecutiveChars(4).valid // this is false
tester.testConsecutiveChars(3).valid // this is true
tester.testConsecutiveChars(3, 2).valid // this is true
tester.testConsecutiveChars(3, 3).valid // this is false
```

#### testNonOverlappingChars
checks for consecutive repeated characters such as 'aa', 'xx', etc.
- **arguments**:
    - lengthRequired: {number} How long the string of consecutive characters should be? Default is 2. ie: 'aa'
    - times (optional): {number} How many times this rule needs to be present on the string being tested? Default is 1
- **returns**: {StringTester}
- **examples**
```
const tester = new StringTester('aabb');
tester.testNonOverlappingChars().valid // this true
tester.testNonOverlappingChars(2).valid // this true
tester.testNonOverlappingChars(3).valid // this false
tester.testNonOverlappingChars(2,2).valid // this true
tester.testNonOverlappingChars(2,3).valid // this false
```

#### times
tests the amout of times we want a previous rule to be checked on a string
- **arguments**:
    - times (optional): {number} How many times the rule that precedes this method needs to be present on the string? Default is 1
- **returns**: {StringTester}
- **IMPORTANT NOTE:** times can be only preceded by methods that receive a 'times' argument. (testConsecutiveChars and testNonOverlappingChars).

- **examples**
```
const tester = new StringTester('aabb');
tester.testNonOverlappingChars().times(2).valid // this true
tester.testNonOverlappingChars().times(3).valid // this false
```

#### testForbidenChars
tests against a string of characters we don't want to include
- **arguments**:
    - forbidenChars: {String} A string containing the non-desired characters on the string.

- **returns**: {StringTester}
- **examples**
```
const tester = new StringTester('This is ok');
tester.testForbidenChars('xyz').valid // this true
tester.testForbidenChars('T').valid // this false
tester.testForbidenChars('t').valid // this true
tester.testForbidenChars('tui').valid // this false

```

#### testLength
makes sure the length of the string is no longer than the defined number.
- **arguments**:
    - length: {number} a number seting the max amount of characters allowed in the string.

- **returns**: {StringTester}
- **examples**
```
const tester = new StringTester('This is ok');
tester.testLength('16').valid // this true
tester.testForbidenChars('5').valid // this false
```

### testOnlyLowerCaseChars
makes sure that only lower case characters can be entered.
- **No arguments**
- **returns**: {StringTester}
- **examples**
```
const tester = new StringTester('This is ok');
tester.testOnlyLowerCaseChars().valid // this false
```