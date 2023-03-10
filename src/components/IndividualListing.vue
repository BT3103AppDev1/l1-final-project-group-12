<template> 
<div id = "container">
    <h2> Level: {{level}}  </h2>
    <h2> Subject:  {{subject}}</h2>
    <h2> Location:  {{location}} </h2>
    <h2> Description: {{desc}}</h2>
    <h2> Rates: ${{rate}} </h2>

</div>
</template>

<script>

// not in use, initial sandbox
export default {
    props:{
        level:String,
        subject:String,
        location:String,
        desc:String,
        rate:Number,
    }

}
</script>

<style scoped>

#container{
    border-style : solid;
    margin-right: 35em;
    margin-left: 25em;
    text-align: left;
    padding-left:15em;
    background-color: white;   
    border-radius: 2em;
}
</style>