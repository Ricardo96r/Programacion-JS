/*
 *   Script para cifrar y descifrar por el metodo del cifrado de Vinegere
 */

// Variables a insertar
var men_cif = "pazyamor"; // mensaje a cifrar
var men_des = "hokqoxgf"; // mensaje a descrifrar
var clave = "sol"; // clave

var abecedario = "abcdefghijklmnopqrstuvwxyz";
var tamanio = men_cif.length;
var claveN, cifrado, descifrado, matriz;

/*
 *		Funcion que crea la tabla de vinegere
 */

function crearMatriz() {
    var matriz = new Array(abecedario.length);
    var z = 0;
    for (n = 0; n < 26; n++) {
        matriz[n] = new Array(abecedario.length)
        for (m = 0; m < 27; m++) {
            if (n + m < 26) {
                matriz[n][m] = abecedario[m + n];
            }
            else {
                matriz[n][m] = abecedario[z];
                z++;
            }
        }
        z = 0;
    }
    return matriz;
}

/*
 *		Funcion para obtener la clave final que se usará mediante el procedimiento de VINEGERE
 *		EJEMPLO:   ESTAESLAORACIONAENCRIPTAR - ESTAESLACLAVE
 *		RESULTADO: ESTAESLACLAVEESTAESLACLAV = CLAVE FINAL
 */

function claveFinal(clave, tamanio) {
    for (n = 0, final = [], cont = 0; n < tamanio; n++) {
        if (clave[cont] == clave[clave.length]) {
            cont = 0;
        }
        final[n] = clave[cont];
        cont++;
    }
    return final;
}

/*
 *		Funcion bucle que da valores de 0 a 26
 *		de un array de letras
 */

function letrasANumeros(cadena) {
    for (n=0, final = []; n < cadena.length; n++) {
        for (m=0; m < abecedario.length; m++) {
            if (cadena[n] == abecedario[m]) {
                final[n] = m;
            }
        }
    }
    return final;
}

/*
 *		Cifrado de vinegere por matriz o por formula matematica
 */


function cifrar(cadena, clave, matriz) {
    final = new Array(cadena.length);
    for (n = 0; n < cadena.length; n++) {
        // final[n] = abecedario[(cadena[n] + clave[n]) % 26];
        final[n] = matriz[cadena[n]][clave[n]];
    }
    return final;
}

/*
 *		Descifrar usando la formula matematica de vinegere.
 *		 - Si EL mensaje es mayor o igual se suma el caracter del mensaje y el caracter de la clave y se saca el resto de 26
 *			(mensajeCaracterNumerico + claveCaracterNumero) MOD 26
 *
 *		 - Si el mensaje es menor, se resta el caracter del mensaje con el caracter de la clave y se suma 26
 *			(mensajeCaracterNumerico - claveCaracterNumero) + 26
 */

function descifrar(cadena, clave) {
    for (n = 0; n < cadena.length; n++) {
        if (cadena[n] >= clave[n]) {
            cadena[n] = abecedario[(cadena[n] - clave[n]) % 26];
        } else {
            cadena[n] = abecedario[(cadena[n] - clave[n]) + 26];
        }
    }
    return cadena;
}

// Datos a mostrar


claveN = letrasANumeros(claveFinal(clave, tamanio));
matriz = crearMatriz();
cifrado = cifrar(letrasANumeros(men_cif), claveN, matriz);
descifrado = descifrar(letrasANumeros(men_des), claveN, matriz);

console.log(cifrado);
console.log(descifrado);