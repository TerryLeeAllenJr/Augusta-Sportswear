$(document).ready(function(){

    // Set up our order obkect.



    var app = function(){

        this.currentOrder = new Object();
        this.products = new Object();

        this.drawProducts = function(products){

        }


        this.bootstrap = function(){

            // Reset the order to null.
            this.resetOrder();

            // Initiate loading symbol while products are pulled from backend.
            $('.app-selection-container').html("Loading...");

            // Get current product list. This will be modified to pull data from the real backend.
            $.get('http://augusta.lee-allen.com/php/data.ajax.php',
                {
                    data: 'products'
                },
                function (response) {

                    $('.app-selection-container').html("");
                    $.each(response,function(key,value){
                        var html = "<div class=\"col-lg-3 app-selection-panel\" data-type=\"product\">";
                        html = html+"<div class=\"app-selection-data\">";
                        html = html+"<img src=\"img/"+value.img+"\"/>";
                        html = html+"<h4>"+value.product+"</h4>";
                        html = html+"</div>";
                        html = html+"</div>";

                        $('.app-selection-container').append(html);
                    });

                }, 'json');

        }




        this.resetOrder = function(){
            currentOrder.product = null;
            currentOrder.cut = null;
            currentOrder.design = null;
            currentOrder.style = null;
        }

        this.drawSidebar = function(currentOrder) {
            $('.sidebar-steps').html("");
            var html = "";
            $.each(currentOrder,function(key,value){

                if(value){
                     html = html + "<li><span class=\"sidebar-selection\">"+value+"</span></li>";
                }
            });
            $('.sidebar-steps').append(html);
        }



        this.setCurrentOrder = function(type,value) {

            if(type=='product'){currentOrder.product = value;}

        }


        return this;
    }();



    //Bootstrap the app.
    app.bootstrap();

    $('body').on('click', '.app-selection-panel', function() {
        app.setCurrentOrder($(this).data('type'),$(this).text());
        app.drawSidebar(app.currentOrder);
    });
});