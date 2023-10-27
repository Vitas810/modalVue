<template>
    <main class="main">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" /> Logo
        </a>
        <button
            class="main__btn"
            type="button"
            @click="store.showModal = true"
        >Оставит заявку</button>

        <modal v-if="store.showModal" />
    </main>
</template>

<script setup lang="ts">
    import modal from '@/components/modal.vue';
    import { useRequest } from '@/store/action'

    const store = useRequest();

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