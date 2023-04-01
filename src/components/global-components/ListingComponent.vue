<template>
  <div id="listing-container">
    <slot />
  </div>
</template>

<style scoped>
#listing-container {
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 2px #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  transition: scale 150ms ease-in-out;
}

#listing-container:hover {
  scale: 102%;
}
</style>
