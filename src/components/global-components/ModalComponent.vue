<!--
How to use:
1. Import and register ModalComponent
2. Use it in the template

<template>
  ...

  <ModalComponent>
    ...content here...
  </ModalComponent>

  ...
</template>

3. Listen to the 'close-modal' event and change v-show accordingly
-->

<template>
  <transition name="modal-fade">
    <div class="modal-overlay">
      <div class="modal">
        <div class="close" @click="$emit('close-modal')">
          <img class="close-img" src="src\assets\close-icon.png" alt="" />
        </div>

        <slot>Hello from modal!</slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
}

.modal {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  word-wrap: break-word;
  max-width: 70vw;
  max-height: 70vh;
}

.close {
  width: fit-content;
  align-self: flex-end;
  cursor: pointer;
}

.close-img {
  width: 2rem;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 100ms ease-in-out;
}
</style>
