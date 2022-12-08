<template>
    <div>
        <svg
            class="logo-nav"
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 3L7.85355 5.64645C7.65829 5.84171 7.34171 5.84171 7.14645 5.64645L6.35355 4.85355C6.15829 4.65829 5.84171 4.65829 5.64645 4.85355L3.5 7"
              stroke="#55546D"
              stroke-width="0.88"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 1.5V8.9C1.5 9.46005 1.5 9.74008 1.60899 9.95399C1.70487 10.1422 1.85785 10.2951 2.04601 10.391C2.25992 10.5 2.53995 10.5 3.1 10.5H10.5"
              stroke="#55546D"
              stroke-width="0.88"
              stroke-linecap="round"
            />
          </svg>
    </div>
</template>

<style scoped>
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
</style>