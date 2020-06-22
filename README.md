# Wunderlist API

Node/Express Version

## Data Structure

Users

| Field Name | Data Constraints           |
| ---------- | -------------------------- |
| id         | integer, primary key, auto |
| username   | string, required           |
| password   | string, required, hashed   |
| email      | string, not required       |
| name       | string, not required       |

Tasks

| Field Name | Data Constraints                                     |
| ---------- | ---------------------------------------------------- |
| id         | integer, primary key, auto                           |
| name       | name, required                                       |
| dueDate    | date, not required, format `YYYY-MM-DD HH:MM:SS:SSS` |
| user_id    | reference to a valid user id                         |

- Users can have an umlimited number of tasks
- Tasks can be assigned an unlimited number of tags

## Endpoints

- All error responses will have a message property

User Endpoints

| Method | Endpoint URL       | Expected Body            | Success Response |
| ------ | ------------------ | ------------------------ | ---------------- |
| POST   | /api/auth/register | `{ username, password }` | `{ id }`         |
| POST   | /api/auth/login    | `{ username, password }` | `{ token }`      |

Task Endpoints

- Repeated task are not yet implemented - they'll be in a later version if we decide to do them at all
- all task endpoints require a valid token be passed in Authorization header
- the endpoint at GET /api/tasks is intended to be used to load initial application state, and will return an array of all tasks related to a user
- tasks will be sent to the client in the following format:

```js
Task: {
    id,
    name,
    dueDate,
    completed,
    tags: [ array of tag IDs ] (This is not implemented)
  }
```

| Endpoint              | Purpose                   | Expected Body      | Success Response        | Success Code |
| --------------------- | ------------------------- | ------------------ | ----------------------- | ------------ |
| GET /api/tasks        | load a user's tasks       | N/A                | Array of a user's tasks | 200          |
| POST /api/tasks       | add a new task            | `{ new task }`     | `{ id }` of new task    | 201          |
| GET /api/tasks/:id    | get task with id :id      | N/A                | task object             | 200          |
| PUT /api/tasks/:id    | update a task with id :id | `{ task changes }` | empty on success        | 204          |
| DELETE /api/tasks/:id | delete a task             | N/A                | empty on success        | 204          |

Tags (More Stretch Goals, NTO IMPLEMENTED)

| Endpoint                           | Purpose                       | Expected Body | Success Response | Success Code |
| ---------------------------------- | ----------------------------- | ------------- | ---------------- | ------------ |
| POST /api/tasks/:id                | add a tag to task with id :id | `{ tag_id }`  | empty on success | 204          |
| DELETE /api/tasks/:task_id/:tag_id | remove a tag from a task      | N/A           | empty on success | 204          |
