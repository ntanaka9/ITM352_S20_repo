attributes  =  "Nami;29;29.5;-28.5";
var pieces = attributes.split(';');
for (i=0; i<pieces.length; i++) {
    console.log(pieces[i]);
}
console.log(pieces.join('+'));