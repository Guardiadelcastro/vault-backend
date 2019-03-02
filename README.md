# The Vault (backend)
The Vault(name not final) will be a web app to store the information of the user's consumption with media. I will start with movies and then move on to books and then continue...

This project is something I created to learn and try new things. Basically I want to write an express API in Typescript, and a web app in React(maybe later I will try to replicate it in Vue). 

The Frontend is located in this [repo](https://github.com/Guardiadelcastro/vault-frontend]).


## Set up mongo container
```bash
  docker run -d -p 27017:27017 -v $(pwd)/../data/db:/data/db mongo
```
