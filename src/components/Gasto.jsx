import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
//https://www.npmjs.com/package/react-swipeable-list

import { formatearFecha } from "../helpers"

import iconoAhorro from '../img/icono_ahorro.svg'
import iconoCasa from '../img/icono_casa.svg'
import iconoComida from '../img/icono_comida.svg'
import iconoGastos from '../img/icono_gastos.svg'
import iconoOcio from '../img/icono_ocio.svg'
import iconoSalud from '../img/icono_salud.svg'
import iconoSuscripciones from '../img/icono_suscripciones.svg'

const coleccionIconos = {
    ahorro: iconoAhorro,
    comida: iconoComida,
    casa: iconoCasa,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripciones: iconoSuscripciones
}

const Gasto = ( {gasto, setGastoEditar, eliminarGasto} ) => {

    const { nombreGasto, cantidadGasto, categoriaGasto, id, fecha } = gasto

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
            Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
    <TrailingActions>
        <SwipeAction
            onClick={() => eliminarGasto(id)}
            destructive={true}
        >
        Eliminar
        </SwipeAction>
    </TrailingActions>
    );



  return (
      <SwipeableList>
          <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
          >
            <div className="gasto sombra">
                <div className="contenido-gasto">
                <img src={coleccionIconos[categoriaGasto]} alt="Icono tipo gasto" />
                    <div className="descripcion-gasto">
                        <p className="categoria">{categoriaGasto}</p>
                        <p className="nombre-gasto">{nombreGasto}</p>
                        <p className="fecha-gasto">Agregado el: <span>{formatearFecha(fecha)}</span></p>
                    </div>
                </div>
                <p className="cantidad-gasto">{cantidadGasto}€</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto