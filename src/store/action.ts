import { defineStore } from 'pinia';

export const useRequest = defineStore('request', {  
  state: () => {
    return {
      form: {
        name: null,
        lastname: null,
        phone: null,
        email: null,
        message: ''
      } as form,
      showModal: false as boolean,
    }
  },
  actions: {},
})

interface form {
  name: string | null,
  lastname: string | null,
  phone: any,
  email: string | null,
  message: string
}