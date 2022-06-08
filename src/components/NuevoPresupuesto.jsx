import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    

    const [ mensaje, setMensaje ] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()
        if (!presupuesto || presupuesto < 0) {
            setMensaje('El presupuesto no es válido')
            return
        } 

        setMensaje('')
        setIsValidPresupuesto(true)
    }
  return (
      <div className="contenedor-presupuesto contenedor sombra">
          <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir presupuesto</label>
                <input 
                    type="number"
                    className="nuevo-presupuesto"
                    placeholder="Añade presupuesto"
                    value={presupuesto}
                    onChange={ e => {
                        setPresupuesto( Number(e.target.value) )
                    }}
                />
            </div>
            <input
                type="submit"
                value="Anadir"
                />
                { mensaje &&
                <Mensaje
                    tipo="error">{mensaje}
                </Mensaje>
                }
          </form>
      </div>
    
  )
}

export default NuevoPresupuesto