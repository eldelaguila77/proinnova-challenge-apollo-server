# proinnova-challenge-apollo-server

Este proyecto es un servidor Apollo GraphQL para el desafío Proinnova. Utiliza TypeScript, TypeORM, y PostgreSQL para gestionar la base de datos. El servidor incluye resolutores para manejar usuarios, publicaciones y comentarios.

## Características

- **GraphQL**: Utiliza Apollo Server para manejar consultas y mutaciones.
- **TypeORM**: ORM para interactuar con la base de datos PostgreSQL.
- **Autenticación**: Utiliza JWT para la autenticación de usuarios.
- **Liquibase**: Herramienta de control de versiones de la base de datos.

## Requisitos

- Docker
- Docker Compose

## Configuración

Asegúrate de tener un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
ACCESS_TOKEN_SECRET=myaccesstokensecret
DATABASE_URL=jdbc:postgresql://db:5432/challenge_proinnova
DB_USERNAME=postgres
DB_PASSWORD=mypassword
DB_NAME=challenge_proinnova
LIQUIBASE_URL=jdbc:postgresql://db:5432/challenge_proinnova
LIQUIBASE_USERNAME=postgres
LIQUIBASE_PASSWORD=mypassword
LIQUIBASE_CHANGELOG_FILE=/liquibase/changelog/db.changelog-master.yaml
```
## Levantar el proyecto
```
docker-compose up --build
```
## Acceder a Apollo Server
```
http://localhost:4000/graphql
```

# Consumir consultas y mutaciones

## Crear usuario
Esta acción es la unica que no solicita autenticación
```
mutation {
  createUser(
    variables: {
      username: "admin", 
      password: "Guatemala10", 
      email: "admin@gmail.com", 
      state: true
    }
  ) {
    id
    username
    password
    email
    state
  }
}
```

## Login
Esta acción permite obtener el token a usar en el resto de mutaciones y consultas
```
mutation {
  login(
    email: "admin@gmail.com",
    password: "Guatemala10"
  )
  {
    accessToken
  }
}
```
### Respuesta
```
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyNzM4MjAzOCwiZXhwIjoxNzI3MzgyOTM4fQ.fK7CI12F965Lu8HpIvHf3Qqbvty3S9fUPVxbxrVUlzI"
    }
  }
}
```
## Get Users
```
{
  users {
    id
    username
    password
    email
    state
    createdAt
  }
}
```

### Nota: para todas estas consultas y mutaciones, agregar el header de Authorization Bearer

![alt text](image.png)

### Respuesta

```
{
  "data": {
    "users": [
      {
        "id": 1,
        "username": "Eldelaguila89",
        "password": "123",
        "email": "ed@gmail.com",
        "state": true,
        "createdAt": "1727231379066"
      },
      {
        "id": 3,
        "username": "admin",
        "password": "$2a$12$WxnjgfukexBmHWc1Ovspb.fpw3oJdJBRBPCzw.LGAH89kGmyCtdhe",
        "email": "admin@gmail.com",
        "state": true,
        "createdAt": "1727248833230"
      }
    ]
  }
}
```

## Update User
```
mutation {
  updateUser (id: 1, fields: {
    username: "Eldelaguila89"
  })
}
```


## Delete User
```
mutation {
  deleteUser(id: 2)
}
```

## Create Post
```
mutation {
  createPost(
    variables: {
      title: "Post 1",
      content: "prueba de post 1",
      userId: 1
    }
  ) {
    id
    title
    content
    createdAt
  }
}
```

## Get Posts
```
{
  posts {
    id
    title
    content
    createdAt
  }
}
```


## Create Comments
```
mutation {
  createComment(
    variables: {
      content: "Comentairo 1",
      postId: 1,
      userId: 1
    }
  ) {
    id
    content
    user {
      id
      username
    }
    post {
      id
      title
      content
    }
  }
}
```

## Get Comments
```
{
  comments {
    id
    content
    user {
      id
      username
    }
    post {
      id
      title
      content
    }
  }
}
```
