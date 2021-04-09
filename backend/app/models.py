from sqlalchemy import Column, String, create_engine
from app import db



class Task(db.Model):
    __tablename__ = "Task"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    finish = db.Column(db.DateTime, nullable=False)
    resources = db.relationship('Tasks_Resources', backref='task', lazy=True, cascade='all, delete')


    def __init__(self, id, name, duration, start, finish):
        self.id  = id
        self.name = name
        self.duration = duration
        self.start = start
        self.finish = finish

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
            'id': self.id,
            'name': self.name,
            'duration': self.duration,
            'start': self.start,
            'finish': self.finish
        }

class Resource(db.Model):
    __tablename__ = "Resource"
    name = db.Column(db.String(), primary_key=True, nullable=False)
    type = db.Column(db.String(), nullable=False)
    max = db.Column(db.Float, nullable=False)
    rate = db.Column(db.Float, nullable=False)
    tasks = db.relationship('Tasks_Resources', backref='resource', lazy=True, cascade='all, delete')



    def __init__(self, name, type, max, rate):
        self.name = name
        self.type = type
        self.max = max
        self.rate = rate


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
            'name': self.name,
            'type': self.type,
            'max': self.max,
            'rate': self.rate,
        }
class Tasks_Resources(db.Model):
    __tablename__ = "Tasks_Resources"
    task_id = db.Column(db.Integer(), db.ForeignKey("Task.id", ondelete="CASCADE"), primary_key=True)
    resource_name = db.Column(db.String(), db.ForeignKey("Resource.name", ondelete="CASCADE"), primary_key=True)
    total_cost = db.Column(db.Float, nullable=True)


    def __init__(self, task_id, resource_name, total_cost):
        self.task_id = task_id
        self.resource_name = resource_name
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
            'resource_name': self.resource_name,
            'total_cost': self.total_cost
        }