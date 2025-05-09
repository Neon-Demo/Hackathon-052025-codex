# Sequence Diagrams

## 1. Inspection Workflow

```mermaid
sequenceDiagram
    participant I as Inspector
    participant MA as Mobile App
    participant API as API Gateway
    participant PS as Project Service
    participant IS as Inspection Service
    participant SS as Sample Service
    participant DB as Database
    participant LS as Lab Service
    participant RS as Report Service

    I->>MA: Start Inspection
    MA->>API: GET /projects/{id}
    API->>PS: Fetch Project Details
    PS->>DB: Query Project
    DB-->>PS: Project Data
    PS-->>API: Project Details
    API-->>MA: Project Info

    I->>MA: Fill Inspection Forms
    MA->>MA: Cache Form Data
    
    I->>MA: Collect Samples
    MA->>MA: Store Sample Data
    
    I->>MA: Submit Inspection
    MA->>API: POST /inspections
    API->>IS: Create Inspection
    IS->>DB: Save Inspection
    DB-->>IS: Confirmation
    
    MA->>API: POST /samples
    API->>SS: Process Samples
    SS->>DB: Save Samples
    DB-->>SS: Confirmation
    SS->>LS: Submit to Lab
    
    LS-->>SS: Results Ready
    SS->>DB: Update Results
    
    I->>MA: Generate Report
    MA->>API: POST /reports
    API->>RS: Create Report
    RS->>DB: Fetch Data
    DB-->>RS: Inspection Data
    RS->>RS: Generate PDF
    RS-->>API: Report URL
    API-->>MA: Download Link
```

## 2. Project Creation and Sync

```mermaid
sequenceDiagram
    participant AT as AirTable
    participant SS as Sync Service
    participant PS as Project Service
    participant DB as Database
    participant NS as Notification Service
    participant U as Users

    AT->>SS: New Project Created
    SS->>PS: Sync Request
    PS->>DB: Check Existing
    DB-->>PS: No Match Found
    PS->>DB: Create Project
    DB-->>PS: Confirmation
    PS->>NS: Project Created
    NS->>U: Notification
    
    SS->>AT: Sync Complete
```

## 3. Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant API as API Gateway
    participant Auth as Auth Service
    participant DB as Database

    U->>C: Login Request
    C->>API: POST /auth/login
    API->>Auth: Validate Credentials
    Auth->>DB: Query User
    DB-->>Auth: User Data
    Auth->>Auth: Generate JWT
    Auth-->>API: Token
    API-->>C: Auth Response
    C->>C: Store Token
```

## 4. Report Generation

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant API as API Gateway
    participant RS as Report Service
    participant DB as Database
    participant S3 as File Storage

    U->>C: Request Report
    C->>API: POST /reports
    API->>RS: Generate Report
    RS->>DB: Fetch Data
    DB-->>RS: Project Data
    RS->>DB: Fetch Samples
    DB-->>RS: Sample Data
    RS->>RS: Process Template
    RS->>S3: Save PDF
    S3-->>RS: File URL
    RS->>DB: Update Report Status
    RS-->>API: Report Ready
    API-->>C: Download URL
```

## 5. Sample Management

```mermaid
sequenceDiagram
    participant I as Inspector
    participant MA as Mobile App
    participant API as API Gateway
    participant SS as Sample Service
    participant DB as Database
    participant Lab as Laboratory
    participant NS as Notification Service

    I->>MA: Create Sample
    MA->>API: POST /samples
    API->>SS: Process Sample
    SS->>DB: Save Sample
    DB-->>SS: Confirmation
    
    SS->>Lab: Submit Sample
    Lab-->>SS: Acknowledge
    
    Lab->>SS: Results Ready
    SS->>DB: Update Results
    SS->>NS: Results Available
    NS->>I: Notification
```

These sequence diagrams illustrate the key workflows in the system, showing the interaction between different components and services. They help visualize:

1. The complete inspection process
2. Project synchronization with AirTable
3. User authentication flow
4. Report generation process
5. Sample management workflow

Each diagram shows:
- Component interactions
- Data flow
- Asynchronous processes
- Error handling points
- User touchpoints
