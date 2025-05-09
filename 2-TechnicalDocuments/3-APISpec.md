# API Specification

## 1. Authentication Endpoints

### 1.1 Login
```
POST /api/v1/auth/login
Request:
{
    "email": string,
    "password": string,
    "remember": boolean
}
Response:
{
    "token": string,
    "user": {
        "id": string,
        "email": string,
        "role": string,
        "permissions": string[]
    }
}
```

### 1.2 Refresh Token
```
POST /api/v1/auth/refresh
Header: Authorization: Bearer {token}
Response:
{
    "token": string
}
```

## 2. Project Endpoints

### 2.1 List Projects
```
GET /api/v1/projects
Query Parameters:
- page: number
- limit: number
- search: string
- status: string
- startDate: string
- endDate: string

Response:
{
    "data": [
        {
            "id": string,
            "projectNumber": string,
            "status": string,
            "client": string,
            "location": string,
            "assignedTo": string,
            "scheduledDate": string
        }
    ],
    "total": number,
    "page": number,
    "limit": number
}
```

### 2.2 Get Project Details
```
GET /api/v1/projects/{projectId}
Response:
{
    "id": string,
    "projectNumber": string,
    "status": string,
    "client": {
        "id": string,
        "name": string,
        "contact": string
    },
    "location": {
        "address": string,
        "coordinates": {
            "lat": number,
            "lng": number
        }
    },
    "schedule": {
        "date": string,
        "assignedTo": string,
        "status": string
    },
    "forms": [
        {
            "id": string,
            "type": string,
            "status": string
        }
    ]
}
```

## 3. Inspection Endpoints

### 3.1 Create Inspection
```
POST /api/v1/inspections
Request:
{
    "projectId": string,
    "type": string,
    "scheduledDate": string,
    "assignedTo": string,
    "equipment": string[]
}
Response:
{
    "id": string,
    "status": "created"
}
```

### 3.2 Submit Form Data
```
POST /api/v1/inspections/{inspectionId}/forms
Request:
{
    "formType": string,
    "data": {
        // Dynamic form data
    },
    "location": {
        "lat": number,
        "lng": number
    },
    "attachments": string[]
}
Response:
{
    "id": string,
    "status": "submitted"
}
```

## 4. Sample Management Endpoints

### 4.1 Create Sample
```
POST /api/v1/samples
Request:
{
    "inspectionId": string,
    "sampleId": string,
    "material": string,
    "location": string,
    "type": string,
    "photos": string[]
}
Response:
{
    "id": string,
    "status": "created"
}
```

### 4.2 Update Sample Status
```
PUT /api/v1/samples/{sampleId}/status
Request:
{
    "status": string,
    "labResults": {
        "resultDate": string,
        "findings": object,
        "attachments": string[]
    }
}
Response:
{
    "id": string,
    "status": string
}
```

## 5. Report Endpoints

### 5.1 Generate Report
```
POST /api/v1/reports
Request:
{
    "projectId": string,
    "type": string,
    "template": string,
    "data": {
        // Template-specific data
    }
}
Response:
{
    "id": string,
    "status": "generating",
    "downloadUrl": string
}
```

### 5.2 Get Report Status
```
GET /api/v1/reports/{reportId}/status
Response:
{
    "id": string,
    "status": string,
    "progress": number,
    "downloadUrl": string
}
```

## 6. Equipment Management Endpoints

### 6.1 List Equipment
```
GET /api/v1/equipment
Response:
{
    "data": [
        {
            "id": string,
            "type": string,
            "status": string,
            "lastCalibration": string,
            "nextCalibration": string
        }
    ]
}
```

### 6.2 Update Equipment Status
```
PUT /api/v1/equipment/{equipmentId}/status
Request:
{
    "status": string,
    "notes": string
}
Response:
{
    "id": string,
    "status": string
}
```

## 7. Form Template Endpoints

### 7.1 List Templates
```
GET /api/v1/templates
Response:
{
    "data": [
        {
            "id": string,
            "name": string,
            "type": string,
            "fields": object[]
        }
    ]
}
```

### 7.2 Create Template
```
POST /api/v1/templates
Request:
{
    "name": string,
    "type": string,
    "fields": [
        {
            "name": string,
            "type": string,
            "required": boolean,
            "validation": object
        }
    ]
}
Response:
{
    "id": string,
    "status": "created"
}
```

## 8. Error Responses
```
{
    "error": {
        "code": string,
        "message": string,
        "details": object
    }
}
```

## 9. Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
