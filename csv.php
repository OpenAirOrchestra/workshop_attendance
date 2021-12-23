<?php

/*
 * this php is called directly to do csv export of data.
 */
require_once 'ajaxSetup.php';

$Filename = "data.csv";

$workshop_export = isset($_POST['workshop_export']) ? $_POST['workshop_export'] : null;
$attendance_export = isset($_POST['attendance_export']) ? $_POST['attendance_export'] : null;

if ($workshop_export) {
	$Filename = "workshops.csv";
} else if ($attendance_export) {
	$Filename = "attendance.csv";
}

header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=$Filename");


// verify nonce and user permissions
if (! wp_verify_nonce($_POST['export_nonce'], 'export_nonce') ) {

	echo '"security failure", "nonce"';

} else if (! current_user_can('read_private_pages')) { 

	echo '"security failure", "user cannot view private pages"';

} else {

	$to = $_POST['to'];
	$from = $_POST['from'];

	// transform dates.
	$time = strtotime($from);
	if ($time > 0) {
		$from = date( 'Y-m-d', $time );
	} else {
		$from = "0000-00-00";
	}
	$time = strtotime($to);
	if ($time > 0) {
		$to = date( 'Y-m-d', $time );
	} else {
		$to = date( 'Y-m-d' );
	}
 
	// sql query.
	global $wpdb;

	$sql = "";
	$rows = array();
	$hiddenColumns = array();
	$columns = array();

	if ($workshop_export) {

 		$hiddenColumns = array("id");
                $fancyColumnTitles = array("donationsdeposited" => "Donations Deposited", 
			"chequenumber" => "Cheque Number");

		$table_name = $wpdb->prefix . "workshops";

		// Titles
		$sql = "SELECT column_name 'Column Name'
			FROM information_schema.columns
			WHERE table_name = '$table_name'";
		$columns = $wpdb->get_results( $sql, ARRAY_A );

		// data
		$sql = $wpdb->prepare("
					SELECT * FROM `$table_name` 
					WHERE `date` >= %s 
					AND `date` <= %s ORDER BY `date`
					", $from, $to);

		$rows = $wpdb->get_results( $sql, ARRAY_A );

	} else {
		// attendance

 		$hiddenColumns = array("id", "workshopid");

		$workshop_table = $wpdb->prefix . "workshops";
		$attendance_table = $wpdb->prefix . "workshop_attendance";

		// Titles
		$columns = array( array("Column Name" => "Date") );

		$sql = "SELECT column_name 'Column Name'
			FROM information_schema.columns
			WHERE table_name = '$attendance_table'";
		$columns = array_merge($columns, $wpdb->get_results( $sql, ARRAY_A ));

		$sql = $wpdb->prepare("
			SELECT $workshop_table.date, $attendance_table . * 
			FROM  `$workshop_table` ,  `$attendance_table` 
			WHERE $workshop_table.id = $attendance_table.workshopid
			AND
			$workshop_table.date >= %s AND $workshop_table.date <= %s 
		        ORDER BY $workshop_table.date
			", $from, $to);

		$rows = $wpdb->get_results( $sql, ARRAY_A );

	}

	$sep = "";
	foreach($columns as $column) {
		$column_name = $column['Column Name'];
		if (! in_array($column_name, $hiddenColumns)) {
			$column_title = isset($fancyColumnTitles[$column_name]) ? $fancyColumnTitles[$column_name] : null;
			if (! $column_title) {
				$column_title = ucwords($column_name);
			}

			echo $sep;
			echo "\"" . stripslashes($column_title) . "\"";
			$sep = ",";
		}
	}
	echo "\n";

	// iterate over rows
	foreach ($rows as $row) {
		$sep = "";
		foreach($row as $column_name=>$field) {
			if (! in_array($column_name, $hiddenColumns)) {
				echo $sep;

  				// handle NULL
                                if ($field != NULL) {
                                        // escape " character in field
                                        $field = str_replace("\"", "\"\"", $field);
                                        // strip newlines in field
                                        $field = str_replace(array('\n', '\r'), " ", $field);

                                }
                                echo "\"" . stripslashes($field) . "\"";
				$sep = ",";
			}
		}
		echo "\n";
	}
}
