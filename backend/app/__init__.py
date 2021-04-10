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

@app.route('/assign_resource/<int:task_id>', methods=['POST'])
def assign_resource(task_id):
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'resource_id' not in body:
        abort(422)

    resource_id = body.get('resource_id')
    resource = Resource.query.get(resource_id)
    task = Task.query.get(task_id)
    if task is None or resource is None:
        abort(404)
    cost = resource.rate * (task.duration * 8)

    try:
        task_resource = Tasks_Resources(task_id, resource_id, cost)
        task_resource.insert()
    
    except:
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

@app.route('/resources/<int:id>', methods=['PATCH'])
def modify_resource(id):
    if id is None:
        abort(422)

    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'name' not in body or 'type' not in body or 'max' not in body or 'rate' not in body:
        return abort(422)

    name = body.get('name')
    type = body.get('type')
    max = body.get('max')
    rate = body.get('rate')

    resource = Resource.query.get(id)
    if resource is None:
        abort(404)
    resource.name = name
    resource.type = type
    resource.max = max
    resource.rate = rate
    resource.update()

    return jsonify({
        'success': True,
        'resource': resource.format()
    })

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    if id is None:
        abort(422)
    task = Task.query.get(id)
    if task is None:
        abort(404)
    task.delete()

    return jsonify({
        'success': True
    })

@app.route('/resources/<int:id>', methods=['DELETE'])
def delete_resource(id):
    if id is None:
        abort(422)
    resource = Resource.query.get(id)
    if resource is None:
        abort(404)
    resource.delete()

    return jsonify({
        'success': True
    })

@app.route('/assign_resource/<int:task_id>', methods=['DELETE'])
def delete_assign_resource(task_id):
    resource_id = request.args.get('resource_id', None, type=str)

    if 'task_id' is None or 'resource_id' is None:
        abort(422)
    task_resource = Tasks_Resources.query.get((task_id, resource_id))
    if task_resource is None:
        abort(404)
    task_resource.delete()

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

@app.route('/report_task', methods=['GET'])
def get_report_task():
    tasks = Task.query.all()
    data = []
    for task in tasks:
        task_resources = Tasks_Resources.query.filter_by(task_id = task.id).all()
        resources = []
        total_cost = 0
        for task_resource in task_resources:
            resources.append(task_resource.resource.name)
            total_cost = task_resource.total_cost + total_cost
        data.append({
            'task_id': task.id,
            'task_name': task.name,
            'task_duration': task.duration,
            'task_start': task.start,
            'task_finish': task.finish,
            'resources': resources,
            'total_cost': total_cost
        })

    return jsonify({
        'success': True,
        'report': data
    })

@app.route('/report_project', methods=['GET'])
def get_report_project():
    tasks = Task.query.all()
    data = []
    project_total_cost = 0
    for task in tasks:
        task_resources = Tasks_Resources.query.filter_by(task_id = task.id).all()
        resources = []
        total_cost = 0
        for task_resource in task_resources:
            resources.append(task_resource.resource.name)
            total_cost = task_resource.total_cost + total_cost
        data.append({
            'task_id': task.id,
            'task_name': task.name,
            'task_duration': task.duration,
            'task_start': task.start,
            'task_finish': task.finish,
            'resources': resources,
            'total_cost': total_cost
        })
        project_total_cost += total_cost 
    
    return jsonify({
        'success': True,
        'report': data,
        'project_total_cost': project_total_cost
    })