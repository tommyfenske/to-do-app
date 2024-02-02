// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://testscrimba-default-rtdb.firebaseio.com",
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const listInDB = ref(database, "list")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const listContainer = document.getElementById("list-container")

//add item to list
addButton.addEventListener("click", function() {
    if (inputField.value) {
        let inputValue = inputField.value
        push(listInDB, inputValue)
    }
    inputField.value = ""
})


function updateList(arr) {
    clearList()
    //create buttons for each item in the list
    for(let i = 0; i < arr.length; i++) {
        let itemID = arr[i][0]
        let itemName = arr[i][1]
        let newListItem = document.createElement("button")
        newListItem.innerHTML = itemName
        listContainer.appendChild(newListItem)
        
        //make event listener for each button that deletes the item in the DB
        newListItem.addEventListener("dblclick", function() {
            let itemRef = ref(database, `list/${itemID}`)
            remove(itemRef)
        })
    }
}

function clearList() {
    listContainer.innerHTML = ""
}

onValue (listInDB, function (snapshot) {

        if (snapshot.exists()) {
            let listArr = Object.entries(snapshot.val())
            updateList(listArr)  
        } else {
            listContainer.innerHTML = "<p>Your items show up here</p>"
        }
})