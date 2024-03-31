//prueba 1
/* Dado el array `let array = ['ab', 'abb', 'abbabbabbaa']`
 eliminar las letras contiguas repetidas y devolver el array ordenado de mayor a menor.
 Salida esperada era
 `['abababa','ab','ab']`
*/
function eliminarLetrasRepetidas(array) {
  const resultado = array.map((str) => {
    let newStr = str[0] || "";
    for (let i = 1; i < str.length; i++) {
      if (str[i] !== str[i - 1]) {
        newStr += str[i];
      }
    }
    return newStr;
  });
  return resultado.sort((a, b) => b.length - a.length);
}
const array = ["ab", "abb", "abbabbabbaa"];
const resultado = eliminarLetrasRepetidas(array);
console.log(resultado);

//prueba 2
/**
El objetivo de la función FormatString es quitar todos los caracteres especiales de la cadena
de caracteres que viene como parámetro.
Solo se permiten:
    1. Las 26 letras del alfabeto inglés
    2. Números de 0-9
    3. Espacios
    4. Guiones medios y bajos.
        1. La siguiente función, ¿cumple con lo necesario para resolver el enunciado?
 */
function FormatString(sentence) {
  let result = [];

  sentence = sentence.toUpperCase();

  let i = 0;
  let j = 0;

  while (i < sentence.lenght) {
    if (
      (sentence.charCodeAt(i) >= 65 && sentence.charCodeAt(i) <= 90) ||
      (sentence.charCodeAt(i) >= 48 && sentence.charCodeAt(j) <= 57) ||
      sentence.charCodeAt(i) == 32 ||
      sentence.charCodeAt(i) == 45
    ) {
      sentence[j] = result[i];
      j += 1;
    }
    i += 1;
  }
  return result.join("");
}
//solucion
const formatString = (sentence) => {
  const result = sentence
    .toUpperCase()
    .split("")
    .filter((char) => /[A-Z0-9 \-_]/.test(char))
    .join("");
  return result;
};

//prueba 4
/**
 * Crea una función que tome dado: const input2 = { a: 'valor1', b: 'valor2', c: 'valor3' };
 * devuelva un nuevo objeto con todas las claves del objeto original,
 * pero con los valores convertidos a mayúsculas.
 *
 * Salida esperada
 *  const output2 = { a: 'VALOR1', b: 'VALOR2', c: 'VALOR3' };
 */
function convertirValoresMayusculas(obj) {
  const newObj = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value.toUpperCase()])
  );
  return newObj;
}

//prueba 5
/**
 * Crea una función que dado: const input3 = [1, 5, 2, 9, 3];
 * devuelva la suma de los números más grandes en el arreglo.
 *
 * Salida esperada
 * const output3 = 14;
 */

function sumarDosNumerosMasGrandes(arr) {
  let max1 = -Infinity;
  let max2 = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max1) {
      max2 = max1;
      max1 = arr[i];
    } else if (arr[i] > max2) {
      max2 = arr[i];
    }
  }
  return max1 + max2;
}

//prueba 8
/**
 * Crea una función que dado: const texto = "Hola hola HOLA mundo mundo Hola"; retorne un objeto que contenga la frecuencia de cada palabra en la cadena. La función debe ignorar el caso de las palabras.
   Salida esperada
        {
            hola: 3,
            mundo: 2
        }
 */
function contarFrecuenciaPalabras(texto) {
  const palabras = texto.toLowerCase().split(" ");
  const frecuencia = palabras.reduce((acc, palabra) => {
    acc[palabra] = (acc[palabra] || 0) + 1;
    return acc;
  }, {});
  return frecuencia;
}