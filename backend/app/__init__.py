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

@app.route('/tasks', methods=['GET'])
def get_task():
    return jsonify({
        'success': True,
        'tasks': 'hi'
    })

@app.route('/tasks', methods=['POST'])
def create_task():
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'id' not in body or 'name' not in body or 'duration' not in body or 'start' not in body or 'end' not in body:
        return abort(422)

    id = body.get('id')
    name = body.get('name')
    duration = body.get('duration')
    start = body.get('start')
    end = body.get('end')

    task = Task(id, name, duration, start, end)
    task.insert()

    return jsonify({
        'success': True
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
        'success': True
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
    print(resources)
    for resource in resources:
        tasks_resources = Tasks_Resources(task_id, resource, None)
        tasks_resources.insert()

    return jsonify({
        'success': True
    })

@app.route('/tasks/<int:id>', methods=['PATCH'])
def modify_task(id):
    if id is None:
        abort(422)

    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'id' not in body or 'name' not in body or 'duration' not in body or 'start' not in body or 'end' not in body:
        return abort(422)


    new_id = body.get('id')
    name = body.get('name')
    duration = body.get('duration')
    start = body.get('start')
    end = body.get('end')

    task = Task.query.get(id)
    if task is None:
        abort(404)
    task.id = new_id
    task.name = name
    task.duration = duration
    task.start = start
    task.end = end

    task.update()

    return jsonify({
        'success': True
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
        'success': True
    })

@app.route('/assign_resource/<int:task_id>', methods=['PATCH'])
def modify_assign_resource(task_id):
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'task_id' not in body or 'old_resources' not in body or 'new_resources' not in body:
        return abort(422)

    task_id = body.get('task_id')
    old_resources = body.get('old_resources')
    new_resources = body.get('new_resources')
    for old_resource in old_resources:
        tasks_resources = Tasks_Resources.query.get((task_id, old_resource))
        for new_resource in new_resources:
            tasks_resources.resource_name = new_resource
        tasks_resources.update()

    return jsonify({
        'success': True,
        'resources': tasks_resources.resource.format()
    })