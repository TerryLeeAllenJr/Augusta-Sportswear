<?php

/*This file is only used to pass some "mock" data back to the primary app. */

switch($_GET['data']){
    case 'products':

        echo json_encode(array(
            0=>array(
                'product'=>'Shooter Shirt',
                'img'=>'product-shooter-shirt.jpg'
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
        ));
        break;
}



?>