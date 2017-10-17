from sqlalchemy import (Column, Integer, String,
                        DateTime, Date, Float)
# from sqlalchemy import Column, String, Integer
from settings import DB


class XinfadiShow(DB.Model):
    __tablename__ = 'xinfadi_show'

    id = Column(Integer, primary_key=True)
    uniq_no = Column(String(255))
    farm_p_name = Column(String(255))
    category = Column(String(255))
    min_price = Column(Float)
    avg_price = Column(Float)
    max_price = Column(Float)
    p_type = Column(String(255))
    unit = Column(String(255))
    dt = Column(Date)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __repr__(self):
        return "<Xinfadi (id='{}', farm_p_name='{}', category='{}', p_type='{}'')>".format(
            self.id, self.farm_p_name, self.category, self.p_type)

    @property
    def __serialize__(self):
        return {key: getattr(self, key) for key in self.__dict__.keys() if not key.startswith('_')}


class XinfadiSearch(DB.Model):
    __tablename__ = 'xinfadi_search'

    id = Column(Integer, primary_key=True)
    uniq_no = Column(String(255), unique=True)
    farm_p_name = Column(String(255))
    category = Column(String(255))
    p_type = Column(String(255))
    unit = Column(String(255))
    created_at = Column(DateTime)

    def __repr__(self):
        return "<Xinfadi (id='{}', uniq_no='{}', farm_p_name='{}', category='{}', p_type='{}'')>".format(
            self.id, self.uniq_no, self.farm_p_name, self.category, self.p_type)

    @property
    def __serialize__(self):
        return {key: getattr(self, key) for key in self.__dict__.keys() if not key.startswith('_')}


class XinfadiDetail(DB.Model):
    __tablename__ = 'xinfadi_vegetables_kdd'

    id = Column(Integer, primary_key=True)
    uniq_no = Column(String(255))
    min_price = Column(Float)
    avg_price = Column(Float)
    max_price = Column(Float)
    pre_min_price = Column(Float)
    pre_avg_price = Column(Float)
    pre_max_price = Column(Float)
    one_min_price = Column(Float)
    one_avg_price = Column(Float)
    one_max_price = Column(Float)
    min_price_alpha = Column(Float)
    avg_price_alpha = Column(Float)
    max_price_alpha = Column(Float)
    min_price_at = Column(Float)
    avg_price_at = Column(Float)
    max_price_at = Column(Float)
    min_price_bt = Column(Float)
    avg_price_bt = Column(Float)
    max_price_bt = Column(Float)
    min_mape = Column(Float)
    avg_mape = Column(Float)
    max_mape = Column(Float)
    min_mse = Column(Float)
    avg_mse = Column(Float)
    max_mse = Column(Float)
    dt = Column(Date)
    created_at = Column(DateTime)

    def __repr__(self):
        return "<XinfadiDetail (id='{}', uniq_no='{}', dt='{}')>".format(self.id, self.uniq_no, self.dt)

    @property
    def __serialize__(self):
        return {key: getattr(self, key) for key in self.__dict__.keys() if not key.startswith('_')}
