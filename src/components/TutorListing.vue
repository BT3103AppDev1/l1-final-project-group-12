<template> 
<div id = "page">
    <IndividualTutorListing :data = data v-show = "showIndividualListingModel" @close-modal = "showIndividualListingModel = false"/>

    <div id = "LeftContainer">
            <button id = "addbutton"> + Add Listing </button>
    <br> <br>
        <div id = "FilterContainer">
            <br>
            <h1> FILTER </h1>
            <button @click="resetFilter"> Reset filter</button>
            <br>
            
            <!-- <input type="text" id = "search" required="" placeholder="Search...."> <br><br> -->

            <h2> LEVEL </h2>
            <select id = "level select" v-model = "datalevel"> 
                <option> Primary </option>
                <option> Secondary </option>
                <option> Junior College </option>
                <option> Others </option>
                
            </select>
            <br>
            <br>
            <h2> SUBJECT </h2>
            <select id = "subject select" v-model = "datasubject">
                <option> Biology </option>
                <option> Chinese Language </option>
                <option> Chemistry </option>
                <option> English </option>
                <option> Math</option>
                <option> Malay Language </option>
                <option> Physics </option>
                <option> Tamil Language </option>
                <option> Others </option>
                
            </select>
            <br>
            <br>
            <h2> LOCATION </h2>
            <select id = "location select" v-model = "datalocation">
                <option> North </option>
                <option> South</option>
                <option> East </option>
                <option> West </option>
                <option> Central </option>
                <option> Others </option>
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
import IndividualTutorListing  from "./IndividualTutorListing.vue";
import {getAllListings} from "../lib/handlers/listing.js"; 
/*    

import firebaseApp from '../firebase.js'
import { documentId, getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"

const db = getFirestore(firebaseApp);
*/

export default {
  name: 'TutorListing',

  components : {
    IndividualTutorListing
  },

    data() {
        return {
            showIndividualListingModel : false,
            data : ["a","b","c","d",1], //default values
            datalevel : "default",
            datasubject : "default",
            datalocation : "default",
            totallistings : []
        }
    },
    methods: {
        resetFilter(){
            this.datalevel = "default"
            this.datasubject = "default"
            this.datalocation = "default"
            this.updateFilter()

        },
        updateFilter(){
            let s = "roll"
            for (var i = 0; i <this.totallistings.length; i++) {
                let num =this.totallistings[i]
                //Do something
                let v = s + num
                //console.log(v)  
                let level ="Level:"
                if (this.datalevel != "default") {
                    level = level + this.datalevel[0] //use first letter to filter  eg Level:P can mean Level:P1-P6
                }
                console.log(level)
                let subject = "Subject:" 
                if (this.datasubject != "default") {
                    subject = subject + this.datasubject //use first letter to filter  eg Level:P can mean Level:P1-P6
                }
                console.log(subject)
                let location = "Location:"
                if (this.datalocation != "default") {
                    location = location + this.datalocation //use first letter to filter  eg Level:P can mean Level:P1-P6
                }
                console.log(location)

                let cell = document.getElementById(v)
                let check = cell.innerHTML.indexOf(level) < 0 || cell.innerHTML.indexOf(subject) <0 || cell.innerHTML.indexOf(location) <0 
                
                console.log(cell.innerHTML.indexOf(level))
                console.log(cell.innerHTML.indexOf(subject))
                console.log(cell.innerHTML.indexOf(location))


                if (check){
                    document.getElementById(v).style.display = 'none'
                } else {
                    document.getElementById(v).style.display = 'table'   
                }
            }    
        }

    },
    watch:{
        datalevel(){
            this.updateFilter()
        },
        datasubject(){
            this.updateFilter()
        },
        datalocation(){
            this.updateFilter()
        }
    },

  async mounted(){
    let $vm = this;
    async function display() {
        //let allDocuments = await getDocs(collection(db, "StudentListing"))
        let allDocuments = await getAllListings("tutor-listing")

        //console.log(allDocuments)
        let index = 1
        allDocuments.forEach((docs) => {
            let documentData = docs
            console.log(docs)

            let level = documentData.level
            let subject = documentData.subject
            let location = documentData.location
            let desc = documentData.description
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
           row1.id = "roll" + index
           let cell1 = row1.insertCell(0)
           let str = "cell" + index
           //let bnID = "bn" + index
           let imgID = "img" + index
           let innerID = "inner" + index
           let ratingID = "rating" + index
           let outerDivID = "outer" + index
           cell1.id = str

            ///let aaa = $vm.datalevel == "defaulta" || $vm.datalevel == level

        //if(aaa) {

        cell1.innerHTML = ` <div id = ${outerDivID}>

        <div id = ${index}>  
        <br> <img src = "/src/assets/empty_photo_user.png" id =${imgID}> &nbsp; Name: <br><br> &nbsp; Edcation: <br><br> &nbsp;  Experience: <div id = ${innerID}> <b> RATING  </b> </div>  <br><br> &nbsp; Location:${location} <div id = ${ratingID}> <b> 5.0 </b> </div> <br><br> &nbsp; Level:${level} <br> <br> 
        &nbsp; Subject:${subject} <br> <br> &nbsp;  Rates: ${rates}/hr <br> <br> &nbsp; Contact: <br> <br> &nbsp;
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
        document.getElementById(imgID).style.height = "16em"
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

        document.getElementById(ratingID).style.float = "right"
        document.getElementById(ratingID).style.marginRight = "2.8em";
        document.getElementById(ratingID).style.fontSize = "3em";
        document.getElementById(ratingID).style.color = "Orange  ";
        /*
        if (aaa) {
            document.getElementById(outerDivID).style.display = "none"
        }
        */
    
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
       // }
    $vm.totallistings.push(index)
    console.log($vm.totallistings)
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