# JotIt Api

CRUD application for creating notes.

## Prerequisites
To run this project on your desktop, you need nodejs installed, install nodemon node package globally `npm install -g nodemon` and mongoDB database server installed.

## Installation

* Start mongo database server
* Create a .env file in project root directory, add configuration environment variables.
* Run `npm i` which will install all the required dependencies

## Usage

* Run in production environment `npm start`
* Run in development environment `npm dev`

***
## API Specification  
* **Create user**  
    Create new user
    * **URL**  
        /users
    * **Method**  
        POST
    * **URL Params**  
        **Optional**  
        login=[true]  
    * **Request Payload data type:** json  
    * **Request Payload**  
        ***
        **Parameter Name:** name  
        **Field Specification:** required  
        **Description:** This is the name of the user which is going to register. Name must be atleast 5 charactors. Name must be less than or equal to 8 charactor  
        **Sample Value:**  John Doe  
        ***
        **Parameter Name:** email  
        **Field Specification:** required  
        **Description:** This is the email address of the user which is going to register  
        **Sample Value:**  johndoe@gmail.com  
        ***
        **Parameter Name:** age  
        **Field Specification:** required  
        **Description:** This is the age of the user which is going to register. Age must be greater than 12 and less than or equal to 100  
        **Sample Value:**  20  
        ***
        **Parameter Name:** gender  
        **Field Specification:** required  
        **Description:** This is the gender of the user which is going to register. Gender must be male or female    
        **Sample Value:**  male  
        ***
        **Parameter Name:** username  
        **Field Specification:** required  
        **Description:** This is the username of the user which will be used for login. Username must be atleast 5 charactors and must be less than or equal to 20 charactors, A Username can contain alphanumeric charactors(letters A-Z, letters a-z, numbers 0-9)      
        **Sample Value:**  johndoe96234  
        ***
        **Parameter Name:** password  
        **Field Specification:** required  
        **Description:** This is the password of the user which will be used for login. Password must be greater than 8 charactors and must be less than or equal to 20 charactors, A Password can contain alphanumeric charactors(letters A-Z, letters a-z, numbers 0-9), Special charactors **(** @!#$^&*\())[] **)**. A Password must contain atleast one uppercase letter, one number, one special charactor.  
        **Sample Value:**  Password*834593  
        ***
        **Sample Payload**  
        ```json
        {
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "age": 22,
            "gender": "male",
            "username": "johndoe",
            "password": "Johndoe1111!"
        }
        ```
    * **Response Payload**      
        ***
        **Parameter Name:** data.user.name  
        **Field Specification:** mandatory  
        **Description:** This is the name of the user  
        **Sample Value:**  John Doe  
        ***
        **Parameter Name:** data.user.email  
        **Field Specification:** mandatory  
        **Description:** This is the email of the user  
        **Sample Value:**  johndoe@gmail.com  
        ***
        **Parameter Name:** data.user.age  
        **Field Specification:** mandatory  
        **Description:** This is the age of the user  
        **Sample Value:**  22  
        ***
        **Parameter Name:** data.user.gender  
        **Field Specification:** mandatory  
        **Description:** This is the gender of the user  
        **Sample Value:**  male  
        *** 
        **Parameter Name:** data.user.username  
        **Field Specification:** mandatory  
        **Description:** This is the username of the user  
        **Sample Value:**  johndoe  
        ***
        **Parameter Name:** data.user.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp of the user  
        **Sample Value:**   2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the updated timestamp of the user  
        **Sample Value:**  2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.id  
        **Field Specification:** mandatory  
        **Description:** This is the unique id of the user  
        **Sample Value:**  5d90c694e313632332c02767  
        ***
        **Parameter Name:** data.token  
        **Field Specification:** not mandatory  
        **Description:** This field is only if login = true parameter is passed in the query string    
        **Sample Value:**  eyJhbGciOiJIUzI1NiIsInR5cCCJ9.eyJpZCI6IjVODg3YsjrkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oQA-lZuC6C-_7f1ko8iFjH8osS7I4Nmg  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "user": {
                    "name": "John Doe",
                    "email": "johndoe@gmail.com",
                    "age": 22,
                    "gender": "male",
                    "username": "johndoe",
                    "createdAt": "2019-09-30T07:02:31.345Z",
                    "updatedAt": "2019-09-30T07:02:31.411Z",
                    "id": "5d91a887b928b46562fd9f24"
                },
                "token": "eyJhbGciOiJIUzI1NiIR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTghddFhODg3YjkyO4GJmMWM4MmrZkOWYghjghjIsImlhdCI6MTU2OTgyNjk1MX0.qhqOSgzP5VGVs0-MPw83f0hKDg0GoorXgjZyn19mpjA"
            }
        }       
        ```
    * **Notes**  
    To create user and login add login = true on URL params
***    
* **Login user**  
    Login registered user
    * **URL**  
        /auth/login
    * **Method**  
        POST
    * **URL Params**  
    * **Request Payload data type:** json  
    * **Request Payload**  
        ***
        **Parameter Name:** username  
        **Field Specification:** required  
        **Description:** Username of the registered user  
        **Sample Value:**  johndoe  
        ***
        **Parameter Name:** password  
        **Field Specification:** required  
        **Description:** Password of the registered user  
        **Sample Value:**  Johndoe1111! 
        ***
        **Sample Payload**  
        ```json
        {
            "username": "johndoe",
            "password": "Johndoe1111!"
        }
        ```
    * **Response Payload**      
        ***
        **Parameter Name:** data.user.name  
        **Field Specification:** mandatory  
        **Description:** This is the name of the user  
        **Sample Value:**  John Doe  
        ***
        **Parameter Name:** data.user.email  
        **Field Specification:** mandatory  
        **Description:** This is the email of the user  
        **Sample Value:**  johndoe@gmail.com  
        ***
        **Parameter Name:** data.user.age  
        **Field Specification:** mandatory  
        **Description:** This is the age of the user  
        **Sample Value:**  22  
        ***
        **Parameter Name:** data.user.gender  
        **Field Specification:** mandatory  
        **Description:** This is the gender of the user  
        **Sample Value:**  male  
        *** 
        **Parameter Name:** data.user.username  
        **Field Specification:** mandatory  
        **Description:** This is the username of the user  
        **Sample Value:**  johndoe  
        ***
        **Parameter Name:** data.user.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp of the user  
        **Sample Value:**   2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the updated timestamp of the user  
        **Sample Value:**  2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.id  
        **Field Specification:** mandatory  
        **Description:** This is the unique id of the user  
        **Sample Value:**  5d90c694e3136354t456332c02767  
        ***
        **Parameter Name:** data.token  
        **Field Specification:** mandatory  
        **Description:** This is the token for accessing the protected routes      
        **Sample Value:**  eyJhbGciOiJIUzI1NiIsInR5cCCJ9.eyJpZCI6IjVODg3YsjrkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oQA-lZuC6C-_7f1ko8iFjH8osS7I4Nmg  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "user": {
                    "name": "John Doe",
                    "email": "johndoe@gmail.com",
                    "age": 22,
                    "gender": "male",
                    "username": "johndoe",
                    "createdAt": "2019-09-30T07:02:31.345Z",
                    "updatedAt": "2019-09-30T07:02:31.411Z",
                    "id": "5d91a887b928bf1c82fd9f24"
                },
                "token": "eyJhbGciOiJIUzI1NiIsI5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYIsImlhdCI6MTU2OTgyNjk1MX0.qhqOSgzP5VGVs0-MPw83f0hKDg0GoXgjZyn19mpjA"
            }
        }       
        ```
    * **Notes**  
* **Get logged in user data**  
    Login registered user
    * **URL**  
        /users
    * **Method**  
        GET
    * **URL Params**  
    * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Response Payload**      
        ***
        **Parameter Name:** data.user.name  
        **Field Specification:** mandatory  
        **Description:** This is the name of the user  
        **Sample Value:**  John Doe  
        ***
        **Parameter Name:** data.user.email  
        **Field Specification:** mandatory  
        **Description:** This is the email of the user  
        **Sample Value:**  johndoe@gmail.com  
        ***
        **Parameter Name:** data.user.age  
        **Field Specification:** mandatory  
        **Description:** This is the age of the user  
        **Sample Value:**  22  
        ***
        **Parameter Name:** data.user.gender  
        **Field Specification:** mandatory  
        **Description:** This is the gender of the user  
        **Sample Value:**  male  
        *** 
        **Parameter Name:** data.user.username  
        **Field Specification:** mandatory  
        **Description:** This is the username of the user  
        **Sample Value:**  johndoe  
        ***
        **Parameter Name:** data.user.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp of the user  
        **Sample Value:**   2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the updated timestamp of the user  
        **Sample Value:**  2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.id  
        **Field Specification:** mandatory  
        **Description:** This is the unique id of the user  
        **Sample Value:**  5d90c694e3136354t456332c02767  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "user": {
                    "name": "John Doe",
                    "email": "johndoe@gmail.com",
                    "age": 22,
                    "gender": "male",
                    "username": "johndoe",
                    "createdAt": "2019-09-30T07:02:31.345Z",
                    "updatedAt": "2019-09-30T07:02:31.411Z",
                    "id": "5d91a887b928bf1c82fd9f24"
                }
            }
        }       
        ```
    * **Notes**      
* **Update logged in user data**  
    Update logged in user data
    * **URL**  
        /users
    * **Method**  
        PUT
    * **URL Params**  
    * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Request Payload data type:** json  
    * **Request Payload**  
        ***
        **Parameter Name:** name  
        **Field Specification:** required  
        **Description:** This is the name of the user which is going to register. Name must be atleast 5 charactors. Name must be less than or equal to 8 charactor  
        **Sample Value:**  John Doe  
        ***
        **Parameter Name:** email  
        **Field Specification:** required  
        **Description:** This is the email address of the user which is going to register  
        **Sample Value:**  johndoe@gmail.com  
        ***
        **Parameter Name:** age  
        **Field Specification:** required  
        **Description:** This is the age of the user which is going to register. Age must be greater than 12 and less than or equal to 100  
        **Sample Value:**  20  
        ***
        **Parameter Name:** gender  
        **Field Specification:** required  
        **Description:** This is the gender of the user which is going to register. Gender must be male or female    
        **Sample Value:**  male  
        ***
        **Sample Payload**  
        ```json
        {
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "age": 22,
            "gender": "male"
        }
        ```
    * **Response Payload**      
        ***
        **Parameter Name:** data.user.name  
        **Field Specification:** mandatory  
        **Description:** This is the name of the user  
        **Sample Value:**  John Doe  
        ***
        **Parameter Name:** data.user.email  
        **Field Specification:** mandatory  
        **Description:** This is the email of the user  
        **Sample Value:**  johndoe@gmail.com  
        ***
        **Parameter Name:** data.user.age  
        **Field Specification:** mandatory  
        **Description:** This is the age of the user  
        **Sample Value:**  22  
        ***
        **Parameter Name:** data.user.gender  
        **Field Specification:** mandatory  
        **Description:** This is the gender of the user  
        **Sample Value:**  male  
        *** 
        **Parameter Name:** data.user.username  
        **Field Specification:** mandatory  
        **Description:** This is the username of the user  
        **Sample Value:**  johndoe  
        ***
        **Parameter Name:** data.user.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp of the user  
        **Sample Value:**   2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the updated timestamp of the user  
        **Sample Value:**  2019-09-29T14:58:28.666Z  
        ***
        **Parameter Name:** data.user.id  
        **Field Specification:** mandatory  
        **Description:** This is the unique id of the user  
        **Sample Value:**  5d90c694e313632332c02767  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "user": {
                    "name": "John Doe",
                    "email": "johndoe@gmail.com",
                    "age": 22,
                    "gender": "male",
                    "username": "johndoe",
                    "createdAt": "2019-09-30T07:02:31.345Z",
                    "updatedAt": "2019-09-30T07:02:31.411Z",
                    "id": "5d91a887b928b46562fd9f24"
                }
            }
        }       
        ```
    * **Notes**  
***    
* **Logout user**  
    Logout user
    * **URL**  
        /auth/logout
    * **Method**  
        GET
    * **URL Params**  
    * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Response Payload**      
        null
    * **Notes**  
        Logout user for the current token
***    
* **Logout all user**  
    Logout all user
    * **URL**  
        /auth/logout-all
    * **Method**  
        GET
    * **URL Params**  
    * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Response Payload**      
        null
    * **Notes**  
        Logout all users, invalidate all tokens
*** 
* **Delete logged in user account**  
    Delete user account
    * **URL**  
        users/me
    * **Method**  
        DELETE
    * **URL Params**  
    * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Response Payload**      
        null
***
* **Create note**  
    Create note
    * **URL**  
        /notes
    * **Method**  
        POST
    * **URL Params**  
        * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Request Payload data type:** json  
    * **Request Payload**  
        ***
        **Parameter Name:** description  
        **Field Specification:** required  
        **Description:** Description for the note. Decription must be atleast 5 characters length and maximum 500 characters length.  
        **Sample Value:**  John Doe  
        ***
        **Sample Payload**  
        ```json
        {
	        "description": "Hello world"
        }
        ```
    * **Response Payload**      
        ***
        **Parameter Name:** data.note.description  
        **Field Specification:** mandatory  
        **Description:** This is the description of note  
        **Sample Value:**  Hello world  
        ***
        **Parameter Name:** data.note.userId  
        **Field Specification:** mandatory  
        **Description:** This is the userId of user which created this note  
        **Sample Value:**  5d9223see23dc15185fb6299fs  
        ***
        **Parameter Name:** data.note.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the note updated timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.id  
        **Field Specification:** mandatory  
        **Description:** This is the id of the note  
        **Sample Value:**  7223see23dc15sd234f5fb6234fs  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "note": {
                    "description": "Hello world",
                    "userId": "5d92168deefd15185fb6299c",
                    "createdAt": "2019-09-30T15:03:42.269Z",
                    "updatedAt": "2019-09-30T15:03:42.269Z",
                    "id": "5d92194eeefd15185fb6299e"
                }
            }
        }       
        ```
    * **Notes**  
*** 
* **Get all notes**  
    Get all notes
    * **URL**  
        /notes
    * **Method**  
        GET
    * **URL Params**  
    * **Request header**
    ***
    **Parameter Name:** Authorization  
    **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
    ***
    * **Response Payload**      
        ***
        **Parameter Name:** data.note.[].description  
        **Field Specification:** mandatory  
        **Description:** This is the description of note  
        **Sample Value:**  Hello world  
        ***
        **Parameter Name:** data.note.[].userId  
        **Field Specification:** mandatory  
        **Description:** This is the userId of user which created this note  
        **Sample Value:**  5d9223see23dc15185fb6299fs  
        ***
        **Parameter Name:** data.note.[].createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.[].updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the note updated timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.[].id  
        **Field Specification:** mandatory  
        **Description:** This is the id of the note  
        **Sample Value:**  7223see23dc15sd234f5fb6234fs  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "notes": [
                    {
                        "description": "Hello world",
                        "userId": "5d92168deefd15185fb6299c",
                        "createdAt": "2019-09-30T15:03:42.269Z",
                        "updatedAt": "2019-09-30T15:03:42.269Z",
                        "id": "5d92194eeefd15185fb6299e"
                    }
                ]
            }
        }       
        ```
    * **Notes**  
*** 
* **Get note by id**  
    Get note by id
    * **URL**  
        /notes/{id}
        **Sample url:** /notes/41s5s9c678307a1425ab51dd23d  
        **note:** id in the url is the unique id of the note  
    * **Method**  
        GET
    * **URL Params**  
    * **Request header**
    ***
    **Parameter Name:** Authorization  
    **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
    ***
    * **Response Payload**      
        ***
        **Parameter Name:** data.note.description  
        **Field Specification:** mandatory  
        **Description:** This is the description of note  
        **Sample Value:**  Hello world  
        ***
        **Parameter Name:** data.note.userId  
        **Field Specification:** mandatory  
        **Description:** This is the userId of user which created this note  
        **Sample Value:**  5d9223see23dc15185fb6299fs  
        ***
        **Parameter Name:** data.note.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the note updated timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.id  
        **Field Specification:** mandatory  
        **Description:** This is the id of the note  
        **Sample Value:**  7223see23dc15sd234f5fb6234fs  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "note": {
                    "description": "Hello world",
                    "userId": "5d92168deefd15185fb6299c",
                    "createdAt": "2019-09-30T15:03:42.269Z",
                    "updatedAt": "2019-09-30T15:03:42.269Z",
                    "id": "5d92194eeefd12s62n2hfb6299f"
                }
            }
        }       
        ```
    * **Notes**  
***
* **Update note by id**  
    Create note
    * **URL**  
        /notes/{id}
        **Sample url:** /notes/41s5s9c678307a1425ab51dd23d  
        **note:** id in the url is the unique id of the note  s
    * **Method**  
        PUT
    * **URL Params**  
        * **Request header**
        ***
        **Parameter Name:** Authorization  
        **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
        ***
    * **Request Payload data type:** json  
    * **Request Payload**  
        ***
        **Parameter Name:** description  
        **Field Specification:** required  
        **Description:** Description for the note. Decription must be atleast 5 characters length and maximum 500 characters length.  
        **Sample Value:**  John Doe  
        ***
        **Sample Payload**  
        ```json
        {
	        "description": "Hello world"
        }
        ```
    * **Response Payload**      
        ***
        **Parameter Name:** data.note.description  
        **Field Specification:** mandatory  
        **Description:** This is the description of note  
        **Sample Value:**  Hello world  
        ***
        **Parameter Name:** data.note.userId  
        **Field Specification:** mandatory  
        **Description:** This is the userId of user which created this note  
        **Sample Value:**  5d9223see23dc15185fb6299fs  
        ***
        **Parameter Name:** data.note.createdAt  
        **Field Specification:** mandatory  
        **Description:** This is the created timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.updatedAt  
        **Field Specification:** mandatory  
        **Description:** This is the note updated timestamp  
        **Sample Value:**  2019-09-30T15:03:42.269Z  
        ***
        **Parameter Name:** data.note.id  
        **Field Specification:** mandatory  
        **Description:** This is the id of the note  
        **Sample Value:**  7223see23dc15sd234f5fb6234fs  
        ***
    * **Success Response**  
        **Data type:**  json  
        ```json
        {
            "data": {
                "note": {
                    "description": "Hello world",
                    "userId": "5d92168deefd15185fb6299c",
                    "createdAt": "2019-09-30T15:03:42.269Z",
                    "updatedAt": "2019-09-30T15:03:42.269Z",
                    "id": "5d92194eeefd15185fb6299e"
                }
            }
        }       
        ```
    * **Notes**  
*** 
* **Delete note by id**  
    Delete note by id
    * **URL**  
        /notes/{id}
        **Sample url:** /notes/41s5s9c678307a1425ab51dd23d  
        **note:** id in the url is the unique id of the note  
    * **Method**  
        GET
    * **URL Params**  
    * **Request header**
    ***
    **Parameter Name:** Authorization  
    **Sample Value:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTFhODg3YjkyOGJmMWM4MmZkOWYyNCIsImlhdCI6MTU2OTgyNzk1M30.s1fX9i1oiS_QA-lZuC6C-_7f1ko8iFjH8osSU7I4Nmg  
    ***
    * **Response Payload**      
       null 
    * **Success Response**  
       null 
    * **Notes**  
***
## Author
**[Maneksh M S](http://manekshms.com) - [manekshms@gmail.com](mailto:manekshms@gmail.com)**