const path = require('path')

const express=require('express')
const hbs=require('hbs')

const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
const request =require('request')

console.log(__dirname)

const app=express()

const pathstatic=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templets/views')
const partials=path.join(__dirname,'../templets/partials')
console.log(partials)
app.set('views',viewspath)
app.set('view engine','hbs')
//because express looks on views folder by default , and our folder name is template this is how to tel express that i want this folder to render hbs from.
// the comment above is for viewpath var and both app.set functions.

hbs.registerPartials(partials)
//this is the configuraton of using partials , first we declare a var called partials and change directory to the place we save then we configure it
app.use(express.static(pathstatic))
//this will at first change drectory,,,,,now it's in the root folder "public" it can read all files ,,,, the root is gonna be file name
// for example if you want to render index.html ( a file in the root folder(publc) , app.use act like you get a request with/index.html and the response will be the html content of this)

app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather App',
        name : 'hmedo'
    })
})


app.get('/about', (Req,res)=>
{
    res.render('about',{
        title:'About me',
        name:'Bahaa'
    })
})

app.get('/help',(req,res)=>
{
    //let help={help:"this is help page"}
//res.render('help',help)

res.render('help',{
    title:'Help' , 
    name:'Bahaa'
})
})


app.get('/weather',(req,res)=>
{


    const loc =req.query.address
  

    geocode(loc,(error,{lowatitiude,longatitude,location}={})=>
    {
        if(error)
        {
            return(res.send({

                error:error
            }))
        }


        forecast(lowatitiude,longatitude , (error, foredata) => {
            if(error)
            {
                return res.send(error)
            }
            res.send({
                foredata:foredata,
                locationL:location,
                address:loc
            })
            
    })
})
  
})
    // if(!req.query.address)
    // {
    //     return(res.send({

    //         error:'no address error!'
    //     }))
        
    // }

    // res.send({
    //     location: 'philadelphia',
    //     forecast:'50dg',
    //     address:req.query.address
    // })



app.get('/product',(req,res)=>
{

if(!req.query.search)
{
    return(res.send("nosearch found"))
}

    //console.log(req.query)
res.send(

    {
        product:[req.query.search]
    }
)
}
)

app.get('/help/*',(req,res)=>
{


   
res.render('error',{
    errormessage:'Help article' , 
    name:'Bahaa'
})

})


app.get('*', (req,res)=>
{
    
    res.render('error',{
        errormessage:'Page' , 
        name:'Bahaa'
    })})



app.listen(3000,()=>
{
    console.log("server listenss on port 3000")
})