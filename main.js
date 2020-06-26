$( document ).ready(function() {
    $(document).on("click",'.pagination a', function(e){
        e.preventDefault();
        var number = parseInt($(this).text());
        getData(number*10);
        $('.pagination a').removeClass("active")
        $(this).after().addClass("active")

    });
    $.ajax({
        type: "GET",
        url: 'http://api.odesseo.com.ua/warehouses',
        success: function(data) {
            $.each(data["data"], function (key, arr) {
                var city = data["data"][key]['city'];
                var name = data["data"][key]['name'];
                var ref = data["data"][key]['ref'];
                var number = data["data"][key]['number'];
                $(".table tbody").append("<tr><td>"+ref+"</td><td>"+name+"</td><td>"+city+"</td><td>"+number+"</td></tr>")
            })
            var lastPage = Math.ceil(data["total"]/10);
            $(".pagination").append(' <a href="#">'+lastPage+'</a>')
        }
    });
    $('.limit__form__button').on("click", function(e){

        e.preventDefault()
        var number = $('.limit__form__input').val()
        $.ajax({
            type: "GET",
            url: 'http://api.odesseo.com.ua/warehouses?limit='+number,
            success: function(data) {
                $(".table tbody").empty();
                $.each(data["data"], function (key, arr) {
                    var city = data["data"][key]['city'];
                    var name = data["data"][key]['name'];
                    var ref = data["data"][key]['ref'];
                    var number = data["data"][key]['number'];
                    $(".table tbody").append("<tr><td>"+ref+"</td><td>"+name+"</td><td>"+city+"</td><td>"+number+"</td></tr>")
                })
            }
        });
    });
    $('.sort__number').on("click", function(e){
        e.preventDefault();
        var order = $(this).attr("data-sort")
        $('.arrow').toggleClass('up')

        $.ajax({
            type: "GET",
            url: 'http://api.odesseo.com.ua/warehouses?order_by=number&order='+ order,
            beforeSend: function(){
                $(".table").css("opacity", "0.5")
            },
            success: function(data) {
                $(".table tbody").empty();
                $.each(data["data"], function (key, arr) {
                    var city = data["data"][key]['city'];
                    var name = data["data"][key]['name'];
                    var ref = data["data"][key]['ref'];
                    var number = data["data"][key]['number'];
                    $(".table tbody").append("<tr><td>"+ref+"</td><td>"+name+"</td><td>"+city+"</td><td>"+number+"</td></tr>")
                })
            },
            complete: function () {
                $(".table").css("opacity", "1")
            }
        });
        if(order === 'asc'){
            $(this).attr("data-sort", 'desc')
        }
        else{
            $(this).attr("data-sort", 'asc')
        }
    });
    function getData(number){

        $.ajax({
            type: "GET",
            url: 'http://api.odesseo.com.ua/warehouses?skip='+number,
            success: function(data) {
                $(".table tbody").empty();
                $.each(data["data"], function (key, arr) {
                    var city = data["data"][key]['city'];
                    var name = data["data"][key]['name'];
                    var ref = data["data"][key]['ref'];
                    var number = data["data"][key]['number'];
                    $(".table tbody").append("<tr><td>"+ref+"</td><td>"+name+"</td><td>"+city+"</td><td>"+number+"</td></tr>")
                })

            }
        });

    }

});