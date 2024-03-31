//prueba 1
/**
 * Crea un componente de React que muestre una lista de elementos, 
 * y al hacer clic en un elemento se muestre su contenido completo.
 */
function ListaElementos({ elementos }) {
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
    const handleClick = (elemento) => {
        if (elemento === elementoSeleccionado) {
            setElementoSeleccionado(null);
        } else {
            setElementoSeleccionado(elemento);
        }
    };
    return (
        <>
            <ul>
                {elementos.map((elemento) => (
                    <li
                        key={elemento.id}
                        onClick={() => handleClick(elemento)}
                        style={{
                            fontWeight: elemento === elementoSeleccionado ? "bold" : "normal",
                        }}
                    >
                        {elemento.titulo}
                    </li>
                ))}
            </ul>
            {elementoSeleccionado && (
                <div>
                    <h2>{elementoSeleccionado.titulo}</h2>
                    <p>{elementoSeleccionado.contenido}</p>
                </div>
            )}
        </>
    );
}

//prueba 2
/**
 * Crea un formulario de contacto en React 
 * que valide los campos de entrada (por ejemplo, que el correo electrónico sea válido).
 */
function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});
    const handleSubmit = (event) => {
        event.preventDefault();

        const errores = {};
        if (!nombre.trim()) {
            errores.nombre = "El nombre es requerido";
        }
        if (!correo.trim()) {
            errores.correo = "El correo electrónico es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            errores.correo = "El correo electrónico no es válido";
        }
        if (!mensaje.trim()) {
            errores.mensaje = "El mensaje es requerido";
        }
        setErrores(errores);

        if (Object.keys(errores).length === 0) {
            // enviar el formulario
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input
                    type="text"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    style={{
                        backgroundColor: errores.nombre ? "lightpink" : "white",
                    }}
                />
            </label>
            {errores.nombre && <p>{errores.nombre}</p>}
            <label>
                Correo electrónico:
                <input
                    type="email"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    style={{
                        backgroundColor: errores.correo ? "lightpink" : "white",
                    }}
                />
            </label>
            {errores.correo && <p>{errores.correo}</p>}
            <label>
                Mensaje:
                <textarea
                    value={mensaje}
                    onChange={(event) => setMensaje(event.target.value)}
                    style={{
                        backgroundColor: errores.mensaje ? "lightpink" : "white",
                    }}
                />
            </label>
            {errores.mensaje && <p>{errores.mensaje}</p>}
            <button type="submit">Enviar</button>
        </form>
    );
}
// prueba 3
/**
 * Crea un componente de React que muestre una tabla con datos obtenidos de una API. Permite la búsqueda y filtrado por diferentes campos.
    1. Utiliza alguna de estas Api:
    2. [https://swapi.dev/](https://swapi.dev/)
    3. [https://developer.spotify.com/documentation/web-api](https://developer.spotify.com/documentation/web-api)
    4. [https://pokeapi.co/](https://pokeapi.co/)
 */
import { useState, useEffect } from "react";

function TablaAlbumesSpotify({ accessToken }) {
    const [albumes, setAlbumes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroArtista, setFiltroArtista] = useState("");

    useEffect(() => {
        if (!accessToken) return;
        fetch("https://api.spotify.com/v1/me/albums", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAlbumes(data.items);
            });
    }, [accessToken]);

    const albumesFiltrados = albumes
        .filter((album) =>
            album.album.name.toLowerCase().includes(busqueda.toLowerCase())
        )
        .filter((album) =>
            album.album.artists[0].name
                .toLowerCase()
                .includes(filtroArtista.toLowerCase())
        );

    return (
        <>
            <input
                type="text"
                placeholder="Buscar por nombre de álbum"
                onChange={(event) => setBusqueda(event.target.value)}
            />
            <input
                type="text"
                placeholder="Filtrar por artista"
                onChange={(event) => setFiltroArtista(event.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nombre del álbum</th>
                        <th>Artista</th>
                        <th>Fecha de lanzamiento</th>
                    </tr>
                </thead>
                <tbody>
                    {albumesFiltrados.map((album) => (
                        <tr key={album.album.id}>
                            <td>{album.album.name}</td>
                            <td>{album.album.artists[0].name}</td>
                            <td>{album.album.release_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}