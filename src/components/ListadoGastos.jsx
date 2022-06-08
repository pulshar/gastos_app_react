import Gasto from "./Gasto"


const ListadoGastos = ( {gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados} ) => {
  return (
    <div className="listado-gastos contenedor">

        {
          filtro ? (
            <>
            <h2>{ gastosFiltrados.length ? 'Gastos' : `Ningún gasto en la categoría '${filtro}'` }</h2>
              <div className="grid-gastos">
                {
                  gastosFiltrados.map( (gasto) => {
                    return (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    )
                  })
                }
              </div>
            </>
          ) : (
            <>
            <h2>{ gastos.length ? 'Gastos' : 'Aún no hay gastos' }</h2>
              <div className="grid-gastos">
                {
                  gastos.map( (gasto) => {
                    return (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    )
                  })
                }
              </div>
            </>
          )
        }
    </div>
  )
}

export default ListadoGastos