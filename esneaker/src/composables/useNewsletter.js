import { ref } from 'vue'

export function useNewsletter() {
  const email = ref('')

  const handleNewsletterSubmit = () => {
    if (isEmailValid(email.value)) {
      subscribeToNewsletter(email.value)
      resetEmailInput()
    }
  }

  const isEmailValid = (emailAddress) => {
    return emailAddress.trim().length > 0
  }

  const subscribeToNewsletter = (emailAddress) => {
    console.log('Newsletter subscription:', emailAddress)
  }

  const resetEmailInput = () => {
    email.value = ''
  }

  return {
    email,
    handleNewsletterSubmit
  }
}
