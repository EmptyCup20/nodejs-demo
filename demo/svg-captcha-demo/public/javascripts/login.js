





$(function(){
    getSvg();           //第一次页面加载时获取

    $('#svg').click(getSvg);
});


function getSvg(){
    ajax().register({}).then(
        function(data){
            //console.log(data);
            $("#svg").empty();
            $('#svg').append(data.firstChild);  //添加到div下

        },

        function(err){

        }
    );
}



function ajax(){
    function req(method,url,data){
        var defered = $.Deferred();
        var request = {
            type: method,
            url: url,
            //dataType: "json"?
            data: data
        };

        $.ajax(request)
            .done(function(data){
                defered.resolve(data);
            })
            .fail(function(){
                defered.reject();
            });

        return defered.promise();
    }

    return {
        register: function(data){
            return req('GET','/svg',data);
        }
    }
}