<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                   I am a student, looking for a tutor.
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>

            <div class="modal-body">

                <div id="label1">
                    <label for="level">Level</label> <br><br>
                        <select v-model="selected">
                            <option value="">Level</option>
                            <option>Primary</option>
                            <option>Secondary</option>
                            <option>Junior college</option>
                    </select> <br><br>
                </div>

                <div id="label2">
                    <label for="subject">Subject</label> <br><br>
                        <select v-model="selected">
                            <option value="">Subject</option>
                            <option>English</option>
                            <option>Math</option>
                            <option>Science</option>
                        </select><br><br>
                    </div><br><br>

                <div id="label3">
                    <label for="Location">Location</label> <br><br>
                        <select v-model="selected">
                            <option value="">Location</option>
                            <option>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                        </select>
                    </div>

                <div id="label4">
                    <label for="Rates">Rates</label> <br><br>
                    <input v-model="rates" placeholder="Enter your rates">                         
                </div> 


            </div><br><br>

            <div class="modal-discription">
                <div id="discription">
                        <label for="Discription">Discription and contact method</label><br><br>
                        <input v-model="discription"   placeholder="Discription and contact method">
                    </div>
            </div>

         

            <div class="modal-footer">
                <button type="button" class="btn-green" @click="close">
                   Add Listing
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    font-style: initial;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color:orange;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
}

.modal-body {
    
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: orange;
    background: transparent;
}

.btn-green {
    color: white;
    background:orange;
    border: 1px solid orange;
    border-radius: 2px;
}
#label1, #label2 {
    float: left;
   
}

 #label3, #label4 {
    float :left;
    
    
}
#label2,#label4{
    padding-left: 10px;
}

.modal-discription{
    padding: 15px;

}


</style>
