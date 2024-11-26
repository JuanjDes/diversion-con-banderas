const listado = document.getElementById('countries-list');

const llamadaApi = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        const data = await response.json();
    
        // ordeno los paises alfabeticamente
        const ordenados = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        console.log(ordenados);
        // muestro las banderas en pantalla
        ordenados.forEach(country => {
            // contenedor para bandera y nombre            
            const paisContainer = document.createElement('div');
            paisContainer.classList.add('pais-container');
            
            // creo imagen de la bandera
            const img = document.createElement('img');
            img.src = country.flags[1]; // url de la imagen de la bandera
            img.alt = country.name.common;
            img.classList.add('countries');

            // creo texto para el nombre del pais
            const nombre = document.createElement('h3');
            nombre.textContent = country.name.common;
            nombre.classList.add('nombre-pais');
            
            // evento de click en la bandera
            img.addEventListener('click', () => {
                mostrarVentana(country);
            });

            // anado imagen y texto al contenedor
            paisContainer.appendChild(img);
            paisContainer.appendChild(nombre);
            listado.appendChild(paisContainer);
           
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al cargar los datos');
    }
};

// función para mostrar una ventana con información del país al hacer click en la bandera
const mostrarVentana = (country) => {
    // creo la ventana y le añado clase ventana y modo
    const ventana = document.createElement('div');
    ventana.classList.add('ventana');
    
    const modo = document.createElement('div');
    modo.classList.add('modo');

    // añado contenido a la ventana
    // toLocaleString() - pasa population a String en formato local
    modo.innerHTML = `
        <img src="${country.flags[1]}" alt="Bandera pequeña de ${country.name.common}" class="modo-flag">
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital ? country.capital[0] : 'No disponible'}</p>
        <p>Población: ${country.population.toLocaleString()}</p>
        <p>Conduce por: ${country.car.side === 'right' ? 'Derecha' : 'Izquierda'}</p>
        <button class='btnCerrar'>Cerrar</button>`;

    // añado la ventana al cuerpo
    ventana.appendChild(modo);
    document.body.appendChild(ventana);

    // cierro ventana al hacer click
    modo.querySelector('.btnCerrar').addEventListener('click', () => {
        ventana.remove();
    });
    
};

llamadaApi();