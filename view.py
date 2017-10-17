from control import XinfadiShowControl, XinfadiSearchControl, XinfadiDetailControl
from settings import app
from flask import request, render_template, redirect, url_for
from flask.ext.api import status


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/404')
def not_found():
    return render_template('404.html')


@app.route('/detail/', methods=['GET', ])
def detail():
    parms = request.args
    uniq_no = parms.get('uniq_no')
    if XinfadiShowControl().__exists__({'uniq_no': uniq_no}) is False:
        return redirect(url_for('not_found'), code=status.HTTP_302_FOUND)
    return render_template('detail.html', uniq_no=uniq_no)


@app.route('/detail/<string:uniq_no>', methods=['GET', ])
def show_uniq_no(uniq_no):
    return XinfadiShowControl().first(query_filter={'uniq_no': uniq_no})


@app.route('/list/', methods=['GET', ])
def show_list_index():
    return XinfadiShowControl().first()


@app.route('/list/<string:uniq_no>', methods=['GET', ])
def show_list(uniq_no):
    if XinfadiDetailControl().__exists__(query_filter={'uniq_no': uniq_no}) is False:
        return {'status': 1, 'results': XinfadiShowControl().list({'uniq_no': uniq_no}, order_by=['dt', ])}
    return {'status': 0, 'results': XinfadiDetailControl().list({'uniq_no': uniq_no}, order_by=['dt', ])}


@app.route('/search/', methods=['GET', ])
def search():
    parms = request.args
    page = parms.get('page', '1')
    if page.isnumeric():
        page = int(page)
    else:
        return 'page is error!', status.HTTP_400_BAD_REQUEST
    page_size = parms.get('page_size', '10')
    if page_size.isnumeric():
        page_size = int(page_size)
    else:
        return 'page_size is error!', status.HTTP_400_BAD_REQUEST
    return XinfadiSearchControl(is_page=True, page=page, page_size=page_size).search(parms.get('q'))
