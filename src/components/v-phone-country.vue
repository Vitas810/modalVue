<template>
    <div class="js-phone-country">
        <input type="tel"
               ref="phone-country"
               class="form__input"
               :value="modelValue"
               v-maska
               :data-maska="maskCountry"
               name="phone"
               placeholder="(___) ___-__-__"
               @input="$emit('update:modelValue', $event.target.value)"
               @change="$emit('change', $event.target.value)"
               @paste="onPaste"
        >
        <input type="hidden" v-show="full_phone" name="full_phone" value="">
        <input type="hidden" name="phone_locale" value="">
    </div>
</template>

<script >
    // TODO документация https://github.com/jackocnr/intl-tel-input
    import intlTelInput from 'intl-tel-input';

    export default {
        name: 'phone-country',
        props: {
            full_phone: {
                type: Boolean,
                required: false,
                default: false
            },
            country: {
                type: String,
                default: 'RU'
            },
            value: {
                type: [Number,String]
            },
            modelValue: [Number,String]
        },
        emits: ['update:modelValue'],
        data() {
            return {
                phone: null,
                maskCountry: '(9##) ###-##-##',
                codeCountry: this.country,
                dialCode: null,
                phoneLength: 10,
                countries: ['ru'],
            }
        },
        watch: {
            value(val) {
                this.modelValue = val;
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                const input = this.$refs["phone-country"];
                if (!input) return;

                const iti = intlTelInput(input, {
                    initialCountry: this.country,
                    onlyCountries: this.countries,
                    separateDialCode: true,
                    hiddenInput: 'full_phone',
                    utilsScript: '/modal_vue/utils/utils.js',
                    autoPlaceholder: 'off'
                });

                this.setPhoneCode(input, iti);

            
                input.addEventListener('countrychange', (e) => {
                    let selectedCountryData = iti.getSelectedCountryData();
                    // Get an example number for the selected country to use as placeholder.
                   let newPlaceholder = intlTelInputUtils?.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils?.numberFormat.INTERNATIONAL);

                    // Reset the phone number input.
                    iti.setNumber("");

                    this.setPhoneCode(input, iti);
                    this.codeCountry = selectedCountryData.iso2 ? selectedCountryData.iso2: this.country;
                    this.dialCode = selectedCountryData.dialCode ? selectedCountryData.dialCode: null;
                });
            },
            onPaste (e) {
                let pasted = e.clipboardData.getData('text').replace(/[^0-9]/g,"");
                if (pasted && pasted.length > 10) this.phone = pasted.slice(this.phoneLength*-1);
            },
            setPhoneCode(el, iti) {
                try {
                    el.closest('.js-phone-country').querySelector('input[name=phone_locale]').value = iti.getSelectedCountryData().iso2;
                } catch (e) {}
            },
        }
    }
</script>

<style lang="scss">
    @import 'intl-tel-input/build/css/intlTelInput.css';

    .iti {
        width: 100%;
    }
    .iti__flag {
        height: 15px !important;
        width: 15px;
        border-radius: 20px;
        border: 1px solid #9D9EA3;
        background-position-y: -1px !important;
    }
    .iti__flag.iti__kz {
        background-position-y: 1px !important;
    }
    .iti__selected-flag {
        background-color: #FFFFFF !important;
        border-radius: 4px;
    }
    .iti__arrow {
        width: 10px;
        height: 18px;
        border: none !important;
        background-repeat: no-repeat;
        background-position: bottom 0 right -3px;
        background-image: url('data:image/svg+xml,<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.5L8 11.5L12 7.5" stroke="%234D4F54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    }
    .iti__arrow.iti__arrow--up {
        background-image: url('data:image/svg+xml,<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.5L8 7.5L4 11.5" stroke="%234D4F54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>') !important;
    }
    .iti__selected-dial-code {
        font-size: 15px;
        color: #47494E;
        border-left: 1px solid #DEDEDD;
        padding-left: 4px;
    }
</style>
