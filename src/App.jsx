import { useState, useEffect } from 'react'
import FiltroGastos from './components/FiltroGastos'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {


  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastosLS') ? JSON.parse(localStorage.getItem('gastosLS')) : []
  )

  const [ presupuesto, setPresupuesto ]  = useState( Number( localStorage.getItem('presupuesto') ) ?? 0  )
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)

  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)

  const [ gastoEditar, setGastoEditar ] = useState({})

  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])

  useEffect(() => {
      if( Object.keys(gastoEditar).length > 0 ) {
        setModal(true)

        setTimeout(() => {
          setAnimarModal(true)
        }, 300);
      }
  }, [gastoEditar])
  
  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoriaGasto === filtro)
      setGastosFiltrados(gastosFiltrados)
    } 
  }, [filtro])
  
 useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0 )
 }, [presupuesto])

 useEffect(() => {
    localStorage.setItem('gastosLS', JSON.stringify(gastos) ?? [] )
 }, [gastos])
 
 useEffect(() => {
    const presupuestoLocalStorage = localStorage.getItem('presupuesto')
    presupuestoLocalStorage > 0 && setIsValidPresupuesto(true)

 }, [])
 
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  const guardarGasto = ( gasto ) => {
    if (gasto.id) {
      // actualizamos gasto
      const gastosActualizados = gastos.map( gastoState =>  gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
      setGastoEditar({})
      
    } else {
      // nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos( [...gastos, gasto] )
    }
    
    setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
  }

  const eliminarGasto = (id) => {
    // console.log('Eliminar', id)
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id )
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : null }>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      { isValidPresupuesto && (

        <>
          <main>
            { gastos.length > 0 &&
            <FiltroGastos
              filtro={filtro}
              setFiltro={setFiltro}
            />
          }
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Nuevo gasto"
              onClick={handleNuevoGasto}
              />
          </div>
        </>
      )}
      
      { modal && ( <Modal
                      setModal={setModal}
                      animarModal={animarModal}
                      setAnimarModal={setAnimarModal}
                      guardarGasto={guardarGasto}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}
                    />
      )}
    </div>
    
    
  )
}

export default App
