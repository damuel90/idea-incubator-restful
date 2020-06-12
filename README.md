# idea incubator
> Backend: System that allows users to share their ideas with a community and receive positive or negative comments and votes.
it was done with NodeJS, Express and MongoDB in an N-Tier architecture

## ideaincubator-api
### Auth

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/auth/signup` | POST | register a user with username, email, password and avatar (optional) by form-data, return status 201 and user object |
| `/auth/signin` | POST | authenticate a user with username or email and password by form-urlencoded, return status 201 and user object |

### User

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/user/username` | PATCH | edit username (authenticated user) with username by query, return status 200 and message |
| `/user/avatar` | PATCH | edit avatar (authenticated user) with avatar by form-data, return status 201 and avatar |
| `/user/delete` | DELETE | delete an authenticated user, return status 200 and message |

### Idea

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/idea` | POST | create an idea (authenticated user) with title, description (optional) and sketches (optional), by form-data, return status 201 and idea object |
| `/idea` | GET | get all ideas with pageSize (optional) and pageNum (optional), by query, return status 201 and ideas array |
| `/idea/:userId` | GET | get all user ideas with pageSize (optional) and pageNum (optional) by params, return status 200 and ideas array |
| `/idea` | PUT | edit an idea (authenticated user) with ideaId, title, description and sketches by form-data, return status 200 and message |
| `/idea/:ideaId` | DELETE | delete an idea with ideaId by params, return status 200 and message |

### Vote

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/idea/vote` | POST | vote an idea (authenticated user) with ideaId and vote by form-urlencoded, return status 200 and message |
| `/idea/vote` | PATCH | edit idea vote (authenticated user) with ideaId and vote by form-urlencoded, return status 200 and message |
| `/idea/:ideaId/vote` | DELETE | delete an vote with ideaId by params, return status 200 and message |

### Comment

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/idea/comment` | POST | create an idea comment (authenticated user) with ideaId and comment by form-urlencoded, return status 201 and comment object |
| `/idea/comment` | PATCH | edit idea comment (authenticated user) with ideaId, commentId and comment by form-urlencoded, return status 200 and message |
| `/idea/:ideaId/:commentId` | DELETE | delete an comment with ideaId and commentId by params, return status 200 and message |

## License
MIT (c) Damuel Querales