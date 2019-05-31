/**
 * This function is where the shared code converges for both, the consecutive chars
 * and the non-overlaping one.
 * @param {string} word
 * @param {number} requiredLength
 * @param {function} callback
 *
 * @return {boolean}
 */
function stringReducer(word, requiredLength, callback, times =  1) {
    // length Counter starts at one since the first character is always counted as part of the length
    let counter = 1;
    // Taking advantage of the iterable nature of Strings. Starting at index one, so I can try agaist
    // the previous value
    for(let i = 1; i < word.length; i++) {
        // Getting both, the value at the current index and the one before
        let currentChar = word.charCodeAt(i);
        let previousChar = word.charCodeAt(i -1);

        // Moment of truth; If the value returned by the callback is true then we update our counter
        if(callback(currentChar, previousChar)) {
            counter++;
        } else {
            // in case the chars are not consecutive, we reset the counter
            counter = 1;
        }
        // Once the counter gets to the required length of consecutiveCharacters,
        // we diminish the times to execute counter
        if(counter === requiredLength) {
            times--;
        }
        // If the times counter reaches 0, then it shortcircuits and returns true immediately
        if(times === 0) {
            return true;
        }
    }
    // if we got at this point, there are no consecutive chars in the string
    return false;
}

/**
 * Passwords must include one increasing straight of at least three letters, like abc , cde , fgh ,
 * and so on, up to xyz . They cannot skip letters; acd doesn't count.
**/
/**
 *
 * @param {String} word
 * @param {number} requiredLength
 *
 * @return {boolean}
 */
function hasConsecutiveChars(word, requiredLength = 3, times) {
    return stringReducer(word, requiredLength, (curr, prev) => curr - 1  === prev, times);
}

/**
 * Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.
**/
/**
 *
 * @param {String} word
 * @param {number} requiredLength
 *
 * @return {boolean}
 */
function hasNonOverlappingLetters(word, requiredLength = 2, times) {
    return stringReducer(word, requiredLength, (curr, prev) => curr === prev, times);
}

/**
 * Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters
 * and are therefore confusing.
**/
/**
 *
 * @param {String} word
 * @param {String} forbidenChars a string containing all forbiden chars
 *
 * @return {boolean}
 */
function hasNotForbidenChars(word, forbidenChars = 'ilO') {
    // Let's build a regex from a word with forbidenChars
    let regex = '[';
    for(let i = 0; i < forbidenChars.length; i++) {
        regex += (i+1 < forbidenChars.length) ? `${forbidenChars[i]}|` : forbidenChars[i];
    }
    regex += ']';

    // Now let's test it against the word! If we find it, we get true, and then the test is not passed,
    // so let's negate the output
    return !(new RegExp(regex).test(word));
}

/**
 * Passwords cannot be longer than 32 characters.
 **/
function isNoLongerThan(word, length = 32) {
    return word.length <= length;
}

/**
 * Passwords can only contain lower case alphabetic characters.
**/
function hasOnlyLowerCaseChars(word = '') {
    return new RegExp('^[a-z]+$', 'g').test(word);
}

// Good old function constructor, just to make sure I still remember how to do this
// this exposes the rules so they can be chained and customized.
// ie:
// tester = new StringTester('word').testConsecutiveChars(4) will test against 4 consecutive chars like "abcd"
// tester = new StringTester('word').testConsecutiveChars(4, 2), or
// tester = new StringTester('word').testConsecutiveChars(4).times(2) will test for two ocurrences of
// four consecutive chars, like: 'abcdabcd' or 'abcdefgh' or 'abcdhgsabcd'
//
// Please note that only testsConsecutiveChars and testNonOverlappingChars can be performed multiple times,
// this is due to the content nature of the validation. Ideally, I'd make classes and let the testing methods
// inherit from them; Say, a TestContentClass that can be chained with times(). But I already started using this
// OOP interface / pure functions approach and can't make much time to refactor
export default function StringTester(word) {
    this.word = word;
    this.valid = true;
    this.ruleSet = {};
    let lastCalled, passedParam;

    this.testConsecutiveChars = (lengthRequired, times) => {
        lastCalled = this.testConsecutiveChars;
        passedParam = lengthRequired;
        this.ruleSet.consecutiveChars = hasConsecutiveChars(this.word, lengthRequired, times);
        this.valid = this.ruleSet.consecutiveChars && this.valid;
        return this;
    }

    this.testNonOverlappingChars = (lengthRequired, times) => {
        lastCalled = this.testNonOverlappingChars;
        passedParam = lengthRequired;
        this.ruleSet.nonOverlappingChars = hasNonOverlappingLetters(this.word, lengthRequired, times);
        this.valid = this.ruleSet.nonOverlappingChars && this.valid;
        return this;
    }

    this.testForbidenChars = forbidenChars => {
        this.ruleSet.forbidenChars = hasNotForbidenChars(this.word, forbidenChars);
        this.valid = this.ruleSet.forbidenChars && this.valid;
        return this;
    }

    this.testLength = length => {
        this.ruleSet.textLength = isNoLongerThan(this.word, length);
        this.valid = this.ruleSet.textLength && this.valid;
        return this;
    }

    this.testOnlyLowerCaseChars = () => {
        this.ruleSet.onlyLowerCase = hasOnlyLowerCaseChars(this.word);
        this.valid = this.ruleSet.onlyLowerCase && this.valid;
        return this;
    }

    this.times = times => {
        this.valid = lastCalled(passedParam, times) && (this.valid === true);
        return this;
    }
}