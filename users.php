<?php

/*
 * This php is called directly to get a json dump of users.
 */
require_once 'ajaxSetup.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

		
if (! is_user_logged_in()) {
    http_response_code(401);  // Unauthorized
    print('Invalid attendance nonce');
} else {
    $users_arr = array();


    // // set response code - 200 OK
    // http_response_code(200);
            
    // show users data in json format
    echo json_encode($users_arr);
}

?>
