import PropTypes from "prop-types";
import { useState } from "react";

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
    
    const[error, setError] = useState(false); 

    
    //Destructuring del estado
    const {ciudad, pais} = busqueda;


    //Función que actualiza el state
    const handlerChange = e =>
        //Actualizar el estado
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })

        const handlerSubmit = e=>{
            e.preventDefault();

            //Validar
            if(ciudad.trim() === "" || pais.trim() ===""){
                setError(true);
                return;
            }
            setError(false);
            setConsultar(true);
        }
    

    return (
        <form onSubmit={handlerSubmit}>
            {error && <p className ="red darken-4">*Fill in all the fields</p> }
            <div className ="input-field col s12">
                <input 
                    type="text" 
                    name = "ciudad"
                    id = "ciudad"
                    value ={ciudad}
                    onChange ={handlerChange}
                />
                <label htmlFor="ciudad">City:</label>

            </div>
            <div className ="input-field col s12">
                <select 
                    name="pais" 
                    id="pais"
                    value ={pais}
                    onChange ={handlerChange}
                >
                    <option value="">-- Choose a country --</option>
                    <option value="US">United States</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentine</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">Spain</option>
                    <option value="PE">Perú</option>

                </select>
                <div className ="input-field col s12">
                    <input 
                        type="submit"
                        value= "Look for weather"
                        className ="waves-effect waves-light btn-large btn-block yellow accent-4" 
                    
                    />

                </div>
            </div>
        </form>
    );
};

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired
}

export default Formulario;