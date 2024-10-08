import { defineConfig } from 'astro/config'
import Unfonts from 'unplugin-fonts/astro'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import clerk from '@clerk/astro'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    clerk({
      afterSignInUrl: '/',
      afterSignUpUrl: '/',
      signInUrl: '/sign-in',
      signUpUrl: '/sign-up',
    }),
    Unfonts({
      fontsource: {
        families: [
          {
            name: 'inter',
            variable: true,
            weights: [400, 900],
          },
        ],
      },
    }),
    alpinejs(),
    icon(),
  ],
  output: 'server',
})
