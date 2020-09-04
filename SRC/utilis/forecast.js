const request =require('request')


const forecast=(low,long,callback)=>
{

    const url="http://api.weatherstack.com/current?access_key=699f4a879535e188e4ae4f8f39245ad2&query="+low+','+long
    request({url:url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback("Weather api is under maintenance!",undefined)
        }
        else if(body.success===false)
        {
            callback("please provide us with correct details111!",undefined)
        }
        else
        {
        callback(undefined,body.current.temperature+" chance of rain is "+body.current.humidity+" weather is " +body.current.weather_descriptions)
        }
    })


}
module.exports=forecast