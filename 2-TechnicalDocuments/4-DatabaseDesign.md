# Database Design (ER Diagram)

```mermaid
erDiagram
    Users ||--o{ Projects : manages
    Users ||--o{ Inspections : performs
    Users {
        uuid id PK
        string email
        string password_hash
        string first_name
        string last_name
        string role
        jsonb permissions
        timestamp created_at
        timestamp updated_at
    }

    Projects ||--o{ Inspections : contains
    Projects ||--o{ Documents : has
    Projects {
        uuid id PK
        string project_number UK
        string status
        uuid client_id FK
        jsonb location
        timestamp scheduled_date
        uuid assigned_to FK
        timestamp created_at
        timestamp updated_at
        jsonb airtable_sync
    }

    Clients ||--o{ Projects : owns
    Clients {
        uuid id PK
        string name
        string contact_person
        string email
        string phone
        jsonb address
        timestamp created_at
        timestamp updated_at
    }

    Inspections ||--o{ Forms : includes
    Inspections ||--o{ Samples : collects
    Inspections ||--o{ Equipment : uses
    Inspections {
        uuid id PK
        uuid project_id FK
        string type
        string status
        uuid inspector_id FK
        timestamp inspection_date
        jsonb location
        timestamp created_at
        timestamp updated_at
    }

    Forms ||--o{ FormData : contains
    Forms {
        uuid id PK
        uuid inspection_id FK
        uuid template_id FK
        string status
        timestamp submitted_at
        timestamp created_at
        timestamp updated_at
    }

    FormTemplates ||--o{ Forms : defines
    FormTemplates {
        uuid id PK
        string name
        string type
        jsonb fields
        boolean active
        timestamp created_at
        timestamp updated_at
    }

    FormData {
        uuid id PK
        uuid form_id FK
        jsonb data
        timestamp created_at
        timestamp updated_at
    }

    Samples ||--o{ LabResults : has
    Samples {
        uuid id PK
        uuid inspection_id FK
        string sample_id UK
        string material
        jsonb location
        string type
        string status
        array photos
        timestamp created_at
        timestamp updated_at
    }

    LabResults {
        uuid id PK
        uuid sample_id FK
        timestamp result_date
        jsonb findings
        array attachments
        string status
        timestamp created_at
        timestamp updated_at
    }

    Equipment ||--o{ CalibrationRecords : tracks
    Equipment {
        uuid id PK
        string name
        string type
        string status
        timestamp last_calibration
        timestamp next_calibration
        timestamp created_at
        timestamp updated_at
    }

    CalibrationRecords {
        uuid id PK
        uuid equipment_id FK
        timestamp calibration_date
        string performed_by
        jsonb results
        timestamp created_at
    }

    Reports {
        uuid id PK
        uuid project_id FK
        string type
        string status
        string file_path
        uuid generated_by FK
        timestamp generated_at
        timestamp created_at
        timestamp updated_at
    }

    Documents {
        uuid id PK
        uuid project_id FK
        string name
        string type
        string file_path
        uuid uploaded_by FK
        timestamp created_at
        timestamp updated_at
    }
```

## Table Descriptions

### Users
Stores user information including authentication and authorization details.

### Projects
Central table for project management, linked to AirTable sync data.

### Clients
Contains client information for projects.

### Inspections
Tracks individual inspection events within projects.

### Forms
Manages digital forms used during inspections.

### FormTemplates
Defines structure and validation rules for different form types.

### FormData
Stores actual form data submitted during inspections.

### Samples
Tracks samples collected during inspections.

### LabResults
Stores laboratory analysis results for collected samples.

### Equipment
Manages inspection equipment inventory.

### CalibrationRecords
Tracks equipment calibration history.

### Reports
Manages generated inspection reports.

### Documents
Stores project-related documents and attachments.

## Key Features

1. **UUID Primary Keys**
   - Ensures globally unique identifiers
   - Supports distributed systems
   - Prevents ID conflicts

2. **Timestamps**
   - Created_at and updated_at for audit trails
   - Supports data synchronization
   - Enables change tracking

3. **JSONB Fields**
   - Flexible schema for dynamic data
   - Efficient storage and querying
   - Supports complex data structures

4. **Foreign Keys**
   - Maintains referential integrity
   - Enables complex relationships
   - Supports cascading operations

5. **Indexing Strategy**
   - Primary keys (B-tree)
   - Foreign keys (B-tree)
   - JSONB fields (GIN)
   - Text search fields (GiST)

## Data Types

- **uuid**: Unique identifiers
- **string**: VARCHAR(255) for text
- **jsonb**: JSON Binary for complex data
- **timestamp**: Timestamps with timezone
- **array**: Array types for multiple values
- **boolean**: True/False values
