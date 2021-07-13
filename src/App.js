
import { useState} from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";


function App() {

  //Declaración de estado inicial
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: ""
})

  const [consultar, setConsultar] = useState(false);

  const [resultado, setResultado] = useState({});

  const [error, setError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(()=>{
    //console.log(ciudad)
    const consultarApi = async ()=>{
      if(consultar){
        const appId = "13d4a7c9d6a51f577e0c78f4e2a78a29";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url)
        const response = await respuesta.json();
        setResultado(response);
        if(resultado.cod === "404"){
          setError(true)
        }else{
          setError(false)
        }
      }
      
    }

    consultarApi();
    setConsultar(false);
  },[consultar])

  let component;

  if(error){
    component = <Error mensaje="There is not data"/>
  }else{
    component = <Clima resultado={resultado}/>
  }

  return (
    <div>
      <Header 
        titulo = "Weather app"
      /> 
      <div className ="contenedor-form">
        <div className ="container">
          <div className ="row">
            <div className ="col m6 s12">
              <Formulario 
                busqueda ={busqueda}
                setBusqueda ={setBusqueda}
                setConsultar ={setConsultar}
              />
            </div>

            <div className ="col m6 s12">
              {component}
            </div>

          </div>
        </div>
        </div> 
    </div>
  );
}

export default App;
