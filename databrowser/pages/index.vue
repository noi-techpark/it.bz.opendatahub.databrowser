<template>
  <div>
    <!-- Main content header -->
    <div
      class="
        flex flex-col
        items-start
        justify-between
        pb-6
        space-y-4
        border-b
        lg:items-center lg:space-y-0 lg:flex-row
      "
    >
      <h1 class="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
    </div>

    <!-- Start Content -->

    <!-- Table see (https://tailwindui.com/components/application-ui/lists/tables) -->
    <h3 class="mt-6 text-xl">Users</h3>
    <div
      class="
        max-w-full
        min-h-full
        mt-6
        overflow-hidden overflow-x-auto
        border border-gray-200
        rounded-md
      "
    >
      <table class="w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="
                px-6
                py-3
                text-xs
                font-medium
                tracking-wider
                text-left text-gray-500
                uppercase
              "
            >
              Name
            </th>
            <th
              scope="col"
              class="
                px-6
                py-3
                text-xs
                font-medium
                tracking-wider
                text-left text-gray-500
                uppercase
              "
            >
              Title
            </th>
            <th
              scope="col"
              class="
                px-6
                py-3
                text-xs
                font-medium
                tracking-wider
                text-left text-gray-500
                uppercase
              "
            >
              Status
            </th>
            <th
              scope="col"
              class="
                px-6
                py-3
                text-xs
                font-medium
                tracking-wider
                text-left text-gray-500
                uppercase
              "
            >
              Role
            </th>
            <th
              scope="col"
              class="
                px-6
                py-3
                text-xs
                font-medium
                tracking-wider
                text-left text-gray-500
                uppercase
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="{ id, name, email, role, active } in users"
            :key="id"
            class="transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10">
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ name }}
                  </div>
                  <div class="text-sm text-gray-500">{{ email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                Regional Paradigm Technician
              </div>
              <div class="text-sm text-gray-500">Optimization</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="
                  inline-flex
                  px-2
                  text-xs
                  font-semibold
                  leading-5
                  text-green-800
                  rounded-full
                "
                :class="active ? 'bg-green-100' : 'bg-red-100'"
              >
                {{ active ? 'Active' : 'Not Active' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ role }}
            </td>
            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Two columns grid -->
    <div class="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2 xl:grid-cols-4">
      <!-- Import data card -->
      <div class="border rounded-lg shadow-sm">
        <!-- Card header -->
        <div class="flex items-center justify-between px-4 py-2 border-b">
          <h5 class="font-semibold">Import Data</h5>
          <!-- Dots button -->
          <button class="p-2 rounded-full">
            <svg
              class="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
        <p class="px-4 py-6 text-gray-600">
          See and talk to your users and import them into your platform.
        </p>
        <ul class="px-4 pb-4 space-y-4 divide-y">
          <h5 class="font-semibold">Import Users from:</h5>
          <li class="flex items-start justify-between pt-4">
            <div class="flex items-start space-x-3">
              <!-- Twitter icon -->
              <span class="flex items-center pt-1">
                <svg fill="currentColor" class="w-5 h-5 text-blue-500">
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </span>
              <div>
                <h5 class="font-semibold">Twitter</h5>
                <span class="text-sm font-medium text-gray-400">Users</span>
              </div>
            </div>
            <a
              href="#"
              class="
                flex
                items-center
                px-2
                py-1
                space-x-2
                text-sm text-white
                bg-blue-600
                rounded-md
                hover:bg-blue-700
                focus:outline-none focus:ring
              "
            >
              <span>Launch</span>
              <svg
                aria-hidden="true"
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </li>
          <li class="flex items-start justify-between pt-4">
            <div class="flex items-start space-x-3">
              <!-- Github icon -->
              <span class="flex items-center pt-1">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="text-black"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                  ></path>
                </svg>
              </span>
              <div>
                <h5 class="font-semibold">Github</h5>
                <span class="text-sm font-medium text-gray-400">Users</span>
              </div>
            </div>
            <a
              href="#"
              class="
                flex
                items-center
                px-2
                py-1
                space-x-2
                text-sm text-white
                bg-blue-600
                rounded-md
                hover:bg-blue-700
                focus:outline-none focus:ring
              "
            >
              <span>Launch</span>
              <svg
                aria-hidden="true"
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </li>
          <li class="pt-4 text-sm font-medium text-gray-400">
            <p>
              Or you can
              <a
                href="#"
                class="
                  font-normal
                  text-blue-500
                  hover:underline
                  whitespace-nowrap
                "
                >sync data to your dashboard</a
              >
              to ensure data is always up to date.
            </p>
          </li>
        </ul>
      </div>

      <!-- Monthly chart card -->
      <div class="border rounded-lg shadow-sm xl:col-span-3">
        <!-- Card header -->
        <div class="flex items-center justify-between px-4 py-2 border-b">
          <h5 class="font-semibold">Monthly Expenses</h5>
          <!-- Dots button -->
          <button class="p-2 rounded-full">
            <svg
              class="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
        <!-- Card content -->
        <div class="flex items-center p-4 space-x-4">
          <span class="text-3xl font-medium">45%</span>
          <span
            class="
              flex
              items-center
              px-2
              space-x-2
              text-sm text-green-800
              bg-green-100
              rounded
            "
          >
            <span>
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path
                  fill-rule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span>39.2%</span>
          </span>
        </div>
        <!-- Chart -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      roles: ['Admin', 'Editor', 'User'],

      users: [
        {
          id: 'c27eb2bd-13d3-4231-aa60-e392b5f60d2e',
          name: 'Agnes Bogisich',
          email: 'Drake61@hotmail.com',
          role: [],
          active: true,
        },
        {
          id: 'baca6dbf-4efe-4135-b584-5123dc6e1efa',
          name: 'Damaris Huels',
          email: 'Alayna.Rohan@yahoo.com',
          role: [],
          active: true,
        },
        {
          id: 'ac991968-7f22-41e4-84ba-e62a335607c7',
          name: 'Monique Kozey',
          email: 'Louisa_Emard@gmail.com',
          role: [],
          active: false,
        },
        {
          id: '2b353eda-d96a-47b0-aaed-1871b257abd1',
          name: 'Kayden Collier',
          email: 'Rosina71@yahoo.com',
          role: [],
          active: true,
        },
        {
          id: '697fbe33-fe86-45fc-93e3-bd4335fe4063',
          name: 'Kiera Baumbach',
          email: 'Ashleigh10@hotmail.com',
          role: [],
          active: true,
        },
        {
          id: '0dffdd8d-84f4-4b87-8832-c6f560ebe850',
          name: 'Sage Dietrich',
          email: 'Ramona70@gmail.com',
          role: [],
          active: false,
        },
        {
          id: '46d0a8b6-b2c2-468e-b6d9-89c8520dccfe',
          name: 'Jodie Jones',
          email: 'Lempi89@gmail.com',
          role: [],
          active: true,
        },
        {
          id: 'c8d54e36-f6e8-4c8f-b43a-4228ab11d7a9',
          name: 'Blaze Reilly',
          email: 'Dakota_Casper@yahoo.com',
          role: [],
          active: true,
        },
        {
          id: '47e143af-9e03-4c7c-9fe1-99f3374841cb',
          name: 'Margie Douglas',
          email: 'Jadyn.Ernser@yahoo.com',
          role: [],
          active: true,
        },
        {
          id: 'd40ff313-4a69-4a70-9fc3-398d51e53114',
          name: 'Arianna Kilback',
          email: 'Fritz.Tremblay@gmail.com',
          role: [],
          active: false,
        },
      ],
    };
  },
  methods: {
    login() {
      this.$auth.loginWith('keycloak');
    },
    logout() {
      this.$auth.logout();
    },
  },
});
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} */

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
