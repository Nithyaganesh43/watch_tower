i made some changes in backend api pls make those accordingly without changing anyting in ui PLS DONT CHANGE ANYTING IN

HOW-IT-WORK PAGE APP/PAGE.TXT OR ANY UI

MAJOR MODIFICATION

EMAIL REMOVED OAUTH GOOGLE ALONE SIGNIN OPTION IF CHECK/ ON LOAD
NOTE LOADING AND RENDERING NEED TO BE VERY SMOOTH

NOTE SOME EVERYTHING NEED TO BE PERFECT NO UI BUGS OR UNWANTED CHANGES THAT NOT MENTIONED




BASE URL https://thewatchtower.onrender.com


POST /auth/logout
Body: none
Response:

```json
{
  "message": "Successfully logged out"
}
```

Validation: none

GET /auth/check
Body: none
Response:

```json
{
  "message": "Authorized"
}
```

Validation: auth token required

GET /auth/google/callback
Body: none
Response: Redirect to frontend URL
Validation: handled by passport Google OAuth

POST /servers/add
Body:

```json
{
  "NewUrl": "https://example.com"
}
```

Response:

```json
{
  "message": "Server added successfully",
  "server": {
    "id": "60f6c2f8b6d9c1001c8a1234",
    "url": "https://example.com",
    "status": "checking",
    "lastCheck": "2025-10-14T07:00:00.000Z",
    "createdAt": "2025-10-14T07:00:00.000Z"
  }
}
```

Validation: URL required, valid URL, max 100 servers per user, unique per user

GET /servers/
Body: none
Response:

```json
{
  "servers": [
    {
      "id": "60f6c2f8b6d9c1001c8a1234",
      "url": "https://example.com",
      "status": "online",
      "lastCheck": "2025-10-14T07:00:00.000Z",
      "createdAt": "2025-10-14T07:00:00.000Z"
    }
  ]
}
```

Validation: auth token required

DELETE /servers/:id
Body: none
Response:

```json
{
  "message": "Server removed successfully",
  "server": {
    "id": "60f6c2f8b6d9c1001c8a1234",
    "url": "https://example.com",
    "status": "online",
    "lastCheck": "2025-10-14T07:00:00.000Z"
  }
}
```

Validation: valid MongoDB ObjectId, auth token required





















GET /servers/getall?API_KEY=...
Body: none
Response:

```json
{
  "servers": [
    { "id": "650d4f2f1c4a1b00123abcd1", "url": "https://example.com" }
  ]
}
```

Validation: valid API_KEY

POST /servers/reportallservers?API_KEY=...
Body:

```json
{
  "report": {
    "failed": ["650d4f2f1c4a1b00123abcd2"]
  }
}
```

Response:

```json
{
  "message": "Server statuses updated successfully"
}
```

Validation: valid API_KEY, report.failed must be array
