/* Please note that this is not my customary way of coding. Generally, I would have refactored multiple times before turning
    over code for consideration. There are still some bugs, and there are MANY things that I would do differently in the long
    run. I will continue to clean this code up in the coming days.
 */


$(document).ready(function(){


    // Get rid of global vars.
    var currentStep = 0,
        steps = ['Select a Product','Select a Cut','Select a Design','Select a Style'],
        stepPlugs = ['product','cuts','designs','decorations'],
        productId = 0;

    var app = function(){

        this.currentOrder = new Object();
        this.products = new Object();


        // This is the constructor for the app.
        this.bootstrap = function(){

            // Reset the order to null.
            this.resetOrder();

            // Initiate loading symbol while products are pulled from backend.
            $('.app-selection-container').html("Loading...");

            // Get current product list. This will be modified to pull data from the real backend.
            $.post('http://augusta.lee-allen.com/php/data.ajax.php',
                {
                    data: 'products'
                },
                function (response) {
                    $('.app-selection-container').html("");
                    $.each(response,function(key,value){
                        var html = "<div class=\"col-lg-3 app-selection-panel\" data-type=\"product\" data-id=\""+key+"\">";
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
            currentOrder.decoration = null;
        }

        // This is responsible for cycling through the currentOrder and redrawing the sidebar.
        this.drawSidebar = function(currentOrder,currentStep) {
            $('.sidebar-steps').html("");
            var html = "";
            $.each(currentOrder,function(key,value){
                //alert(key+" "+value);
                if(value){
                     html = html + "<li>"+value+"</li>";
                }
            });
            if(typeof steps[currentStep]!== "undefined"){
                html = html+"<li><span class=\"sidebar-selection\">"+steps[currentStep]+"</span></li>";
            }
            $('.sidebar-steps').append(html);
        }


        // This sets the currentOrder obj when an image is clicked.
        this.setCurrentOrder = function(currentStep,value) {
            // Forgive this sloppy code. Much refactoring is in order.
            if(stepPlugs[currentStep]=='product'){currentOrder.product = value;}
            if(stepPlugs[currentStep]=='cuts'){currentOrder.cut = value;}
            if(stepPlugs[currentStep]=='designs'){currentOrder.design = value;}
            if(stepPlugs[currentStep]=='decorations'){currentOrder.decoration = value;}
        }

        // This redraws the selection area.
        this.drawSelections = function(currentStep,productId){
            var html = (currentStep+1)+".) "+steps[currentStep];

            $('.step-header').html(html);

            $.post('http://augusta.lee-allen.com/php/data.ajax.php',
                {
                    productId: productId,
                    data: stepPlugs[currentStep]
                },
                function (response) {
                    $('.app-selection-container').html("");
                    $.each(response,function(key,value){
                        var html = "<div class=\"col-lg-3 app-selection-panel\" data-type=\"product\" data-id=\""+productId+"\">";
                        html = html+"<div class=\"app-selection-data\">";
                        html = html+"<img src=\"img/products/"+value.img+"\"/>";
                        html = html+"<h4>"+value.text+"</h4>";
                        html = html+"</div>";
                        html = html+"</div>";
                        $('.app-selection-container').append(html);
                    });
                }, 'json');

        }


        return this;
    }();





    //Bootstrap the app.
    app.bootstrap();
    $('body').on('click', '.app-selection-panel', function() {
        productId = $(this).data('id');
        app.setCurrentOrder(currentStep,$(this).text());
        currentStep++;
        app.drawSidebar(app.currentOrder,currentStep);
        if(currentStep < steps.length){
            app.drawSelections(currentStep,$(this).data('id'));
            $('.app-selection-panel').not(this).hide();
            $(this).fadeOut(500);
        }else{
            $('.next-button').removeClass('disabled');
            return false;
        }
    });
});