const http = require('http');
const fs = require('fs');

function generarTodasCombinaciones() {
    const numeros = [];

    // Genera un array con números del 1 al 48
    for (let i = 1; i <= 48; i++) {
        numeros.push(i);
    }

    const combinaciones = [];

    // Genera todas las combinaciones posibles de 5 números
    function generarCombinacionesRecursivas(combinacionParcial, numerosRestantes) {
        if (combinacionParcial.length === 5) {
            if (!descartarCombinacion(combinacionParcial)) {
                combinaciones.push([...combinacionParcial]);
            }
            return;
        }

        for (let i = 0; i < numerosRestantes.length; i++) {
            const numeroElegido = numerosRestantes[i];
            generarCombinacionesRecursivas(
                [...combinacionParcial, numeroElegido],
                numerosRestantes.slice(i + 1)
            );
        }
    }

    generarCombinacionesRecursivas([], numeros);

    return combinaciones;
}

function descartarCombinacion(combinacion) {
    let consecutivosAscendentes = 0;
    let consecutivosDescendentes = 0;
    let paresConsecutivos = 0;
    let imparesConsecutivos = 0;
    let primerosDigitos = {}; // para contar las repeticiones del primer dígito
    let dosCifrasConsecutivas = null; // Almacenará el primer dígito más repetido
    let menorDiez = 0; // Contador de valores menores a 10

    for (let i = 0; i < combinacion.length - 1; i++) {
        const num1 = combinacion[i];
        const num2 = combinacion[i + 1];

        if (Math.abs(num1 - num2) === 1) {
            // Verifica si hay valores consecutivos ascendentes o descendentes
            consecutivosAscendentes++;
            consecutivosDescendentes++;
        }
        else if (Math.abs(num1 - num2) === 2) {
            // Verifica si hay valores pares o impares consecutivos
            if (num1 % 2 === 0 && num2 % 2 === 0) {
                paresConsecutivos++;
            }
            else if (num1 % 2 !== 0 && num2 % 2 !== 0) {
                imparesConsecutivos++;
            }
            else {
                paresConsecutivos = 0;
                imparesConsecutivos = 0;
            }
        }

        // Contar las repeticiones del primer dígito
        const primerDigito = num1.toString().charAt(0);
        if (primerosDigitos[primerDigito]) {
            primerosDigitos[primerDigito]++;
        } else {
            primerosDigitos[primerDigito] = 1;
        }

        // Encontrar el primer dígito más repetido
        const primerDigitos = Object.keys(primerosDigitos);
        dosCifrasConsecutivas = primerDigitos.reduce((a, b) => primerosDigitos[a] > primerosDigitos[b] ? a : b);

        // Verificar si el valor es menor a 10
        if (num1 < 10) {
            menorDiez++;
        }

        // Si se cumple alguna de las condiciones, retorna true
        if (consecutivosAscendentes > 1 || consecutivosDescendentes > 1 || paresConsecutivos > 1 || imparesConsecutivos > 1 || (dosCifrasConsecutivas && primerosDigitos[dosCifrasConsecutivas] > 2) || menorDiez > 2) {
            return true;
        }
    }

    return false;
}

function generarCSV(combinaciones) {
    const csvContent = combinaciones.map(combinacion => combinacion.join(',')).join('\n');
    fs.writeFileSync('combinaciones.csv', csvContent);
}

// Crea un servidor HTTP
const server = http.createServer((req, res) => {
    // Configura la respuesta HTTP
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Ruta para generar todas las combinaciones y guardar el archivo CSV
    if (req.url === '/generar') {
        // Generar todas las combinaciones y guardarlas en un archivo CSV
        const todasCombinaciones = generarTodasCombinaciones();
        generarCSV(todasCombinaciones);
        res.end('Combinaciones generadas y guardadas en combinaciones.csv\n');
    }
});

// Escucha en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});