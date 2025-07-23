Software Requirements Specification (SRS): User Management System
1. Introduction

1.1 Purpose
This document outlines the functional and non-functional requirements for a User Management System. The project's objective is to build a simple single-page application (SPA) using Angular for an admin dashboard, demonstrating proficiency in API integration, reactive forms, and modern front-end development practices.

1.2 Project Scope
The project involves the development of a user management module with full CRUD (Create, Read, Update, Delete) capabilities. The system will fetch user data from a REST API and present it in a clean, responsive user interface. The scope includes user listing, searching, pagination, adding, editing, and deleting users through a modal form. It also includes specific UX enhancements like loading indicators and toast notifications. The implementation of the backend REST API is out of scope; the application will use a dummy or public API for this purpose.





1.3 Acronyms and Abbreviations

CRUD: Create, Read, Update, Delete

API: Application Programming Interface

UI: User Interface

UX: User Experience

SRS: Software Requirements Specification

SPA: Single-Page Application

SCSS: Sassy Cascading Style Sheets

CSV: Comma-Separated Values

2. Overall Description

2.1 Product Perspective
This system is a front-end module intended for an admin dashboard. It will function as a client to a back-end REST API, handling all user-facing interactions and data manipulation on the front end.

2.2 Product Functions
The primary functions of the User Management System are:


View a list of users with support for searching and pagination.



Create a new user using a validated form.




Update an existing user's information using the same form.




Delete a user with a confirmation step.



Provide clear user feedback during and after operations.

2.3 User Characteristics
The target user is an administrator or manager who needs to manage user accounts within the system. They are expected to be familiar with basic web application interactions.

2.4 Design and Implementation Constraints


Framework: The application must be built using Angular version 15 or higher.


Forms: All forms must be implemented using Angular's Reactive Forms module.


API: A dummy JSON server, a public API (e.g., reqres.in), or @angular-in-memory-web-api must be used for the REST API.


Component Architecture: The application must have a modular design.


Navigation: Navigation between pages must be handled by the Angular Router.


Styling: The UI can be styled using Angular Material, Bootstrap, Tailwind, PrimeNG, KendoUI, or custom SCSS.


Development Timeframe: The allotted time for development is 8 hours.

3. System Features

3.1 User List Page


FR-1: The system shall fetch a list of users from a REST API and display them in a table or grid format.


FR-2: The user list shall display the following columns: Name, Email, Phone, Role, and Status (Active/Inactive).


FR-3: An "Actions" column shall be present with options to "Edit" and "Delete" each user.


FR-4: The page must include a search input field to filter the user list by either Name or Email.


FR-5: Pagination must be implemented for the user list.

3.2 Add/Edit User Modal


FR-6: A single reactive form, presented in a modal, shall be used for both adding and editing users.



FR-7: The form must disable its submit button until all validation rules are met.

FR-8: The form shall contain the following fields with corresponding validation:


Name: This field is mandatory and requires a minimum of 3 characters.


Email: This field is mandatory and must be a valid email format.


Phone: This field is optional but must adhere to a pattern if a value is provided.


Role: This must be a dropdown menu with options: "Admin", "Manager", and "User".


Status: This must be a toggle switch for "Active" or "Inactive" status.


FR-9: The system shall highlight invalid form fields and display clear error messages.


3.3 Delete Confirmation


FR-10: Before deleting a user, the system must display a confirmation dialog to the administrator.


FR-11: If the administrator confirms the deletion, the system shall call the delete API endpoint and subsequently refresh the user list.


3.4 User Feedback and Experience (UX)


FR-12: The system must display loading spinners or similar indicators while API calls are in progress.


FR-13: Upon successful completion of Add, Edit, or Delete actions, the system shall display a confirmation message using a snackbar or toast notification.

3.5 Application Layout


FR-14: The application must include a persistent header and footer.


FR-15: The header must contain a basic navigation menu with links for "Home" and "Users".

3.6 Bonus Features (Optional)


FR-16: Implement column-based sorting on the user list page.


FR-17: Implement additional filters for Role and/or Status on the user list page.


FR-18: Provide functionality to export the current user list as a CSV file.

4. Submission Requirements


SR-1: The final code must be shared via a GitHub/GitLab repository or as a ZIP file.


SR-2: A README.md file must be included in the submission.

SR-3: The README.md file must contain:

- **Deployment Link:** https://stackblitz.com/~/github.com/hirensojitra/User-Management

- **Time Taken:** 5 Hours

- **Setup Instructions:**
  1. Clone the repository: `git clone https://github.com/hirensojitra/User-Management.git`
  2. Navigate to the project directory: `cd User-Management`
  3. Install dependencies: `npm install`
  4. Run the application: `ng serve`
  5. Open your browser and navigate to `http://localhost:4200/`

- **APIs Used:**
  - `@angular-in-memory-web-api`: Used to simulate a backend REST API for user data (CRUD operations).

Development Task List
Here is a relevant task list to build the User Management System, broken down into logical phases.

Phase 1: Project Setup & Initial Configuration (Est. 1 hour)

[ ] Task 1.1: Initialize a new Angular (v15+) project using the Angular CLI.

[ ] 

Task 1.2: Choose and set up a styling framework (e.g., ng add @angular/material).

[ ] Task 1.3: Create a modular structure: Generate a UserModule for all user-related components.

[ ] 

Task 1.4: Configure the AppRoutingModule for basic navigation between a HomePage and the UserListPage.

[ ] 

Task 1.5: Implement the main application layout with a header, footer, and a <router-outlet>.

[ ] 

Task 1.6: Set up the dummy API service (e.g., configure angular-in-memory-web-api or select a public API like reqres.in).

Phase 2: User List (Read) Implementation (Est. 2 hours)

[ ] Task 2.1: Create a UserService to handle all HTTP requests to the API.

[ ] Task 2.2: Implement the getUsers() method in UserService.

[ ] Task 2.3: Create the UserListComponent.

[ ] 

Task 2.4: In UserListComponent, call UserService to fetch and display the list of users in a data table.

[ ] 

Task 2.5: Style the table to include all required columns: Name, Email, Phone, Role, Status, Actions.

[ ] 

Task 2.6: Implement a search input that filters the list based on name or email.

[ ] 

Task 2.7: Add pagination controls to the table.

[ ] 

Task 2.8: Implement loading spinners that are active during the API call.

Phase 3: Add/Edit/Delete (Create, Update, Delete) Functionality (Est. 3 hours)

[ ] Task 3.1: Create the AddEditUser modal/dialog component.

[ ] 

Task 3.2: Build the user form inside this component using Reactive Forms.

[ ] 

Task 3.3: Add all form fields: Name, Email, Phone, Role (dropdown), and Status (toggle).

[ ] 

Task 3.4: Implement all specified field validations and display user-friendly error messages for invalid fields.


[ ] 

Task 3.5: Implement the logic to open the modal for either "Add New User" or "Edit User", populating the form with user data in the case of an edit.

[ ] Task 3.6: Create createUser() and updateUser() methods in UserService.

[ ] Task 3.7: Connect the form submission to the appropriate UserService method. Disable the submit button until the form is valid.

[ ] 

Task 3.8: Create the DeleteConfirmation dialog component.

[ ] Task 3.9: Implement the deleteUser() method in UserService.

[ ] Task 3.10: Wire the "Delete" button to open the confirmation dialog. On confirmation, call the service, refresh the user list, and show a toast notification.


Phase 4: Bonus Features & UX Polish (Est. 1.5 hours)

[ ] 

Task 4.1: Show success toast/snackbar notifications for Add and Edit actions.

[ ] 

Task 4.2 (Bonus): Add sorting capabilities to the user table's columns.

[ ] 

Task 4.3 (Bonus): Add dropdowns to filter the list by Role and/or Status.

[ ] 

Task 4.4 (Bonus): Implement a button and logic to export the user list to a CSV file.

[ ] Task 4.5: Perform a final review of the application for responsiveness and UX consistency.

Phase 5: Documentation & Submission (Est. 0.5 hours)

[ ] Task 5.1: Create and populate the README.md file.

[ ] 

Task 5.2: Write clear setup and run instructions.

[ ] 

Task 5.3: Document the API endpoints used.

[ ] 
