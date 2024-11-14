// Función para validar los campos de entrada y agregar la clase 'error' a los vacíos.
// También muestra una alerta si alguno de los campos está vacío.
const validateInputs = () => {
    // Selecciona los elementos de los campos de entrada
    const fields = [
        document.getElementById('inputFirstname'),
        document.getElementById('inputLastname'),
        document.getElementById('inputEmail')
    ];

    // Filtra los campos que están vacíos (tienen valor en blanco o solo espacios)
    // Si luego de hacer un trim, el valor del campo es igual a un string vacío, entonces se considera vacío
    const emptyFields = fields.filter(field => field.value.trim() === '');

    // Agrega la clase 'error' a cada campo que esté vacío
    // Esto hará que los campos vacíos se resalten en rojo
    emptyFields.forEach(field => field.classList.add('error'));

    // Si hay campos vacíos, muestra una alerta y retorna false para indicar que la validación falló
    // Esto detendrá la ejecución de la función addContact
    if (emptyFields.length > 0) {
        alert('Debes completar todos los campos!');
        return false;
    }

    // Si no hay campos vacíos, elimina la clase 'error' de todos los campos
    // Esto eliminará cualquier resaltado en rojo de los campos
    fields.forEach(field => field.classList.remove('error'));
    return true; // Retorna true si la validación es exitosa
};

// Función para agregar un contacto a la tabla
const addContact = () => {
    // Verifica que los campos estén llenos; si no, detiene la ejecución
    if (!validateInputs()) return;

    // Obtiene los valores de los campos de entrada, eliminando espacios adicionales
    const [firstName, lastName, email] = [
        document.getElementById('inputFirstname').value.trim(),
        document.getElementById('inputLastname').value.trim(),
        document.getElementById('inputEmail').value.trim()
    ];

    // Obtiene el valor del select que indica el grupo de edad del contacto
    const ageGroup = document.getElementById('selectAge').value;

    // Crea una nueva fila (tr) para agregar a la tabla
    // La clase de la fila será la misma que la categoría de edad del contacto
    const row = document.createElement('tr');
    // Asigna la clase correspondiente al grupo de edad (infant, teen o adult) al nuevo tr
    row.classList.add(ageGroup);

    // Crea una celda (td) por cada dato del contacto (nombre, apellido y email)
    // Asigna el texto de cada celda al valor correspondiente del contacto
    [firstName, lastName, email].forEach(text => {
        const cell = document.createElement('td'); // Crea una celda de la tabla
        cell.textContent = text; // Asigna el texto de la celda al valor del contacto
        row.appendChild(cell); // Agrega la celda a la fila de la tabla
    });

    // Agrega la fila completa al tbody de la tabla de contactos
    // Esto mostrará el contacto en la tabla
    document.querySelector('#contacts tbody').appendChild(row);

    // Limpia los campos de entrada después de agregar el contacto a la tabla
    clearInputs();
};

// Función para limpiar los campos de entrada (nombre, apellido, y email) después de agregar un contacto
const clearInputs = () => {
    ['inputFirstname', 'inputLastname', 'inputEmail'].forEach(id => {
        document.getElementById(id).value = ''; // Establece el valor de cada campo en vacío
    });
};

// Función para eliminar contactos por categoría de edad
const removeContactsByAge = ageGroup => {
    // Selecciona todas las filas (tr) que tienen la clase correspondiente a la categoría de edad
    // Luego, elimina cada fila de la tabla
    const rows = Array.from(document.querySelectorAll(`#contacts tbody tr.${ageGroup}`));
    // Elimina cada fila que coincide con la clase de edad
    rows.forEach(row => row.remove());
};

// Función para asociar eventos a los botones de la interfaz
const setupEventListeners = () => {
    // Asocia el botón "Agregar" a la función addContact para agregar un contacto
    // cuando el botón es clickeado
    // El botón tiene la clase 'btnAdd'
    // Cuando el botón es clickeado, se ejecutará la función addContact
    document.querySelector('.btnAdd').addEventListener('click', addContact);

    // Asocia cada botón de eliminación (infant, teen y adult) a la función removeContactsByAge
    // para eliminar contactos de la tabla por categoría de edad
    // Los botones tienen las clases 'removeBtn infant', 'removeBtn teen' y 'removeBtn adult'
    // Cuando un botón es clickeado, se ejecutará la función removeContactsByAge con el grupo de edad correspondiente
    // Por ejemplo, el botón con la clase 'removeBtn infant' eliminará todos los contactos de la categoría 'infant'
    // El botón con la clase 'removeBtn teen' eliminará todos los contactos de la categoría 'teen'
    // El botón con la clase 'removeBtn adult' eliminará todos los contactos de la categoría 'adult'
    ['infant', 'teen', 'adult'].forEach(ageGroup => {
        document.querySelector(`.removeBtn.${ageGroup}`).addEventListener('click', () => removeContactsByAge(ageGroup));
    });
};

// Inicializa el script cuando el contenido del DOM ha cargado completamente
// Asocia los eventos a los elementos de la interfaz
// Esto asegura que los eventos se asocien correctamente a los elementos de la interfaz
// Document Object Model (DOM) es la estructura de objetos que representa la página web
document.addEventListener('DOMContentLoaded', setupEventListeners);
