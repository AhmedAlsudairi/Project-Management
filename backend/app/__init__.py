from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)

app.config.from_object('config')

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET, POST, DELETE, OPTIONS, PATCH')
    response.headers.add('Access-Control-Allow-Origin',
                         '*')
    return response

from flask import Flask, request, abort, jsonify
from app.models import Task, Resource, Tasks_Resources

@app.route('/tasks', methods=['POST'])
def create_task():
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'name' not in body or 'duration' not in body or 'start' not in body or 'finish' not in body:
        return abort(422)

    name = body.get('name')
    duration = body.get('duration')
    start = body.get('start')
    finish = body.get('finish')

    task = Task(name, duration, start, finish)
    task.insert()

    return jsonify({
        'success': True,
        'task': task.format()
    })

@app.route('/resources', methods=['POST'])
def create_resource():
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'name' not in body or 'type' not in body or 'max' not in body or 'rate' not in body:
        return abort(422)

    name = body.get('name')
    type = body.get('type')
    max = body.get('max')
    rate = body.get('rate')

    resource = Resource(name, type, max, rate)
    resource.insert()

    return jsonify({
        'success': True,
        'resource': resource.format()
    })

@app.route('/assign_resource', methods=['POST'])
def assign_resource():
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'task_id' not in body or 'resources' not in body:
        abort(422)

    task_id = body.get('task_id')
    resources = body.get('resources')
    if isinstance(resources, list):
        for resource in resources:
            tasks_resources = Tasks_Resources(task_id, resource, None)
            tasks_resources.insert()
    else:
        abort(422)

    return jsonify({
        'success': True,
    })

@app.route('/tasks/<int:id>', methods=['PATCH'])
def modify_task(id):
    if id is None:
        abort(422)

    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'name' not in body or 'duration' not in body or 'start' not in body or 'finish' not in body:
        return abort(422)


    name = body.get('name')
    duration = body.get('duration')
    start = body.get('start')
    finish = body.get('finish')

    task = Task.query.get(id)
    if task is None:
        abort(404)
    task.name = name
    task.duration = duration
    task.start = start
    task.finsih = finish

    task.update()

    return jsonify({
        'success': True,
        'task': task.format()
    })

@app.route('/resources/<string:name>', methods=['PATCH'])
def modify_resource(name):
    if name is None:
        abort(422)

    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'new_name' not in body or 'type' not in body or 'max' not in body or 'rate' not in body:
        return abort(422)

    new_name = body.get('new_name')
    type = body.get('type')
    max = body.get('max')
    rate = body.get('rate')

    resource = Resource.query.get(name)
    if resource is None:
        abort(404)
    resource.name = new_name
    resource.type = type
    resource.max = max
    resource.rate = rate
    resource.update()

    return jsonify({
        'success': True,
        'resource': resource.format()
    })

@app.route('/assign_resource/<int:task_id>', methods=['PATCH'])
def modify_assign_resource(task_id):
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'old_resources' not in body or 'new_resources' not in body:
        return abort(422)

    old_resources = body.get('old_resources')
    new_resources = body.get('new_resources')
    for old_resource in old_resources:
        task_resources = Tasks_Resources.query.get((task_id, old_resource))
        if new_resources is not None:
            task_resources.resource_name = new_resources.pop(0)
        task_resources.update()
        

    return jsonify({
        'success': True
    })

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify({
        'success': True,
        'tasks': [task.format() for task in tasks]
    })

@app.route('/resources', methods=['GET'])
def get_resources():
    resources = Resource.query.all()
    return jsonify({
        'success': True,
        'resources': [resource.format() for resource in resources]
    })

@app.route('/report', methods=['GET'])
def get_report():
    tasks = Task.query.all()
    return jsonify({
        'success': True,
        'report': [task.format_report() for task in tasks]
    })