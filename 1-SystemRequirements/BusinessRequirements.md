# Greenhouse Management System - Business Requirements

## 1. System Overview
The Greenhouse Management System (GMS) is designed to modernize and streamline the inspection and reporting process for hazardous materials management, specifically focusing on asbestos and other hazardous materials inspection workflows.

## 2. Core Requirements

### 2.1 Integration Requirements
- Must integrate with existing Air Table system for project management and scheduling
- Support daily synchronization with Air Table to retrieve:
  - New project numbers
  - Project assignments
  - Project scheduling information

### 2.2 Field Data Collection
- Convert existing paper-based forms to electronic format
- Support multiple inspection types:
  - Asbestos-only inspections
  - Full hazmat inspections
  - Spot surveys
- Provide digital forms for:
  - Bulk sample collection
  - General service logs
  - HMI (Hazardous Materials Inspection) inventory
  - XRF (X-Ray Fluorescence) data collection for lead testing

### 2.3 Equipment and Preparation Management
- Track and manage inspection equipment (e.g., XRF guns)
- Support pre-job preparation workflows:
  - Equipment checklist
  - Required forms selection
  - Location/site information
  - Travel distance calculation

### 2.4 Sample Management and Lab Integration
- Track sample collection and submission to lab
- Support various lab turnaround times
- Manage and store lab results
- Notify relevant parties when results are received

### 2.5 Reporting System
- Auto-populate report templates with collected field data
- Support multiple report types:
  - Full hazmat reports
  - Asbestos-only reports
  - Non-detect reports
  - Spot survey reports
- Include capability to generate:
  - Material location tables
  - Quantity calculations
  - Asbestos percentage documentation
- Export reports in PDF format

## 3. Technical Requirements

### 3.1 Data Management
- Secure storage of all inspection data
- Regular data backup and recovery capabilities
- Data validation and quality control measures

### 3.2 User Interface
- Mobile-friendly interface for field use
- Intuitive form navigation
- Offline capability for field data collection
- Project search by project number

### 3.3 Security
- User authentication and authorization
- Role-based access control
- Secure data transmission
- Compliance with relevant data protection regulations

## 4. Performance Requirements
- System must be reliable and available during business hours
- Forms must be accessible offline in field conditions
- Synchronization with Air Table must be completed within specified timeframes
- Report generation must be completed within acceptable time limits

## 5. Constraints
- Must maintain existing Air Table integration
- Cannot disrupt current project management workflow
- Must support existing business processes and terminology
- Must be cloud-based for accessibility

## 6. Success Criteria
- Elimination of paper-based forms
- Reduction in data entry time
- Improved accuracy in report generation
- Faster turnaround time for client reports
- Successful integration with existing Air Table system
- User adoption and satisfaction
