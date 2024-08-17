let api_domain=''
console.log(import.meta.env) // cac bien moi truyen vao tu vite.config.js
if(process.env.BUILD_MODE === 'dev')
  api_domain = 'http://localhost:4000'
if(process.env.BUILD_MODE === 'prod') 
  api_domain = 'https://mui-api.onrender.com'

export const domain =api_domain