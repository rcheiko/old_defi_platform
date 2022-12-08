<template>
  <div class="nav-shape">
    <div class="logo-parent">
      <icons-ledgity-icon class="logo" />
      <p class="logo-p">Ledgity</p>
    </div>
    <div class="nav-parent">
      <nuxt-link class="nav-inner-" to="/swap" exact-active-class="text-primary">
        <icons-navbar-swap-icon-active v-if="route.fullPath === '/swap'" />
        <icons-navbar-swap-icon v-else />
        Swap
      </nuxt-link>
      <nuxt-link class="nav-inner" to="/portfolio" exact-active-class="text-primary">
        <icons-navbar-portfolio-icon-active class="fix" v-if="route.fullPath === '/portfolio'" />
        <icons-navbar-portfolio-icon class="fix" v-else />
        Portfolio
      </nuxt-link>
      <nuxt-link class="nav-inner" to="/" exact-active-class="text-primary">
        <icons-navbar-analytics-icon-active class="fix" v-if="route.fullPath === '/'" />
        <icons-navbar-analytics-icon class="fix" v-else />
        Analytics
      </nuxt-link>
    </div>
    <div class="social-network">
      <p class="social-inner">
        <a target="_blank" :href="socialMedia.twitter"><svg class="social-logo" width="22" height="22"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM11.05 5.75C11.4 5.7 11.7 5.65 12 5.5C11.8 5.85 11.5 6.15 11.15 6.35C11.25 8.7 9.55 11.25 6.5 11.25C5.6 11.25 4.75 10.95 4 10.5C4.85 10.6 5.75 10.35 6.35 9.9C5.6 9.9 5 9.4 4.8 8.75C5.05 8.8 5.3 8.75 5.55 8.7C4.8 8.5 4.25 7.8 4.25 7.05C4.5 7.15 4.75 7.25 5 7.25C4.3 6.75 4.05 5.8 4.5 5.05C5.35 6.05 6.55 6.7 7.9 6.75C7.65 5.75 8.45 4.75 9.5 4.75C9.95 4.75 10.4 4.95 10.7 5.25C11.1 5.15 11.45 5.05 11.75 4.85C11.65 5.25 11.4 5.55 11.05 5.75Z"
              fill="black" />
            <title>twitter</title>
          </svg>
        </a>
      </p>
      <p class="social-inner">
        <a target="_blank" :href="socialMedia.telegram"><svg class="social-logo" width="22" height="22"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8.34593 6.00369C7.62943 6.30171 6.19744 6.91853 4.04996 7.85415C3.70124 7.99282 3.51857 8.12848 3.50194 8.26114C3.47383 8.48532 3.75457 8.5736 4.13687 8.6938C4.18887 8.71016 4.24275 8.7271 4.29799 8.74506C4.67411 8.86732 5.18006 9.01035 5.44308 9.01603C5.68166 9.02119 5.94795 8.92283 6.24195 8.72095C8.2484 7.36653 9.28414 6.68195 9.34917 6.66719C9.39504 6.65678 9.45862 6.64368 9.50169 6.68197C9.54476 6.72025 9.54053 6.79276 9.53597 6.81221C9.50815 6.93077 8.40615 7.95529 7.83586 8.48549C7.65807 8.65077 7.53196 8.76802 7.50618 8.7948C7.44843 8.85478 7.38957 8.91152 7.33301 8.96605C6.98358 9.30289 6.72155 9.5555 7.34751 9.968C7.64833 10.1662 7.88904 10.3302 8.12919 10.4937C8.39144 10.6723 8.65302 10.8504 8.99147 11.0723C9.07769 11.1288 9.16004 11.1875 9.24025 11.2447C9.54546 11.4623 9.81967 11.6578 10.1584 11.6266C10.3553 11.6085 10.5586 11.4234 10.6619 10.8714C10.9059 9.56675 11.3856 6.74005 11.4964 5.57523C11.5062 5.47318 11.4939 5.34257 11.4841 5.28524C11.4743 5.2279 11.4538 5.14622 11.3793 5.08574C11.291 5.01413 11.1548 4.99903 11.0938 5.00005C10.8168 5.00498 10.3917 5.15279 8.34593 6.00369Z"
              fill="black" />
            <title>telegram</title>
          </svg>
        </a>
      </p>
      <p class="social-inner">
        <a target="_blank" :href="socialMedia.linkedin"><svg class="social-logo" width="22" height="22"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM4.1 6.65V12H5.8V6.65H4.1ZM4 4.95C4 5.5 4.4 5.9 4.95 5.9C5.5 5.9 5.9 5.5 5.9 4.95C5.9 4.4 5.5 4 4.95 4C4.45 4 4 4.4 4 4.95ZM10.3 12H11.9V8.7C11.9 7.05 10.9 6.5 9.95 6.5C9.1 6.5 8.5 7.05 8.35 7.4V6.65H6.75V12H8.45V9.15C8.45 8.4 8.95 8 9.45 8C9.95 8 10.3 8.25 10.3 9.1V12Z"
              fill="black" />
            <title>linkedin</title>
          </svg>
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const socialMedia = {
  "twitter": "https://twitter.com/LedgityPlatform",
  "telegram": "https://t.me/ledgityapp",
  "linkedin": "https://linkedin.com/company/ledgity/",
}

</script>

<style scoped>
.logo-parent {
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin: 20px;
}

.logo {
  margin-right: 10px;
}

.logo-p {
  margin: 0;
}

.logo-nav {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-inner-:hover .logo-nav path {
  stroke: #3E54FA;
}

.nav-inner:hover .logo-nav path {
  stroke: #3E54FA;
}

.fix {
  margin: 0 3% 0 2%;
}

.nav-parent {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.nav-inner {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 6% 0 3% 0;
  padding: 2.5%;
  margin-left: 15%;
  color: #212529
}

.nav-inner- {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 6% 0;
  margin-left: 15%;
  color: #212529
}

.nav-inner-:hover, .nav-inner:hover {
  color: #3E54FA;
}
.nav-shape {
  display: flex;
  position: fixed;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
  background-color: #f5f6f8;
}

.social-network {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.social-inner {
  display: flex;
  align-items: flex-end;
  text-align: center;
}

.social-logo:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
