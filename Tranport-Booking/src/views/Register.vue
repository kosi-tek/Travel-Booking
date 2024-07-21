<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Create a new account
      </h2>
      <p class="mt-2 text-center text-sm leading-5 text-gray-500">
        Or
        <router-link
          to="/login"
          class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          login to your account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="registerUser">
          <div>
            <label for="fullName" class="block text-sm font-medium leading-5 text-gray-700">Full Name</label>
            <input id="fullName" name="fullName" type="text" placeholder="e.g., John Doe" required class="form-input" />
          </div>
          <div class="mt-6">
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email address</label>
            <input id="email" name="email" type="email" placeholder="user@example.com" required class="form-input" />
          </div>
          <div class="mt-6">
            <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
            <input id="password" name="password" type="password" required class="form-input" />
          </div>
          <div class="mt-6">
            <label for="confirmPassword" class="block text-sm font-medium leading-5 text-gray-700">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required class="form-input" />
          </div>
          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Create account
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  try {
    const response = await axios.post('http://localhost:9000/api/v1/user/register', {
      fullName,
      email,
      password,
      confirmPassword,
    });

    console.log('User registered successfully:', response.data);

    // Show a pop-up notification
    alert('User registered successfully. Click OK to proceed to login.');

    // Redirect to login page after successful registration
    router.push('/login');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // User already exists or other validation errors
      alert('Registration failed. Please check your information and try again.');
    } else {
      console.error('Registration failed:', error);
    }
  }
};
</script>

<style scoped>
.form-input {
  appearance: none;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
