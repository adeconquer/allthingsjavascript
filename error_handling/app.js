const user = { email: 'jdoe@gmail.com' }

try {
    //Producec a reference erroe
    // myFunction();

    //Produce a typeerror
    // null.myFunction();

    //Produce Syntax error
    // eval('Hello World')

    //URIError
    // decodeURIComponent('%');

    // if (!user.name) {
    //     // throw new Error('User has no name');
    //     throw new SyntaxError('User has no name')
    // }

} catch (e) {
    console.log(e)
        // console.log(e.name);
        // console.log(e.message);
        // console.log(e instanceof TypeError);
} finally {
    console.log("finally runs regardless of result.")
}

console.log(`Program Continues...`)