<template> 
<div id = "page">
    <button @click="showIndividualListingModel = true"> test add </button> 
    <IndividualListing :data = data v-show = "showIndividualListingModel" @close-model = "showIndividualListingModel = false"/>

    <div id = "LeftContainer">
            <button id = "addbutton"> + Add Listing </button>
    <br> <br>
        <div id = "FilterContainer">
            <br>
            <h1> FILTER </h1>
            <br>
            
            <input type="text" id = "search" required="" placeholder="Search...."> <br><br>

            <h2> LEVEL </h2>
            <select id = "level select">
                <option> select 1 option </option>
                <option> Primary </option>
                <option> Secondary </option>
                <option> Junior College </option>
                <option> Others </option>
                
            </select>
            <br>
            <br>
            <h2> SUBJECT </h2>
            <select id = "subject select">
                <option> select 1 option </option>
                <option> Biology </option>
                <option> Chinese Language </option>
                <option> Chemistry </option>
                <option> English </option>
                <option> Math</option>
                <option> Malay Language </option>
                <option> Physics </option>
                <option> Tamil Language </option>
                
            </select>
            <br>
            <br>
            <h2> LOCATION </h2>
            <select id = "location select">
                <option> North </option>
                <option> South</option>
                <option> East </option>
                <option> West </option>
                <option> Central     </option>
            </select>
        </div>
    </div>

<div id = midcontainer>
    <table id = table>
        <tr> 
        <th> Listings </th>
        </tr>
    </table>

</div>
</div>

</template>

<script>
import  IndividualListing  from "./IndividualListing.vue";

import firebaseApp from '../firebase.js'
import { documentId, getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"

const db = getFirestore(firebaseApp);


export default {
  name: 'StudentListing',

  components : {
    IndividualListing
  },

    data() {
        return {
            showIndividualListingModel : false,
            data : ["a","b","c","d",1]
        }
    },

  async mounted(){

    let $vm = this;
    async function display() {
        let allDocuments = await getDocs(collection(db, "StudentListing"))
        let index = 1


        allDocuments.forEach((docs) => {
            let documentData = docs.data()

            let level = documentData.level
            let subject = documentData.subject
            let location = documentData.location
            let desc = documentData.desc
            let rates = documentData.rates
/*
            let ul = document.getElementById("listings")
            var li = document.createElement("li")
            li.appendChild(document.createTextNode("Level: " + level))
            
            li.appendChild(document.createTextNode("subject : " + subject))
            ul.appendChild(li)
            */
           let table = document.getElementById("table")
           let row1 = table.insertRow(index)
           index +=1
           row1 .id = "roll" + index
           let cell1 = row1.insertCell(0)
           let str = "cell" + index
           //let bnID = "bn" + index
           let imgID = "img" + index
           let innerID = "inner" + index
           let ratesID = "rates" + index
           let outerDivID = "outer" + index
           cell1.id = str


        cell1.innerHTML = ` <div id = ${outerDivID}>
        
        <div id = ${index}>  
        
        <br> <img src = "/src/assets/empty_photo_user.png" id =${imgID}> &nbsp; Level:   ${level} <br><br> &nbsp; Subject: ${subject} <div id = ${innerID}> <b> RATES:  </b> </div> <br> <br> 
        &nbsp; Location: ${location} <div id = ${ratesID}> <b> $${rates}/hr  </b> </div> <br> <br> &nbsp; Description: ${desc} <br> <br> &nbsp; Rates:$${rates} <br> &nbsp; 
        </div>
        <br>
        <br>     
        </div>
        
        `

        //<button id = ${bnID}> Apply </button>     
        document.getElementById(outerDivID).style.backgroundColor = "#f6f5f6"   
        document.getElementById(index).style.backgroundColor = "white"
        document.getElementById(imgID).style.float = "left"
        document.getElementById(imgID).style.height = "5em"
        document.getElementById(imgID).style.height = "8.5em"
        document.getElementById(imgID).style.marginTop = "0.5em"
        //document.getElementById(index).style.border = "solid 1px"
        //document.getElementById(index).style.borderRadius = "2em"
        //document.getElementById(str).style.borderRadius = "2em"
        /*
        document.getElementById(bnID).style.width = "15em"
        document.getElementById(bnID).style.height = "5em"
        document.getElementById(bnID).style.float = "right";
        document.getElementById(bnID).style.marginRight = "1.5em";
        */
        document.getElementById(innerID).style.float = "right"
        document.getElementById(innerID).style.marginRight = "7em";
        document.getElementById(innerID).style.fontSize = "1.2em";

        document.getElementById(ratesID).style.float = "right"
        document.getElementById(ratesID).style.marginRight = "2.8em";
        document.getElementById(ratesID).style.fontSize = "2.5em";
        document.getElementById(ratesID).style.color = "Orange  ";

    
        cell1.bgColor = "white"
        cell1.width = '1000em';

        document.getElementById(str).addEventListener('click', function() {
            $vm.data[0] = level
            $vm.data[1] = location
            $vm.data[2] = subject
            $vm.data[3] = desc
            $vm.data[4] = rates
            $vm.showIndividualListingModel = true;  
        })


        })
    }
    display()
    
  }

}

</script>

<style scoped>


#page{
    background-color: #f6f5f6;
}

#midcontainer{
    margin-left: 30em;
}

#LeftContainer {
    float:left;
}


#FilterContainer{
    text-align: center;
    width: 20em;
    margin-left:50px;
    border-style : solid;
    background-color:white;
    padding-bottom:50px;
    border-radius: 2em;
}

#addbutton{
    background-color : orange;
    width : 20em;
    height : 5em;
    border-radius: 4em;
    margin-left:6em;
    color: white;
}
</style>