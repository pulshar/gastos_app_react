import { useState, useEffect } from "react";

// https://www.npmjs.com/package/react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ( {gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    useEffect(() => {
      const totalGastado = gastos.reduce( ( total, gasto ) => gasto.cantidadGasto + total, 0 )
      const totalDisponible = presupuesto - totalGastado

      //calcular porcentaje gastado
      const porcentajeGastado = (totalGastado*100/presupuesto).toFixed(2)

      setDisponible(totalDisponible)
      setGastado(totalGastado)

      setTimeout(() => { // para que tarde un poco la animación de la gráfica 
        setPorcentajeGrafica(porcentajeGastado)
      }, 750);
      

    }, [gastos])
    
    const [ disponible, setDisponible ] = useState(0)
    const [ gastado, setGastado ] = useState(0)
    const [ porcentajeGrafica, setPorcentajeGrafica ] = useState(0)

    const convertToCurrency = (cantidad) => {
        return (cantidad).toLocaleString('es', {
            style: 'currency',
            currency: 'EUR',
          });
    }

    const handleResetApp = () => {
      const resultado = confirm('¿Deseas reiniciar el presupuesto y los gastos?')

      if(resultado) {
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
        <CircularProgressbar
          value={porcentajeGrafica}
          text={`${porcentajeGrafica}% gastado`}
          styles={{
            // Customize the path, i.e. the "completed progress"
            path: {
              // Path color
              // stroke: '#3b82f6',
              stroke: porcentajeGrafica > 100 ? '#DC2626' : '#3b82f6',
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: '#e5e5e5',
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',
            },
            // Customize the text
            text: {
              // Text color
              fill: porcentajeGrafica > 100 ? '#DC2626' : '#3b82f6',
              // Text size
              fontSize: '16px',
            },
          }}
        />
        </div>
        <div className="contenido-presupuesto">
          <button
            className="reset-app"
            type="button"
            onClick={handleResetApp}
          >
            Resetear app
          </button>
          <p><span>Presupuesto: </span>{convertToCurrency(presupuesto)}</p>
          <p className={`${disponible < 0 ? 'negativo' : null }`}><span>Disponible: </span>{convertToCurrency(disponible)}</p>
          <p><span>Gastado: </span>{convertToCurrency(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto