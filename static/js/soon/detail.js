(function($) {
    var echartsDay = echarts.init(document.getElementById('echarts-day'));
    var echartsWeek = echarts.init(document.getElementById('echarts-week'));
    var echartsMonth = echarts.init(document.getElementById('echarts-month'));
    var echartsQuarterly = echarts.init(document.getElementById('echarts-quarterly'));

    $('#return_index').on('click', function() {
        window.location.href = '/';
    });

    function getUrlParms() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            }
        );
        return vars;
    }
    // console.log(getUrlParms()['uniq_no']);

    function dateFormat(dt, splitStr='-'){
        var dt = new Date(dt);
        return dt.getFullYear() + splitStr + (dt.getMonth() + 1) + splitStr + dt.getDate()
    }

    function barEcharts(data, showHandle, title, dataZoom=null){
        // console.log(data);
        var data_list = {'dt': [], 'min_price': [], 'avg_price': [], 'max_price': []}
        // console.log(dataZoom);
        for(var d of data) {
            data_list.dt.push(dateFormat(d.dt));
            data_list.min_price.push(d.min_price);
            data_list.avg_price.push(d.avg_price);
            data_list.max_price.push(d.max_price);
        }
        // console.log(data_list.max_price);
        var option = {
            title: {
                text: title,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
            }
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataZoom: dataZoom,
            // function (){
            //     if ( dataZoom == null) {
            //         return []
            //     }
            //     return dataZoom
            // },
            legend: {
                data: ['最低价格', '平均价格', '最高价格'],
            },
            xAxis: {
                data: data_list.dt,
                },
            yAxis: [
                {
                    type : 'value',
                    name : '人民币(元)',
                }],
            series: [{
                    name: '最高价格',
                    type: 'line',
                    data: data_list.max_price
                },{
                    name: '平均价格',
                    type: 'line',
                    data: data_list.avg_price
                },{
                    name: '最低价格',
                    type: 'line',
                    data: data_list.min_price
                }]
        };

        showHandle.setOption(option);
    }

    function suceessEcharts(data, showHandle, title, dataZoom=null){
        var data_list = data;
        // {'y_true': [], 'y_pred': [], 'mape': [], 'mse': [], 'at': [], 'bt': [], 'alpha': [], 'dt': []};

        // for (var d of data) {
        //     data_list.dt.push(dateFormat(d.dt));
        //     data_list.y_true.push(d.y_true);
        //     data_list.y_pred.push(d.y_pred);
        //     data_list.mape.push(d.mape);
        //     data_list.mse.push(d.mse);
        //     data_list.at.push(d.at);
        //     data_list.bt.push(d.bt);
        //     data_list.alpha.push(d.alpha);
        // }
        // console.log(data_list.dt);
        // console.log(data);
        var option = {
            title: {
                text: title,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
            }
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataZoom: dataZoom,
            // function (){
            //     if ( dataZoom == null) {
            //         return []
            //     }
            //     return dataZoom
            // },
            legend: {
                data: ['真实值', '预测值', '绝对误差值', '均方差', 'a', 'b', 'alpha'],
            },
            xAxis: {
                data: data_list.dt,
                },
            yAxis: [
                {
                    type : 'value',
                    name : '人民币(元)',
                }],
            series: [{
                        name: '真实值',
                        type: 'line',
                        data: data_list.y_true,
                    },{
                        name: '预测值',
                        type: 'line',
                        data: data_list.y_pred,
                    },{
                        name: '绝对误差值',
                        type: 'line',
                        data: data_list.mape,
                    },{
                        name: '均方差',
                        type: 'line',
                        data: data_list.mse,
                    },{
                        name: 'a',
                        type: 'line',
                        data: data_list.at,
                    },{
                        name: 'b',
                        type: 'line',
                        data: data_list.bt,
                    },{
                        name: 'alpha',
                        type: 'line',
                        data: data_list.alpha,
                    },]
        };

        showHandle.setOption(option);
    }

    function showMin(data, EchartsFunction) {
        EchartsFunction(data, echartsDay, '最小值', [{ show: true, start: 94, end: 100}]);
    }

    function showAvg(data, EchartsFunction) {
        EchartsFunction(data, echartsWeek, '平均值', [{ show: true, start: 94, end: 100}]);
    }

    function showMax(data, EchartsFunction) {
        EchartsFunction(data, echartsMonth, '最大值', [{ show: true, start: 94, end: 100}]);
    }

    // function showQuarterly(data, EchartsFunction) {
    //     EchartsFunction(data, echartsQuarterly, '每季度');
    // }

    function doRequest(api, query, showFunction, isTitlie) {
        try {
            request({
                url: api,
                data: query,
                success: function(data) {
                    if (isTitlie) {
                        showFunction(data);
                    }
                    else{
                        showFunction(data.results, data.status);
                    }
                    // else if (data.status === 0){
                    //     showFunction(data.results, suceessEcharts);
                    // }
                    // else{
                    //     showFunction(data.results, barEcharts);
                    // }
                },
                error: function(jqxhr, err, errText) {
                    throw new Error(errText);
                },
                complete: function() {

                }
            });
        }catch(err) {
            console.log(err);
        }
    }

    function request(options) {
        $.ajax(options);
    }

    function transaleName(name) {
        var category_list = {'cereals_and_oils': '粮油', 'fisheries': '水产', 'fruit': '水果', 'meat_or_eggs': '肉禽蛋', 'vegetables': '蔬菜'}
        for (var category in category_list) {
            if (category === name)
            {
                return category_list[category];
            }
        }
        return '其他';
    }
    function setTitle(data) {
        // api = '/detail/' + getUrlParms()['uniq_no'];
        var title = $('#title_id');
        title.text(title.text() + '-' + data.farm_p_name);
        // $('#head_id').text(data.farm_p_name);
        // var category_list = {'cereals_and_oils': '粮油', 'fisheries': '水产', 'fruit': '水果', 'meat_or_eggs': '肉禽蛋', 'vegetables': '蔬菜'}
        $("#category").text('品类: ' + transaleName(data.category));
        $("#p_type").text('类型: ' + data.p_type);
        $("#farm_p_name").text('名称: ' + data.farm_p_name);
        $("#unit").text('单位: ' + data.unit);
    }

    function show(data, d_status) {
        if (d_status === 0){
            var min_data = {'y_true': [], 'y_pred': [], 'mape': [], 'mse': [], 'at': [], 'bt': [], 'alpha': [], 'dt': []};
            var avg_data = {'y_true': [], 'y_pred': [], 'mape': [], 'mse': [], 'at': [], 'bt': [], 'alpha': [], 'dt': []};
            var max_data = {'y_true': [], 'y_pred': [], 'mape': [], 'mse': [], 'at': [], 'bt': [], 'alpha': [], 'dt': []};
            for ( d of data) {
                min_data.dt.push(dateFormat(d.dt));
                min_data.y_true.push(d.min_price);
                min_data.y_pred.push(d.pre_min_price);
                min_data.mape.push(d.min_mape);
                min_data.mse.push(d.min_mse);
                min_data.at.push(d.min_price_at);
                min_data.bt.push(d.min_price_bt);
                min_data.alpha.push(d.min_price_alpha);
                avg_data.dt.push(dateFormat(d.dt));
                avg_data.y_true.push(d.avg_price);
                avg_data.y_pred.push(d.pre_avg_price);
                avg_data.mape.push(d.avg_mape);
                avg_data.mse.push(d.avg_mse);
                avg_data.at.push(d.avg_price_at);
                avg_data.bt.push(d.avg_price_bt);
                avg_data.alpha.push(d.avg_price_alpha);
                max_data.dt.push(dateFormat(d.dt));
                max_data.y_true.push(d.max_price);
                max_data.y_pred.push(d.pre_max_price);
                max_data.mape.push(d.max_mape);
                max_data.mse.push(d.max_mse);
                max_data.at.push(d.max_price_at);
                max_data.bt.push(d.max_price_bt);
                max_data.alpha.push(d.max_price_alpha);
            }
            showMin(min_data, suceessEcharts);
            showAvg(avg_data, suceessEcharts);
            showMax(max_data, suceessEcharts);
        } else {
            showMin(data, barEcharts);
            showAvg(data, barEcharts);
            showMax(data, barEcharts);
        }
    }

    function load(){
        var api = '/detail/' + getUrlParms()['uniq_no'];
        doRequest(api, '', setTitle, true);
        api = '/list/' + getUrlParms()['uniq_no'];
        doRequest(api, '', show, false);
        // doRequest(api, '', showDay, false);
        // doRequest(api, '', showWeek, false);
        // doRequest(api, '', showMonth, false);
        // doRequest(api, '', showQuarterly, false);
    }

    load();
})(jQuery)
