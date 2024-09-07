document.addEventListener('DOMContentLoaded', () => {
    const valorAnterior = document.getElementById('valor-anterior');
    const valorActual = document.getElementById('valor-actual');

    let operacionActual = '';
    let operacionPrev = '';
    let operacion = '';

    const actualizarDisplay = () => {
        valorActual.textContent = operacionActual;
        if (operacionPrev) {
            valorAnterior.textContent = `${operacionPrev} ${operacion}`;
        } else {
            valorAnterior.textContent = '';
        }
    };

    const manejarNumero = (numero) => {
        if (numero === '.' && operacionActual.includes('.')) return;
        operacionActual += numero;
        actualizarDisplay();
    };

    const manejarOperacion = (op) => {
        if (operacionActual === '') return;
        if (operacionPrev !== '') {
            calcular();
        }
        operacionPrev = operacionActual;
        operacionActual = '';
        operacion = op;
        actualizarDisplay();
    };

    const calcular = () => {
        let resultado;
        const prev = parseFloat(operacionPrev);
        const actual = parseFloat(operacionActual);

        if (isNaN(prev) || isNaN(actual)) return;

        switch (operacion) {
            case '+':
                resultado = prev + actual;
                break;
            case '-':
                resultado = prev - actual;
                break;
            case 'X':
                resultado = prev * actual;
                break;
            case '%':
                resultado = prev / actual;
                break;
            default:
                return;
        }

        operacionActual = resultado.toString();
        operacionPrev = '';
        operacion = '';
        actualizarDisplay();
    };

    const borrarTodo = () => {
        operacionActual = '';
        operacionPrev = '';
        operacion = '';
        actualizarDisplay();
    };

    const borrar = () => {
        operacionActual = operacionActual.slice(0, -1);
        actualizarDisplay();
    };

    // Asignar eventos a los botones numéricos
    document.querySelectorAll('.numero').forEach(boton => {
        boton.addEventListener('click', () => manejarNumero(boton.textContent));
    });

    // Asignar eventos a los botones de operación
    document.querySelectorAll('.operador').forEach(boton => {
        boton.addEventListener('click', () => manejarOperacion(boton.textContent));
    });

    // Asignar eventos a los botones de borrar todo y borrar
    document.querySelectorAll('button').forEach(boton => {
        if (boton.textContent === 'C') {
            boton.addEventListener('click', borrarTodo);
        } else if (boton.textContent === '←') {
            boton.addEventListener('click', borrar);
        } else if (boton.textContent === '=') {
            boton.addEventListener('click', calcular);
        }
    });
});

// Efectos al botón "="
const botonIgual = document.querySelector('.operador[value="igual"]');
botonIgual.addEventListener('mouseover', () => {
    botonIgual.style.transform = 'scale(1.1)';
    botonIgual.style.transition = 'transform 0.2s';
});

botonIgual.addEventListener('mouseout', () => {
    botonIgual.style.transform = 'scale(1)';
});

botonIgual.addEventListener('mousedown', () => {
    botonIgual.style.transform = 'scale(0.9)';
    botonIgual.style.boxShadow = 'inset 0 4px 6px rgba(0, 0, 0, 0.2)';
});

botonIgual.addEventListener('mouseup', () => {
    botonIgual.style.transform = 'scale(1)';
    botonIgual.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
});

