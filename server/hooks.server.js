import {redirect} from '@sveltejs/kit';


// If you want to restrict access to a specific folder or page, you can watch for all request events via the Hooks file
// This means that every page needing to be restricted will also require a +page.server.js file or a +layout.server.js file
// Static pages (without the server files) are not passed through this Hooks event
export const handle = async({ event, resolve }) => {
  const currentPath = event.url.pathname;
  const cookies = event.cookies;
  
  // Validate the user's current auth token
  const isTokenValid = validateYourTokenHere(cookies)
  
  // Restrict all routes under /protected
  if(currentPath.includes("/protected")) {
    if(!isTokenValid) {
      throw redirect(303, "/");
    }
  }

  // Resolve as normal
  const response = await resolve(event);

  return response;
}


// Example of how to read the cookies
// Svelte has built-in methods for accessing cookies, but ideally this would use your authentication library's SDK instead
const validateYourTokenHere = (cookies) => {
  const currentToken = cookies.get("auth-token");
  return currentToken === "123;
}


// Example of setting a simple authentication token
// The cookies value comes from the Hook event.cookies
const setNewUserToken = (cookies) => {
  cookies.set("auth-token", "123")
}
