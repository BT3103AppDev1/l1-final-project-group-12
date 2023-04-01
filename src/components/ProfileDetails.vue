<template>
<br>
    <div id = "profile-details"> 

        <div id = "details">
            <h1>Profile Details </h1>
            <br>
            Email: {{user_email}}
            <br> <br>
            Password : {{user_password}}
            <br><br>
            <button id = "updateUserButton"> Update details </button>
            <br> <br>
        </div>
    </div>
    <br>
    <div id = "tutor-details">
        <h1> Tutor Profile </h1>
    </div>

    <div id = "listings">
        <h1> Your Listings </h1>
    </div>
</template>

<script> 
import {getCurrentUser} from "../lib/handlers/auth.js"

export default {
    data() {
        return {
            user : "",
            user_email : "",
            user_password : "",
            user_phoneNumber: ""
        }
    },
    async mounted(){
        let $vm = this;
        $vm.user = await getCurrentUser();
        console.log($vm.user.phoneNumber)
        $vm.user_email = $vm.user.email;
        $vm.user_phoneNumber = $vm.user.phoneNumber;
    }
}

</script>


<style scoped>
#profile-details{
    margin-left: .5em;
}

#details{
width  : 50em;
outline: 1px solid black;
 }
</style>
