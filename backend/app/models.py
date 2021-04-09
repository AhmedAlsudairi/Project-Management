from sqlalchemy import Column, String, create_engine
from app import db
from datetime import datetime
import shortuuid

def generateID(name):
    random_string = shortuuid.ShortUUID().random(length=5)
    return str(name)+'_'+random_string

class Task(db.Model):
    __tablename__ = "Task"
    id = db.Column(db.String(), primary_key=True, nullable=False)
    name = db.Column(db.String(), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    finish = db.Column(db.DateTime, nullable=False)
    resources = db.relationship('Tasks_Resources', backref='task', lazy=True, cascade='all, delete')


    def __init__(self, name, duration, start, finish):
        self.id  = generateID(name)
        self.name = name
        self.duration = duration
        self.start = datetime.strptime(start, '%Y-%m-%d')
        self.finish = datetime.strptime(finish, '%Y-%m-%d')

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        task_resources = Tasks_Resources.query.filter_by(task_id = self.id).all()
        for task_resource in task_resources:
            task_resource.total_cost = (task_resource.task.duration*8) * task_resource.resource.rate
            task_resource.update()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'duration': self.duration,
            'start': self.start,
            'finish': self.finish
        }
    def format_report(self):
        return {
            'id': self.id,
            'name': self.name,
            'duration': self.duration,
            'start': self.start,
            'finish': self.finish,
            'resources': [Resource.query.get(resource.resource_id).name for resource in self.resources]
        }

class Resource(db.Model):
    __tablename__ = "Resource"
    id = db.Column(db.String(), primary_key=True, nullable=False)
    name =  db.Column(db.String(), nullable=False)
    type = db.Column(db.String(), nullable=False)
    max = db.Column(db.Float, nullable=False)
    rate = db.Column(db.Float, nullable=False)
    tasks = db.relationship('Tasks_Resources', backref='resource', lazy=True, cascade='all, delete')



    def __init__(self, name, type, max, rate):
        self.id  = generateID(name)
        self.name = name
        self.type = type
        self.max = max
        self.rate = rate


    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        task_resources = Tasks_Resources.query.filter_by(resource_id = self.id).all()
        for task_resource in task_resources:
            task_resource.total_cost = (task_resource.task.duration*8) * task_resource.resource.rate
            task_resource.update()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'max': self.max,
            'rate': self.rate,
        }
class Tasks_Resources(db.Model):
    __tablename__ = "Tasks_Resources"
    task_id = db.Column(db.String(), db.ForeignKey("Task.id", ondelete="CASCADE"), primary_key=True)
    resource_id = db.Column(db.String(), db.ForeignKey("Resource.id", ondelete="CASCADE"), primary_key=True)
    total_cost = db.Column(db.Float, nullable=True)


    def __init__(self, task_id, resource_id, total_cost):
        self.task_id = task_id
        self.resource_id = resource_id
        self.total_cost = total_cost


    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'task_id': self.task_id,
            'resource_name': self.resource_id,
            'total_cost': self.total_cost
        }