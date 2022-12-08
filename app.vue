<template>
  <div>
    <Html>
      <Head>
        <Title>{{ title }}</Title>
      </Head>

      <Body>
        <nuxt-layout>
          <nuxt-page />
        </nuxt-layout>
      </Body>
    </Html>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const title = computed(() => route.meta.title)
const metaDescription = computed(() => route.meta.description)

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      size: '16x16',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      size: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'stylesheet',
      integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
      crossorigin: 'anonymous',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    },
  ],
  meta: [
    { charset: 'utf-8' },
    {
      hid: 'og:title',
      name: 'og:title',
      content: title
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: metaDescription
    },
    {
      hid: 'description',
      name: 'description',
      content: metaDescription
    },
    {
      name: 'robots',
      content: 'index,follow'
    },
    {
      httpEquiv: 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
  ]
})
</script>