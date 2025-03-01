<template>
  <div class="email-signup">
    <h3>Subscribe to our newsletter</h3>
    <p>Get the latest updates and news directly in your inbox.</p>
    <form @submit.prevent="handleSubmit" class="signup-form">
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          :disabled="loading"
        />
      </div>
      <div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Subscribing...' : 'Subscribe' }}
        </button>
      </div>
    </form>
    <p v-if="message" :class="['message', messageType]">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const email = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('')

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.value }])

    if (error) throw error

    message.value = 'Thank you for subscribing!'
    messageType.value = 'success'
    email.value = ''
  } catch (error) {
    message.value = error.message === 'duplicate key value violates unique constraint "newsletter_subscribers_email_key"'
      ? 'You are already subscribed!'
      : 'Something went wrong. Please try again.'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.email-signup {
  padding: 1.5rem;
  margin: 2rem auto;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-width: 500px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

button {
  width: auto;
  min-width: 120px;
  padding: 0.75rem 2rem;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin: 0 auto;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.success {
  color: var(--vp-c-green);
}

.error {
  color: var(--vp-c-red);
}

@media (max-width: 640px) {
  .signup-form {
    flex-direction: column;
  }
}
</style>
