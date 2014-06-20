<?php

/*This file is only used to pass some "mock" data back to the primary app. */


$products = array(
    0=>array(
        'product'=>'Shooter Shirt',
        'img'=>'product-shooter-shirt.jpg',
        'cuts'=>array(
            0=> array(
                'text'=>'Shooter Shirt',
                'img'=>'product-shooter-shirt.jpg'
            ),
            1=> array(
                'text'=>'Test Cut 1',
                'img'=>'no-image.jpg'
            ),
            2=> array(
                'text'=>'Test Cut 2',
                'img'=>'no-image.jpg'
            )
        ),
        'designs'=>array(
            0=> array(
                'text'=>'Demolition',
                'img'=>'design-demolition.jpg'
            ),
            1=> array(
                'text'=>'Throttle',
                'img'=>'design-throttle.jpg'
            ),
            2=> array(
                'text'=>'Test Design 1',
                'img'=>'no-image.jpg'
            ),
            3=> array(
                'text'=>'Test Design 2',
                'img'=>'no-image.jpg'
            )
        ),
        'decorations'=>array(
            0=> array(
                'text'=>'Front Mascot - Back 2" & 8"',
                'img'=>'decoration-front-mascot.jpg'
            ),
            1=> array(
                'text'=>'Front Arched 3" - Back 2" & 8"',
                'img'=>'decoration-front-arched.jpg'
            ),
            2=> array(
                'text'=>'Front 3" - Back 2" & 8"',
                'img'=>'decoration-front-3.jpg'
            ),
            3=> array(
                'text'=>'Test Decoration 1',
                'img'=>'no-image.jpg'
            )
        )
    ),
    1=>array(
        'product'=>'Jersey / Short',
        'img'=>'product-jersey-short.jpg'
    ),
    2=>array(
        'product'=>'Test Product 3',
        'img'=>'no-image.jpg'
    ),
    3=>array(
        'product'=>'Test Product 4',
        'img'=>'no-image.jpg'
    )
);



if($_POST['data']=='products'){
    echo json_encode($products);
    die;
}else{
    echo json_encode($products[$_POST['productId']][$_POST['data']]);
}



?>