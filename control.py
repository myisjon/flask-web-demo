from models import XinfadiShow, XinfadiSearch, XinfadiDetail
from sqlalchemy import or_
from sqlalchemy.sql import exists


class BasicControl(object):
    model = None

    def __init__(self, is_page=False, page_size=10, page=1):
        self.is_page = is_page
        self.page_size = page_size
        self.page = page

    @property
    def model_attr(self):
        return [attr for attr in self.model.__dict__.keys() if not attr.startswith('_')]

    @property
    def query(self):
        return self.model.query

    def __show__(self, queryset):
        if self.is_page is False:
            return [query.__serialize__ for query in queryset]
        queryset = queryset.paginate(self.page, self.page_size)
        results = [query.__serialize__ for query in queryset.items]
        return {'count': queryset.query.count(), 'page': self.page, 'page_size': self.page_size, 'results': results}

    def __search__(self, query_search=None, join_model=or_):
        if query_search is None:
            return []

        search_terms = None
        for key, value in query_search.items():
            if key not in self.model_attr:
                raise ValueError('not found column: {}'.format(key))
            if search_terms is None:
                search_terms = join_model(getattr(self.model, key).like('%{}%'.format(value)), )
                continue
            search_terms = join_model(getattr(self.model, key).like('%{}%'.format(value)), search_terms)
        if search_terms is None:
            return []
        return self.__show__(self.query.filter(search_terms))

    def __exists__(self, query_filter=None, join_model=or_):
        if query_filter is None:
            return False

        query_terms = None
        for key, value in query_filter.items():
            if key not in self.model_attr:
                raise ValueError('not found column: {}'.format(key))
            if query_terms is None:
                query_terms = join_model(getattr(self.model, key) == value, )
                continue
            query_terms = join_model(getattr(self.model, key) == value, query_terms)
        if query_terms is None:
            return False
        return self.query.session.query(exists().where(query_terms)).scalar()

    def first(self, query_filter=None):
        if query_filter is None:
            query = self.query.first()
        else:
            query = self.query.filter_by(**query_filter).first()
        if query is None:
            return {}
        return query.__serialize__

    def last(self, query_filter=None):
        if query_filter is None:
            query = self.query.order_by(self.model.id.desc()).first()
        else:
            query = self.query.filter_by(**query_filter).order_by(self.model.id.desc()).first()
        if query is None:
            return {}
        return query.__serialize__

    def list(self, query_filter, order_by=None):
        if query_filter is None:
            return []
        query = self.query.filter_by(**query_filter)
        if order_by is not None:
            query = query.order_by(*order_by)

        return self.__show__(query)

    def search(self, parms):
        if not parms:
            return []
        query_search = {'farm_p_name': parms, }
        return self.__search__(query_search=query_search)


class XinfadiShowControl(BasicControl):
    """docstring for XinfadiShowControl"""
    model = XinfadiShow


class XinfadiSearchControl(BasicControl):
    """docstring for XinfadiSearchControl"""
    model = XinfadiSearch


class XinfadiDetailControl(BasicControl):
    """docstring for XinfadiSearchControl"""
    model = XinfadiDetail


def main():
    lq = XinfadiDetailControl()
    print(lq.first(query_filter={'uniq_no': '002b4aa82ad072364e5a969f63010a297994b0b1'}))


if __name__ == '__main__':
    main()
