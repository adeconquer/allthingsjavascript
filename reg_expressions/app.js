let re;
re = /hello/
re = /hello/i; //i = case insensitive
// re = /hello/g; //i = global search


// console.log(re);
// console.log(re.source);

// functions to evalute expressions

// exec() - Return result in array or null

// const result = re.exec('hello world');
// const result = re.exec('hi world');

// test() - Returns true or false
// const result = re.test('Hello');

//match() - Return result array or null
// const str = 'Hello There'
// const result = str.match(re);


//Search - returns the index of the first match
//if not found return -1

// const str = 'Hello There'
// const result = str.search(re);

//Replace - return new string with some
// or all matches of a pattern

// const str = 'Hello There';
// const result = str.replace(re, 'Hi')

// console.log(result);

//Metacharacter Symbols
re = /^h/i; //Must start with
re = /d$/i; //Must end with
re = /^hello$/i; //Must begin and end with
re = /h.llo/i; //Matches any one character
re = /h*llo/i; //Matches any character 0 or more
re = /gre?a?y/i; //optional character
re = /gre?a?y\?/i; //escape character

// Brackets [] - Character sets
re = /gr[ae]y/i; //must be an A or E
re = /[GF]ray/i; //must be an g or f
re = /[^GF]ray/i; //must be any character but G or F
re = /[A-Z]ray/; //Match any uppercase letter
re = /[a-z]ray/; //Match any lowercase letter
re = /[A-Za-z]ray/; //Match any letter
re = /[0-9]ray/; //Match any digit

//Braces {} - Quantifiers
re = /Hello/i;
re = /Hel{2}o/i; //Must occur exactly {m} amount of times
re = /Hel{2,4}o/i; //Must occur between {n,m}  n and m amount of times
re = /Hel{2,}o/i; //Must occur at least {n,}  n times

//Parenthesis () - Grouping
re = /([0-9]x){3}/;

// ShortHand Character Classes
re = /\w/; //Word Character - alphanumerix or _
re = /\w+/; //+ = one or more
re = /\W/; //none word characters
re = /\d/; // any digit
re = /\d+/; // match any digit 0 or more times
re = /\D/; // match any non-digit
re = /\s/; //match whitespace char
re = /\S/; //match non-whitespace char
re = /Hell\b/i; //Word boundary

//Assertion

re = /x(?=y)/; //match x only if followed by y
re = /x(?!y)/; //match x only if  not followed by y



//String to match
const str = 'fcxgsaxys';

//Log results
const result = re.exec(str);
console.log(result);

function reTest(re, str) {
    if (re.test(str)) {
        console.log(`${str} matches ${re.source}`)
    } else {
        console.log(`${str} does not match ${re.source}`)
    }
}

reTest(re, str);