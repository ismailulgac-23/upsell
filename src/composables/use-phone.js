import { ref, computed } from "vue";

export default () => {
   const phoneNumber = ref("");

   const formattedPhoneNumber = computed({
      get() {
         return maskPhoneNumber(phoneNumber.value);
      },
      set(value) {
         phoneNumber.value = unmaskPhoneNumber(value);
      },
   });

   function maskPhoneNumber(phoneNumber) {
      const digits = phoneNumber.replace(/\D/g, "");

      if (digits.length <= 3) {
         return `${digits}`;
      } else if (digits.length <= 6) {
         return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
         return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
      }
   }


   function unmaskPhoneNumber(maskedNumber) {
      return maskedNumber.replace(/\D/g, "");
   }

   function applyMask(event) {
      const input = event.target;
      const rawValue = unmaskPhoneNumber(input.value);
      input.value = maskPhoneNumber(rawValue);
      phoneNumber.value = rawValue;
   }

   const isValidPhoneNumber = computed(() => {
      return unmaskPhoneNumber(formattedPhoneNumber.value).length == 10;
   })

   const parsedPhoneNumber = computed(() => unmaskPhoneNumber(formattedPhoneNumber.value));

   return {
      phoneNumber,
      parsedPhoneNumber,
      formattedPhoneNumber,
      isValidPhoneNumber,
      maskPhoneNumber,
      unmaskPhoneNumber,
      applyMask,
   };
};
