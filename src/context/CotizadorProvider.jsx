import { useState, createContext } from 'react';
import { calcularMarca, ObtenerDiferenciaYear, calcularPlan, formatearDinero } from '../helpers';

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [error, setError] = useState('');
    const [resultado , setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });

        setError('');
    }

    const cotizadorSeguro = () => {
        //una base
        let res = 2000;
        console.log(datos.year)
        //obtener diferencia de años
        const diferencia = ObtenerDiferenciaYear(Number(datos.year));
        //hay que restar 3% por cada año
        res -= ((diferencia * 3) * res) / 100;
        //Americano 15%
        //Europeo 30%
        //Asitico 5%
        res *= calcularMarca(datos.marca);
        //Basico 20%
        //Completo 50%
        res *= calcularPlan(datos.plan);
        //formatear dinero
        res = formatearDinero(res);
        console.log(res);
        setCargando(true);
        setTimeout(()=>{
            setResultado(res);
            setCargando(false);
        },1500);
        
    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizadorSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
};

export default CotizadorContext;