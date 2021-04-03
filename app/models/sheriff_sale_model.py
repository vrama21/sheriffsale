from .. import db
from sqlalchemy.orm import backref


class SheriffSaleModel(db.Model):
    __tablename__ = 'sheriff_sale'
    __table_args__ = {'extend_existing': True}

    id = db.Column('id', db.Integer, primary_key=True, nullable=False)
    sheriff_id = db.Column('sheriff_id', db.String)

    address = db.Column('address', db.String, unique=True)
    attorney = db.Column('attorney', db.String)
    attorney_phone = db.Column('attorney_phone', db.String)
    city = db.Column('city', db.String)
    county = db.Column('county', db.String)
    court_case = db.Column('court_case', db.String)
    deed = db.Column('deed', db.String)
    deed_address = db.Column('deed_address', db.String)
    defendant = db.Column('defendant', db.String)
    description = db.Column('description', db.String)
    judgment = db.Column('judgment', db.Numeric(10, 2))
    maps_url = db.Column('maps_url', db.String)
    parcel = db.Column('parcel', db.String)
    plaintiff = db.Column('plaintiff', db.String)
    priors = db.Column('priors', db.String)
    sale_date = db.Column('sale_date', db.String)
    secondary_unit = db.Column('secondary_unit', db.String)
    status_history = db.relationship('StatusHistoryModel', backref='StatusHistory', lazy=True)
    street = db.Column('street', db.String)
    unit = db.Column('unit', db.String)
    unit_secondary = db.Column('unit_secondary', db.String)
    upset_amount = db.Column('upset_amount', db.Numeric(10, 2))
    zip_code = db.Column('zip_code', db.String)

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class StatusHistoryModel(db.Model):
    __tablename__ = 'status_history'
    __table_args__ = {'extend_existing': True}

    id = db.Column('id', db.Integer, primary_key=True, nullable=False)
    sheriff_sale_id = db.Column(db.Integer, db.ForeignKey('sheriff_sale.id'))

    status = db.Column('status', db.String)
    date = db.Column('date', db.String)

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}