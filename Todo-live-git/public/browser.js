 function itemTemplate(item) {
     return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
     <span class="item-text">${item.text}</span>
     <div>
       <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
       <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
     </div>
   </li>`
 }
 
// Initial page load render
let ourHtml = items.map(function(item)  {
    return itemTemplate(item)
}).join('')

document.getElementById('ourList').insertAdjacentHTML('beforeend', ourHtml)

 //Create Items
let ourField = document.getElementById("ourField")

 document.getElementById("ourForm").addEventListener("submit", function(e){
    e.preventDefault()
    axios.post('/create-item', {text:ourField.value}).then(function(response){
        document.getElementById("ourList").insertAdjacentElement("beforeend", itemTemplate(response.data))
    }).catch(function () {
        console.log('Some Error')
    })
})


document.addEventListener("click", function(e){ 
    //Delete Items
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Do You Want To Really Delete This Item Permanetly ?")) {
            axios.post('/delete-item', {id:e.target.getAttribute("data-id")}).then(function(){
                e.target.parentElement.parentElement.remove()
            }).catch(function () {
                console.log('Some Error')
            })
        }
    }

    //Update Items
    if (e.target.classList.contains("edit-me")) {
        let userInput =  prompt('Enter new item', e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
       if (userInput) {
        axios.post('/update-item', {text: userInput, id:e.target.getAttribute("data-id")}).then(function(){
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
        }).catch(function () {
            console.log('Some Error')
        })
       }
    }
})

