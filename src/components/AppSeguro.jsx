import React from 'react'
import Formulario from './Formulario';
import useCotizador from '../hooks/useCotizador';

const AppSeguro = () => {
  const { resultado, cargando } = useCotizador();

  return (
    <>
      <header className='my-10'>
        <h1 className='ext-white text-center text-4xl font-black'>Cotizador de Seguros de Auto</h1>
      </header>

      <main className='bg-white md:w-2/3 lg:w-2/4 mx-auto shadow rounded-lg p-10'>
        <Formulario />
        {cargando ? 'Cargando...' : resultado}
      </main>
    </>
  )
}

export default AppSeguro;
