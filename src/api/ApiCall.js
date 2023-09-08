import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/weather.css'


const ApiCall = () => {
    const [data,setData]=useState('')
    const [inp,setInp]=useState('')
    const [city,setCity]=useState('Bhandara')
    const current=new Date()
    const month = ["January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"
           ]
           const day=["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday",
           "Saturday"]
          

    const date=` ${day[current.getDay()]} ${current.getDate()} ${month[current.getUTCMonth()] }`
    useEffect(()=>{
      
       axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5dba49faf9edc952e5cf3af79f4d80dc`)
       .then((json)=>setData(json.data))
        .catch((err)=>console.log(err))

    },[city])
    console.log(data)
    console.log(inp)
    console.log(city)
    const handelChange=(e)=>{
      setInp(e.target.value)
      setCity()
    }
   
   
  return (
    <div className='bigBox'>
     
        <div className='serachbox'>
        <input type='text' onChange={handelChange} value={city}/>
        <button  onClick={()=>setCity(inp)}>Search</button>
        </div>
        <div className='flexbox'>
        <div className='rightbox'>
          <div className='city'> 
            <p><span className='span'>{data.name}</span><br/>{date}</p>
            </div>
                <div className='tempbox'> 
                  <p className='temp'>{data && Math.floor(data.main.temp-273)}<sup>o</sup>C
                    <br/> {data && data.weather.map((item,index)=>{
                      return(
                        <p key={index} className='weather'>
                          {item.main}
                        </p>
                      )
                     })}
                     </p>
                </div>

               
              
          
          
        </div>
        <div className='leftbox'>
          <div className='box'><p>{data && Math.floor(data.main.temp_max)-273}<sup>o</sup>C <br/> Highest Temp</p></div>
          <div className='box'><p>{data && data.wind.speed}m/s<br/>Wind Speed</p></div>
          <div className='box'><p>{data && data.visibility/1000}km<br/>Visibility</p></div>
          <div className='box'><p>{data && Math.floor(data.main.temp_min)-273}<sup>o</sup>C <br/> Lowest Temp</p></div>
          <div className='box'><p>{data && data.main.humidity}%<br/>Humidity</p></div>
          <div className='box'><p>{data && data.main.pressure}hPa<br/>pressure</p></div>
         
        </div>
        </div>
        
    </div>
  )
}

export default ApiCall
