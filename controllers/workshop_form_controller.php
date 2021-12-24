<?php


/*
 * Workshop form controller.
 * nonce: workshop_details_nonce
 */
class workshopFormController {

	/*
	 * process post of a workshop
	 */
	function process_post() {

		global $wpdb;
		$error_message = NULL;
		$updated = NULL;
		$db_error;

		$nonce = $_POST['_wpnonce'];
	
		if ($nonce && wp_verify_nonce($nonce, 'workshop_details_nonce')) {

			$data = array();
			$format = array();

   			$table_name = $wpdb->prefix . "workshops";

			$sql = "SELECT column_name 'Column Name',
				data_type 'Data Type'
				FROM information_schema.columns
				WHERE table_name = '$table_name'";

			$columns = $wpdb->get_results( $sql, ARRAY_A );

			$size = sizeof($columns);
			for($i = 0; $i < $size; ++$i)
			{
				$column_name = $columns[$i]['Column Name'];
				$value = isset($_POST[$column_name]) ? $_POST[$column_name] : '';
				$data_type = $columns[$i]['Data Type'];

				// Special handling for categories
				if ($column_name == 'categories') {
					$categories = array();
					foreach ($_POST as $key => $val) {
						if (strpos($key, 'category_') === 0) {
							array_push($categories, $val);
						}
					}
					$value = implode(',', $categories);
				}

				// Deal with date formatting
				if (strcmp($data_type, "date") == 0) {
					$time = strtotime($value);
					if ($time > 0) {
						$value = date( 'Y-m-d', $time );
					} else {
						$value = "0000-00-00";
					}
				}

				if ($value && strcmp($column_name, 'id') != 0) {
					$data[$column_name] = $value;
					array_push($format, "%s");
				}
			}

			if ($_POST['id']) {
				if ($wpdb->update( $table_name,
					$data,
					array ( 'ID' => $_POST['id']),
					$format) ) {
					$updated = "Updated Workshop";
				} else {
					$db_error = 1;
				}
			} else {
				if ($wpdb->insert( $table_name,
					$data,
					$format) ) {
					$updated = "Added " . $data['title'];
				} else {
					$db_error = 1;
				}
			}

		} else {
			$error_message = "Bad Nonce";
		}

		if ($error_message) {
?>
			<div id="message" class="error below-h2">
			<p><?php echo $error_message; ?></p>
			</div>
<?php
		} else if (isset($db_error)) {
?>
			<div id="message" class="error below-h2">
			<p> 
				Failed to update, database error: <?php $wpdb->print_error(); ?>
			</p>
			</div>
<?php

		} else if ($updated) {
?>
			<div id="message" class="updated below-h2">
			<p><?php echo $updated; ?></p>
			</div>
<?php
		}
	}

};

