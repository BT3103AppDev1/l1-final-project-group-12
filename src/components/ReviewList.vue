<script setup>
const props = defineProps(["listing"]);
</script>

<template>
    <div id="listing-container">
        <h1>{{ props.listing.rating }}</h1>
        <div>
            <p>{{ props.listing.body }}</p>
        </div>

    </div>
</template>

<style scoped>
#listing-container {
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    transition: scale 150ms ease-in-out;
    margin: 1em;
    margin-left: 3em;
    margin-right: 3em;
    background-color: white;
}

#listing-container:hover {
    scale: 102%;
}

#listing-container h1 {
    color: var(--tent-orange);
    font-size: 2rem;
}

#listing-container h1 span {
    font-size: 1.3rem;
}
</style>
