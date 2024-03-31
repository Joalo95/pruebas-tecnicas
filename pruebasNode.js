//prueba 1
/**
 * 1. Crea una función que lea un archivo de texto y retorne el número de palabras que hay en el archivo. Crea un archivo de texto simple como por ejemplo el siguiente:
Archivo de texto "archivo.txt": 
Este es un archivo de ejemplo.
Contiene varias palabras.
    1. **La salida esperada era:**
        1. Número de palabras: 7
 */
const fs = require("fs");

function contarPalabrasEnArchivo(archivo, callback) {
    fs.readFile(archivo, "utf-8", (err, contenido) => {
        if (err) {
            callback(err);
            return;
        }
        const palabras = contenido.split(/\s+/).filter(Boolean);
        callback(null, palabras.length);
    });
}

const archivo = "archivo.txt";
contarPalabrasEnArchivo(archivo, (err, numeroPalabras) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Número de palabras: ${numeroPalabras}`);
});

//prueba 2
/**
 * 2. Crea una aplicación de línea de comandos que lea un archivo CSV que contenga nombres y direcciones de correo electrónico, y que escriba un archivo de texto con el contenido del correo electrónico que incluya el nombre del destinatario. La aplicación debe permitir configurar la plantilla del correo electrónico a través de un archivo de configuración.
    1. Crea un archivo de texto simple como por ejemplo el siguiente:
        1. nombre,email
        Juan [Perez,jperez@example.com](mailto:Perez,jperez@example.com)
        Mario López,mlopez@example.com
    2. Crea un archivo de configuracion como por ejemplo este:
    Archivo de configuración "config.json":
        1. {
        "template": "Querido {nombre},\n\nGracias por tu interés en nuestro producto.\n\nAtentamente,\nEquipo de Ventas"
        }
    3. **La salida espera era:**
        1. Querido Juan Perez,
        Gracias por tu interés en nuestro producto.
        Atentamente,
        Equipo de Ventas
        Querido Mario López,
        Gracias por tu interés en nuestro producto.
        Atentamente,
        Equipo de Ventas
 */
const fs = require("fs");
const csv = require("csv-parser");

function generarCorreosDesdeCSV(
    archivoCSV,
    archivoConfiguracion,
    archivoSalida,
    callback
) {
    fs.readFile(archivoConfiguracion, "utf-8", (err, contenidoConfiguracion) => {
        if (err) {
            callback(err);
            return;
        }
        const configuracion = JSON.parse(contenidoConfiguracion);
        const plantilla = configuracion.template;
        const correos = [];
        fs.createReadStream(archivoCSV)
            .pipe(csv())
            .on("data", (data) => {
                const nombre = data.nombre;
                const correo = data.email;
                const correoPersonalizado = plantilla.replace("{nombre}", nombre);

                correos.push(correoPersonalizado);
            })
            .on("end", () => {
                const contenidoCorreos = correos.join("\\n\\n");
                fs.writeFile(archivoSalida, contenidoCorreos, (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    console.log(
                        `Se han generado los correos electrónicos en el archivo "${archivoSalida}".`
                    );
                    callback(null);
                });
            });
    });
}

const archivoCSV = "contactos.csv";
const archivoConfiguracion = "config.json";
const archivoSalida = "correos.txt";
generarCorreosDesdeCSV(archivoCSV, archivoConfiguracion, archivoSalida, (err) => {
    if (err) {
        console.error(err);
        return;
    }
});