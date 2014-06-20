$(document).ready(function(){

    // Set up our order obkect.

    var currentStep = 0;


    var app = function(){

        this.currentOrder = new Object();
        this.products = new Object();
        var steps = ['Select a Product','Select a Cut','Select a Design','Select a Style'];


        // Necessarry?
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
                        html = html+"<img src=\"img/products/"+value.img+"\"/>";
                        html = html+"<h4>"+value.product+"</h4>";
                        html = html+"</div>";
                        html = html+"</div>";
                        $('.app-selection-container').append(html);
                    });
                }, 'json');
        }


        // This resets an order to null when needed.
        this.resetOrder = function(){
            currentOrder.product = null;
            currentOrder.cut = null;
            currentOrder.design = null;
            currentOrder.style = null;
        }

        // This is responsible for cycling through the currentOrder and redrawing the sidebar.
        this.drawSidebar = function(currentOrder,currentStep) {
            $('.sidebar-steps').html("");
            var html = "";
            $.each(currentOrder,function(key,value){

                if(value){
                     html = html + "<li>"+value+"</li>";
                }
            });
            html = html+"<li><span class=\"sidebar-selection\">"+steps[currentStep]+"</span></li>";
            $('.sidebar-steps').append(html);
        }


        // This sets the currentOrder obj when an image is clicked.
        this.setCurrentOrder = function(type,value) {
            // Forgive this sloppy code. Much refactoring is in order.
            if(type=='product'){currentOrder.product = value;}
            if(type=='cut'){currentOrder.cut = value;}
            if(type=='design'){currentOrder.cut = value;}
            if(type=='decoration'){currentOrder.cut = value;}
        }


        return this;
    }();



    //Bootstrap the app.
    app.bootstrap();

    $('body').on('click', '.app-selection-panel', function() {
        currentStep++;
        app.setCurrentOrder($(this).data('type'),$(this).text());
        app.drawSidebar(app.currentOrder,currentStep);
    });
});