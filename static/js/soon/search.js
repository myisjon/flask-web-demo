(function($) {
    "use strict";

    var WAIT = 'WAIT';
    var PENDING = 'PENDING';

    var searchStatus = WAIT;

    var searchInput = $('#searchFormName');
    var searchButton = $('#searchButton');
    var resultsList = $('#resultsList');

    var searchInputFocus = false;

    var itemTemplate =
        '<a href="#" class="hide list-group-item list-group-item-action flex-column align-items-start"></a>';


    var api = '/search/';

    searchButton.on('click', function() {
        if(!canSearch()) return;
        searchStatus = PENDING;
        doSearch(searchInput.val());
    });

    searchInput.on('input', function() {
        if(!searchInput.val()) {
            hideResults();
        }
    });

    searchInput.on('focus', function() {
        searchInputFocus = true;
    });

    searchInput.on('blur', function() {
        searchInputFocus = false;
    });

    $(document).on('keydown', function(e) {
        if(!searchInputFocus) return;
        if(!canSearch()) return;
        if(e.keyCode !== 13) return;

        searchStatus = PENDING;
        doSearch(searchInput.val());
    });

    function doSearch(query, page, page_size) {
        searchButton.addClass('disabled');

        try {
            request({
                url: api,
                data: {
                    q: query,
                    page: page || 1,
                    page_size: page_size || 10,
                },
                success: function(data) {
                    showResults(data);
                },
                error: function(jqxhr, err, errText) {
                    throw new Error(errText);
                },
                complete: function() {
                    searchStatus = WAIT;
                    searchButton.removeClass('disabled');
                }
            });
        } catch(err) {
            console.log(err);
        }
    }

    function showResults(data) {
        var results = [];

        if(data.results.length < 1) {
            results.push($(itemTemplate).text( '什么也没有找到!' ));
        } else {
            for(var i = 0; i < data.results.length; i += 1) {
                results.push(setupResultItem(data.results[i]));
            }
        }

        resultsList.html('');
        resultsList.append(results);
        if(data.results.length > 0) {
            var show_detail = '';
            var page_pre = '<div style="display: inline-flex;">';
            var page_next = '<button class="btn btn-link btn-red" value="' + (data.page + 1) + '" id="page_pre">下一页</button></div>';
            if(data.page > 1) {
                page_pre += '<button class="btn btn-link btn-red" value="' + (data.page - 1) + '" id="page_next">上一页</button>';
            }
            if(data.count - data.page * 10 < 1) {
                page_next = '</div>';
            }
            show_detail = '<strong class="text-muted show-list">第'+ data.page + '页,每页' + data.page_size + '行,一共' + data.count + '条数据</strong>';
            show_detail = page_pre + show_detail + page_next;
            resultsList.append(show_detail);
        }

        doResultsListAnimation();
        $('#page_pre').on('click', function(){
            console.log('click pagePreButton');
            if(!canSearch()) return;
            searchStatus = PENDING;
            doSearch(searchInput.val(), $('#page_pre').prop('value'));
        });
        $('#page_next').on('click', function(){
            console.log('click pageNextButton');
            if(!canSearch()) return;
            searchStatus = PENDING;
            doSearch(searchInput.val(), $('#page_next').prop('value'));
        });
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

    function doResultsListAnimation() {
        resultsList.removeClass('hide');

        resultsList.children().each(function(item) {
            (function(item) {
                setTimeout((function() {
                    resultsList.children().eq(item)
                        .addClass('animated FadeIn');
                    resultsList.children().eq(item)
                        .removeClass('hide');
                }), item * 25);
            })(item);
        });
    }

    function setupResultItem(item) {
        var $item = $(itemTemplate);

        $item.attr('href', '/detail/?uniq_no=' + item.uniq_no); // if your want redirect page
        // $item.text( item.farm_p_name );
        $item.append( $('<strong></strong>').text(item.farm_p_name) );
        $item.append( $('<small class="text-muted"></small>').text( ' ;品类: ' + transaleName(item.category) + '; '));
        $item.append( $('<small class="text-muted"></small>').text( '类型: ' + item.p_type + '; '));
        $item.append( $('<small class="text-muted"></small>').text( '单位: ' + item.unit));

        return $item;
    }

    function hideResults() {
        resultsList.html('');
        resultsList.addClass('hide');
    }

    function canSearch() {
        return searchInput.val().length !== 0 && searchStatus === WAIT;
    }

    function request(options) {
        $.ajax(options);
    }

})(jQuery)
