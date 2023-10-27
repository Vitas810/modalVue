<template>
    <div class="popup js-popup">
        <form
            method="get"
            action="#"
            class="form"
        >
            <h4 class="form__title">Оставить заявку</h4>
            <label class="form-label">
                Имя
                <input
                    v-model="store.form.name"
                    class="form__input"
                    type="text"
                    name="name"
                    required
                >
                <span v-for="error in v$.name.$errors" :key="error.$uid"
                    class="form-field__error"
                >
                    {{ error.$message }}
                </span>
            </label>

            <label class="form-label">
                Фамилия
                <input
                    v-model="store.form.lastname"
                    class="form__input"
                    type="text"
                    name="lastname"
                >
                <span v-for="error in v$.lastname.$errors" :key="error.$uid"
                    class="form-field__error"
                >
                    {{ error.$message }}
                </span>
            </label>

            <label class="form-label">
                Телефон
                <input
                    v-model="store.form.phone"
                    class="form__input"
                    type="text"
                    name="phone"
                    required
                >
                <span v-for="error in v$.phone.$errors" :key="error.$uid"
                    class="form-field__error"
                >
                    {{ error.$message }}
                </span>
            </label>

            <label class="form-label">
                Email
                <input
                    v-model="store.form.email"
                    class="form__input"
                    type="email"
                    name="email"
                    required
                >
                <span v-for="error in v$.email.$errors" :key="error.$uid"
                    class="form-field__error"
                >
                    {{ error.$message }}
                </span>
            </label>
            <label>
                <textarea
                    class="form__message"
                    v-model="store.form.message"
                    placeholder="Сообщение"
                    rows="5"
                ></textarea>
                <span v-for="error in v$.message.$errors"
                    :key="error.$uid"
                    class="form-field__error"
                >
                    {{ error.$message }}
                </span>
            </label>
            <button
                class="btn btn-primary"
                type="button"
                @click="sendForm"
            >Отправить</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import axios from "axios"
    import { computed } from "vue";
    import { useRequest } from '@/store/action'
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength, email } from '@vuelidate/validators'

    const store = useRequest();

    const rules = computed(() => {
        return {
            name: {
                required,
                maxLengthValue: maxLength(100)
            },
            lastname: {
                maxLengthValue: maxLength(100)
            },
            phone: {required}, 
            email: {
                required,
                email
            },
            message: {
                maxLengthValue: maxLength(500)
            }
        }
    })
 
    const v$ = useVuelidate(rules, store.form)

    const sendForm = async () => {
        try {
            const validate = await v$.value.$validate()
            if (validate) {
                console.group('Отправка запроса...');
                await axios.post('/test', store.form)
            }
        } catch (error) {
            console.error(error);
        }
    }

    document.addEventListener('click', e => {
        let popup = document.querySelector('.js-popup');
        let target = e.target;

        if (popup == target) {
            store.showModal = false;
        }
    });

</script>

<style lang="scss">
    .popup {
        position: fixed;
        z-index: 1;
        padding-top: 55px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(10, 14, 32, 0.4);
    }
    .form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-size: 14px;
        background: #ffffff;
        border-radius: 10px;
        max-width: 467px;
        padding: 32px;
        margin: auto;
        &__title {
            margin: 0;
            text-align: center;
            font-size: 18px;
        }
        &-label {
            display: flex;
            flex-direction: column;
            gap: 4px;
            color: #7b7171;
        }
        &__input {
            border: 1px solid #cecece;
            border-radius: 4px;
            padding: 5px;
            &:focus {
                outline: 1px solid #cecece;
            }
        }
        &__message {
            border: 1px solid #cecece;
            padding: 5px;
            border-radius: 4px;
            color: #7b7171;
            resize: none;
            width: 100%;
            &:focus {
                outline: 1px solid #cecece;
            }
        }
        &-field {
            &__error {
                color: red;
            }
        }
    }
</style>