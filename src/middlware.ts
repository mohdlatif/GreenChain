import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isProtectedPage = createRouteMatcher(['/user(.*)'])

export const onRequest = clerkMiddleware((auth, context, next) => {
  if (isProtectedPage(context.request) && !auth().userId) {
    return auth().redirectToSignIn()
  }

  return next()
})
