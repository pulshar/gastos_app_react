import { useState, useEffect } from "react"
import IconoCierreModal from "../img/cerrar.svg"
import Mensaje from "./Mensaje"

const Modal = ( { setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar } ) => {
    
    const [ nombreGasto, setNombreGasto ] = useState('')
    const [ cantidadGasto, setCantidadGasto ] = useState(0)
    const [ categoriaGasto, setCategoriaGasto ] = useState(0)
    const [ fecha, setFecha ] = useState('')
    const [ id, setId ] = useState('')

    const [ mensaje, setMensaje ] = useState('')

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0) {
            setNombreGasto(gastoEditar.nombreGasto)
            setCantidadGasto(gastoEditar.cantidadGasto)
            setCategoriaGasto(gastoEditar.categoriaGasto)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])
    

    const ocultarModal = () => {
        setAnimarModal(false)
        
        setTimeout(() => {
            setGastoEditar({})
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if( [nombreGasto, cantidadGasto, categoriaGasto].includes('') ) {
            setMensaje('Todos los campos son obligatorios')
            return
        }
        if (!cantidadGasto || cantidadGasto < 0) {
            setMensaje('La cantidad introducida no es válida')
            return
        } 

        setMensaje('')
        guardarGasto( {nombreGasto, cantidadGasto, categoriaGasto, id, fecha} )
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={IconoCierreModal}
                alt="Cierre modal"
                onClick={ocultarModal}
            />
        </div>
        <form
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend> {gastoEditar.nombreGasto ? 'Editar gasto' : 'Nuevo gasto'} </legend>
            {
                mensaje && 
                <Mensaje tipo="error">
                    {mensaje}
                </Mensaje>
            }
            <div className="campo">
                <label htmlFor="nombre">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Añade el nombre del gasto"
                    value={nombreGasto}
                    onChange={ e => setNombreGasto(e.target.value) }
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    id="cantidad"
                    type="number"
                    placeholder="Añade la cantidad: ej. 300"
                    value={cantidadGasto}
                    onChange={ e => setCantidadGasto( Number(e.target.value) )}
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoría</label>
                <select name=""
                    value={categoriaGasto}
                    onChange={ e => setCategoriaGasto( e.target.value )}
                    id="categoria">
                    <option value="">Selecciona</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombreGasto ? 'Guardar cambios' : 'Añadir gasto'} />
        </form>
    </div>
  )
}

export default Modal