URL = http://13.233.133.207
Login

Endpoint: /auth/login
HTTP Method : POST
body: 
{
    "email": "Programming2hars@gmail.com",
    "password": "12345"
}

Response - {
    "status": 200,
    "message": "OTP Send Successfully!!"
}


REGISTER

Endpoint: /auth/register
HTTP Method : POST
body: {
    "fullname": "test",
    "email": "test@test.com",
    "password": "12345"
}

Response : {
    "status": 200,
    "message": "Register Succesfully.",
    "data": {
        "fullname": "test",
        "email": "Programming1hars@gmail.com",
        "password": "$2b$15$yABNjzGiaZc8t.239QkM/ORbznfPwx1iGTr5E4ab0xB6m0rMOz34m",
        "_id": "63f3cedefe391f7127c89029",
        "createdAt": "2023-02-20T19:49:50.581Z",
        "updatedAt": "2023-02-20T19:49:50.581Z",
        "__v": 0
    }
}


VERIFY-OTP

Endpoint: /auth/verify-otp
HTTP Method: POST
body: {
    "email": "Programming2hars@gmail.com",
    "otp": "018225"
}

Response: {
    "status": 200,
    "message": "Otp Verified Successfully!!"
}


All Task

Endpoint: /task/allTask?page=1&limit=1
HTTP Method: GET
Query: page , limit

Response: {
    "status": 200,
    "data": {
        "next": {
            "page": 2,
            "limit": 1
        },
        "results": [
            {
                "_id": "63f3b6abfe391f7127c89021",
                "task": "test report3",
                "date": "2023-02-20T00:00:00.000Z",
                "userId": "63ec9f42af803235cb6d50f6",
                "status": "Incomplete",
                "createdAt": "2023-02-20T18:06:35.587Z",
                "updatedAt": "2023-02-20T18:06:35.587Z",
                "__v": 0
            }
        ]
    }
}


CREATE TASK

ENDPOINT: /task/create
HTTP Method: POST
Body: {
    "task": "test report3",
    "date": "2023-02-20",
    "status": "Incomplete"
}

Response: {
    "status": 200,
    "message": "Task Created Successfully",
    "data": {
        "task": "test report3",
        "date": "2023-02-20T00:00:00.000Z",
        "userId": "63ec9f42af803235cb6d50f6",
        "status": "Incomplete",
        "_id": "63f3b6abfe391f7127c89021",
        "createdAt": "2023-02-20T18:06:35.587Z",
        "updatedAt": "2023-02-20T18:06:35.587Z",
        "__v": 0
    }
}


Update Sequence

Endpoint: /task/updateSequence
HTTP Method: POST
BODY : { 
    "taskIds":[
    "63f3b6a8fe391f7127c8901d", 
        "63f3b6abfe391f7127c89021"
        ]
}

Response: {
    "message": "Tasks sorted successfully",
    "data": [
        {
            "_id": "63f3b6a8fe391f7127c8901d",
            "task": "test report3",
            "date": "2023-02-20T00:00:00.000Z",
            "userId": "63ec9f42af803235cb6d50f6",
            "status": "Incomplete",
            "createdAt": "2023-02-20T18:06:32.554Z",
            "updatedAt": "2023-02-20T18:06:32.554Z",
            "__v": 0
        },
        {
            "_id": "63f3b6abfe391f7127c89021",
            "task": "test report3",
            "date": "2023-02-20T00:00:00.000Z",
            "userId": "63ec9f42af803235cb6d50f6",
            "status": "Incomplete",
            "createdAt": "2023-02-20T18:06:35.587Z",
            "updatedAt": "2023-02-20T18:06:35.587Z",
            "__v": 0
        }
    ]
}


LOGOUT

ENDPOINT: /auth/logout
HTTP Method: GET

Response: {
    "status": 200,
    "message": "Logout Successfully!!"
}


TASKBYID

ENDPOINT: /task/63f3b6a8fe391f7127c8901d
HTTP Method: GET
Params: id

Response: {
    "status": 200,
    "data": {
        "id": "63f3b6a8fe391f7127c8901d",
        "task": "test report3",
        "date": "2023-02-20",
        "status": "Incomplete"
    }
}


UPDATE TASK

ENDPOINT: /task/update/63f3b6a8fe391f7127c8901d
HTTP Method: PATCH
Params: id
Body: {
    "task": "atest updated",
    "date": "2023-05-23",
    "status": "Complete"
}


Response: {
    "status": 200,
    "message": "Task Updated Successfully",
    "data": {
        "id": "63f3b6a8fe391f7127c8901d",
        "task": "atest updated",
        "date": "2023-05-23",
        "status": "Complete"
    }
}


DELETE TASK

ENDPOINT: /task/delete/63eb99228ed271f0810ab608
HTTP Method: DELETE
Params: id

Response: {
    "status": 200,
    "message": "Task Deleted Successfully",
    "data": {
        "_id": "63f3b6abfe391f7127c89021",
        "task": "test report3",
        "date": "2023-02-20T00:00:00.000Z",
        "userId": "63ec9f42af803235cb6d50f6",
        "status": "Incomplete",
        "createdAt": "2023-02-20T18:06:35.587Z",
        "updatedAt": "2023-02-20T18:06:35.587Z",
        "__v": 0
    }
}




