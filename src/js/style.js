const a = 5;
let b = 5;
var c = 5;

function fn() {
    console.log(window.a, window.b, window.c)
}
fn()