const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4533643b3emshe71d804aba05c2fp1780fajsn37bff2a8ab6c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};


fetchData=position=>{
    console.log(position)
    const{latitude,longitude}=position.coords
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C${longitude}`, options)
        .then(response => response.json())
        .then(response => climaDatos(response))
        .catch(err => console.error(err));
}

const climaApp=document.getElementById('climaApp')

const climaDatos=(response)=>{

    const location=response.location
    console.log(location)
    const current=response.current
    console.log(current)
    const condicion=response.current.condition
    console.log(condicion)

    const weather={

        localizacion:` ${location.name}, ${location.region}, ${location.country}`,
        temperatura:`${current.temp_c} ºC`,
        sensacionTermica:`${current.feelslike_c}ºC`,
        humedad:`${current.humidity}%`,
        condicion:`${condicion.text}`
    }

    const div=document.createElement('div')
    div.className='weather'
    div.innerHTML=`

    <div class='contenedorDatos'>
        <div class='climaDatosContenedor'>
                <p>${weather.temperatura}<span class='temp'></span></p>
            <div class='climaDatos'>
                <p><span class='city'>STº:</span>${weather.sensacionTermica}</p>
                <p><span class='city'>Humedad:</span>${weather.humedad}</p>
            </div>
        </div>
            <div class='nombreDatos'>
                <h1><span class='icon'><img src='./img/globo-terraqueo.png'></span>${weather.localizacion}</h1>
                <h2> <span class='icon'><img src='./img/nube.png'>${weather.condicion}</h2>
            </div>
    </div>


    `
    climaApp.appendChild(div)
}

const onLoad=()=>{
    navigator.geolocation.getCurrentPosition(fetchData)
}


const contenedorHrs=document.querySelector('.contenedorHrs')

function ActualizarHora(){
    const hora=new Date()
    
    const hrs=formatearHora(hora.getHours())
    const minutos=formatearHora(hora.getMinutes())
    const segundos=formatearHora(hora.getSeconds())
    
    contenedorHrs.innerHTML=`${hrs}:${minutos}:${segundos}`
}

const contenedorFecha=document.querySelector('.contenedorFecha')


function ActualizarFecha(){
    
    const date=new Date()
    
    const fecha=formatearFecha(date.getDate())
    const mes= formatearFecha(date.getMonth() +1)
    const año= formatearFecha(date.getFullYear())
    
    contenedorFecha.innerHTML=`${fecha}/${mes}/${año}`
    
}



function formatearFecha(fecha) {
    if (fecha<10){
        return '0'+fecha
    }
    
    return fecha;
}

function formatearHora(hora){
    if (hora<10){
        return '0'+hora
    }
    
    return hora;
}
ActualizarHora()
ActualizarFecha()

setInterval(ActualizarHora,1000)