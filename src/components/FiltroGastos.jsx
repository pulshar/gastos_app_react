import { useState, useEffect } from "react"


const FiltroGastos = ( {filtro, setFiltro} ) => {


    useEffect(() => {
      
    }, [])
    

  return (
    <div className="filtros sombra contenedor">

        <form>
            <div className="campo">
                <label htmlFor="filtro">Filtro gastos</label>
                <select name=""
                    value={filtro}
                    onChange={ e => setFiltro( e.target.value )}
                    id="filtro">
                    <option value="">--Todas las categorías--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default FiltroGastos