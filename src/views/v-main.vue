<template>
    <main class="main">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" /> Logo
        </a>
        <button class="main__btn" type="button">Оставит заявку</button>
    </main>
</template>

<script lang="ts">
    export default {
        name: 'main component',
        setup() {}
    }
</script>

<style lang="scss">
    .main {
        display: flex;
        justify-content: space-between;
        &__btn {
            font-size: 14px;
            color: #3740fa;
        }
    }
</style>