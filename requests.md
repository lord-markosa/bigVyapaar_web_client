# Server API Request Details

-   All request needs to have the token in the authorization section of the header
    except login and register

```
headers: {
    Authorization: `Bearer ${token}`,
},
```

## USERS REQUESTS:

### register/login

URL: `http://localhost:8090/api/users/register` or `.../login`

```
{
    "username": "testuser5",
    "password": "**********"
}
```

### negotiate (get the pub sub url)

URL: `http://localhost:8090/api/users/negotiate`

### get user

URL: `http://localhost:8090/api/users/data`

## CHATS REQUESTS:

### send message

URL: `http://localhost:8090/api/chats/{{chatId}}/send`

```
{
    "content": "test message 2"
}
```

### new chat

URL: `http://localhost:8090/api/chats/new`

### get chat messages

URL: `http://localhost:8090/api/chats/{{chatId}}`

## STORY REQUESTS:

### post product

URL: `http://localhost:8090/api/product/`

```
{
    "content": "New test product 3"
}
```

### like product

URL: `http://localhost:8090/api/product/{{productId}}/like`

### update product (put)

URL: `http://localhost:8090/api/product/{{productId}}`

```
{
    "content": "New Test product2_ re-edit 2!!"
}
```

### delete product (delete)

URL: `http://localhost:8090/api/product/{{productId}}`
