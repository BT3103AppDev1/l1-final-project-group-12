<script setup>
import { updateTutorProfileById } from '@/lib/handlers/user';
import { getAllTutors } from '@/lib/handlers/user';
async function showTutors() {
  // const tutors = await getAllTutors()
  // let reviewed_tutor = ""
  // for (let tutor in tutors){
  //   console.log(tutors[tutor])
  //   // if (tutors[tutor]['id'] == "32u4clBmNaZa9dkfHNE8E6gOfTN2") {
  //   //   reviewed_tutor = tutors[tutor]
  //   //   break
  //   // }
  // }
  // alert(reviewed_tutor['telegramHandle'])
  await updateTutorProfileById('XTCKBgoDvQga7Re3sytXixdRHyw2', {isTutor: false})
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