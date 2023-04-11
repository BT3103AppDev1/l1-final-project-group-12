<script setup>
import { getAllTutors } from '@/lib/handlers/user';
import { getUserById } from '@/lib/handlers/user';
async function showTutors() {
  const user = await getUserById("32u4clBmNaZa9dkfHNE8E6gOfTN2")
  console.log(user)
  const tutors = await getAllTutors()
  let reviewed_tutor = ""
  for (let tutor in tutors){
    if (tutors[tutor]['id'] == "32u4clBmNaZa9dkfHNE8E6gOfTN2") {
      reviewed_tutor = tutors[tutor]
      break
    }
  }
  alert(reviewed_tutor['telegramHandle'])
}

</script>

<template>
  <p>Test View</p>
  <button @click="showTutors">test button</button>

</template>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>