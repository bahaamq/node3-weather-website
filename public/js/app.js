console.log("client side js is loaded")




const forms=document.querySelector('form')
const loc=document.querySelector('input')
const msgone=document.querySelector('#msg-one')
const msgtwo=document.querySelector('#msg-two')

forms.addEventListener('submit',(e)=>
{
    msgone.textContent="loading  "
    msgtwo.textContent=""
e.preventDefault()
const url="http://localhost:3000/weather?address="+encodeURIComponent(loc.value)
fetch(url).then((response)=>
{
response.json().then((data)=>
{
    if (data.error)
    {
       msgone.textContent=data.error
    }
    else
    {
    msgone.textContent= data.foredata
    msgtwo.textContent=data.locationL

    }
    

})
})



})




