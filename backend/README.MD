## Api Documentation
ENDPOINTS
POST '/tasks'
POST '/resources'
POST '/assign_resource/<string: task_id>'
PATCH '/tasks/<string: id>'
PATCH '/resources/<string: resource_id>'
DELETE '/assign_resource/<string: task_id>'POST '/tasks'
GET '/tasks'
GET '/resources'
GET '/report'
GET '/report_task'
GET '/report_project'

### Endpoint Details

POST '/tasks'
- Creates a new task
- Request Arguments: name, duration, start, finish
- Returns: the created task
Request: http://127.0.0.1:5000/tasks
Body:
{
    "name": "Problem1",
    "duration": 5,
    "start": "10/11/2020",
    "finish": "14/11/2020"
}
Response:
{
    "success": true,
    "task": {
        "duration": 5,
        "finish": "Sat, 14 Nov 2020 00:00:00 GMT",
        "id": "Problem1_ZfPcL",
        "name": "Problem1",
        "start": "Tue, 10 Nov 2020 00:00:00 GMT"
    }
}

POST '/resources'
- Creates a new resource
- Request Arguments: name, type, max, rate
- Returns: the created resource
Request: http://127.0.0.1:5000/resources
Body:
{
    "name": "Project1",
    "type": "Work",
    "max": 100,
    "rate": 15
}
Response:
{
    "resource": {
        "max": 100.0,
        "name": "Project1",
        "rate": 15.0,
        "type": "Work"
    },
    "success": true
}

POST '/assign_resource/<string: task_id>'
- Assign a resource to the given task
- Request Arguments: task_id, resource_id
Request: http://127.0.0.1:5000/assign_resource/Problem2_ZfPcL
Body:
{
    "resource_id": "Project2_JPXGc"
}
Response:
{
    "success": true
}

PATCH '/tasks/<string: id>'
- modifies the given task
- Request Arguments: id, name, duration, start, finish
- Returns: the modified task
Request: http://127.0.0.1:5000/tasks/Problem2_ZfPcL
Body:
{
    "name": "Problem1_modified",
    "duration": 5,
    "start": "10/11/2020",
    "finish": "14/11/2020"
}
Response:
{
    "success": true,
    "task": {
        "duration": 5,
        "finish": "Sat, 14 Nov 2020 00:00:00 GMT",
        "id": "Problem1_ZfPcL",
        "name": "Problem1_modified",
        "start": "Tue, 10 Nov 2020 00:00:00 GMT"
    }
}

PATCH '/resources/<string: resource_id>'
- modifies the given resource
- Request Arguments: id, name, type, max, rate
- Returns: the modified resource
Request: http://127.0.0.1:5000/resources/Project1_UjQ9z
Body:
{
    "name": "Project1",
    "type": "Work",
    "max": 100,
    "rate": 15
}
Response:
{
    "resource": {
        "id": "Project1_UjQ9z",
        "max": 100.0,
        "name": "Project1",
        "rate": 15.0,
        "type": "Work"
    },
    "success": true
}

DELETE '/assign_resource/<string: task_id>'
- deletes a resource from a task
- Request Arguments: task_id, resource_id
Request: http://127.0.0.1:5000/assign_resource/Problem2_ZfPcL?resource_id=Project2_JPXGc
Body:
{
    "resource_id": "Project2_JPXGc"
}
Response:
{
    "success": true
}

GET '/tasks'
- returns all tasks

Request: http://127.0.0.1:5000/tasks

Response:
{
    "success": true,
    "tasks": [
        {
            "duration": 4,
            "finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "id": "Problem_V3aU6",
            "name": "Problem",
            "start": "Tue, 10 Nov 2020 00:00:00 GMT"
        },
        {
            "duration": 4,
            "finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "id": "Problem2_ZfPcL",
            "name": "Problem2",
            "start": "Tue, 10 Nov 2020 00:00:00 GMT"
        }
    ]
}

GET '/resources'
- returns all resources

Request: http://127.0.0.1:5000/resources

Response:
{
    "resources": [
        {
            "id": "Project2_JPXGc",
            "max": 100.0,
            "name": "Project2",
            "rate": 12.0,
            "type": "Work"
        },
        {
            "id": "Project1_GBAAi",
            "max": 100.0,
            "name": "Project1",
            "rate": 15.0,
            "type": "Work"
        }
    ],
    "success": true
}

GET '/report'
- returns all tasks and the assigned resources
Request: http://127.0.0.1:5000/report

Response:
{
    "report": [
        {
            "duration": 4,
            "finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "id": "Problem_V3aU6",
            "name": "Problem",
            "resources": [
                "Project1",
                "Project2"
            ],
            "start": "Tue, 10 Nov 2020 00:00:00 GMT"
        },
        {
            "duration": 4,
            "finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "id": "Problem2_ZfPcL",
            "name": "Problem2",
            "resources": [],
            "start": "Tue, 10 Nov 2020 00:00:00 GMT"
        }
    ],
    "success": true
}

GET '/report_task'
- returns all tasks, the assigned resources, and the total cost for each task
Request: http://127.0.0.1:5000/report_task 

Response:
{
    "report": [
        {
            "resources": [
                "Project1",
                "Project2"
            ],
            "task_duration": 4,
            "task_finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "task_name": "Problem",
            "task_start": "Tue, 10 Nov 2020 00:00:00 GMT",
            "total_cost": 864.0
        }
    ],
    "success": true
}

GET '/report_project'
- returns all tasks, the assigned resources, the total cost for each task, and the total project cost
Request: http://127.0.0.1:5000/report_project 
{
    "project_total_cost": 864.0,
    "report": [
        {
            "resources": [
                "Project1",
                "Project2"
            ],
            "task_duration": 4,
            "task_finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "task_name": "Problem",
            "task_start": "Tue, 10 Nov 2020 00:00:00 GMT",
            "total_cost": 864.0
        },
        {
            "resources": [],
            "task_duration": 4,
            "task_finish": "Sat, 14 Nov 2020 00:00:00 GMT",
            "task_name": "Problem",
            "task_start": "Tue, 10 Nov 2020 00:00:00 GMT",
            "total_cost": 0
        }
    ],
    "success": true
}

