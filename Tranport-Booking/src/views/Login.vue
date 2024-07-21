<template>
  <div class="min-h-100 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Log In
      </h2>
      <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        Don't have an account?
        <router-link
          to="/signup"
          class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          Register an account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="loginUser">
          <div class="mt-6">
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
              Email address
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input id="email" name="email" type="email" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                     placeholder="user@example.com">
            </div>
          </div>

          <div class="mt-6">
            <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
              Password
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input id="password" name="password" type="password" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
            </div>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Sign In
              </button>
            </span>
          </div>
        </form>

        <!-- Additional template code -->
        <div class="mt-6 text-center">
          <p class="text-sm leading-5 text-gray-600">
            Forgot your password?
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Reset Password
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter();

const loginUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await axios.post('http://localhost:9000/api/v1/user/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (response.status === 200 && response.data.success) {
      const { token, data } = response.data;

      // Store the token and user data in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('user', JSON.stringify(data));

      console.log('User logged in successfully:', data);

      // Redirect based on user role
      if (data.role === 'admin') {
        router.push('/dashboard'); // Redirect to admin dashboard
      } else {
        router.push('/');  // Redirect to user profile page
      }
    } else {
      console.error('Login failed:', response.data.message);
      // Handle login error here, such as displaying an error message to the user
    }
    
  } catch (error) {
    console.error('Login failed:', error);
    // Handle login error here, such as displaying an error message to the user
  }
};



</script>

<style scoped>
/* Add your styles here */
</style>

 