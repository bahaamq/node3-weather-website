const request =require('request')

const geocode=(address,callback)=>
{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYm1xNyIsImEiOiJja2QzbnQxcGUwaHJtMnlueTZtZHJjdWw0In0.YGT7QtMtYOBsiSpuv1Gj7Q&limit=1"

    request({url,json:true},(error,{body}="")=>
{

    
    if(error)
    {

        callback("low level error caused by wrong api / wrong connection etc",undefined)
    }

    else if(address=="" ||body.features.length===0)
    {
        callback("no such an address!",undefined)
    }

    else
    {
        callback(undefined,{
lowatitiude:body.features[0].center[1],
longatitude:body.features[0].center[0],
location:body.features[0].place_name
        })

    }
})
}
module.exports=geocode