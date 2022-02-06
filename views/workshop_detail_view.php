<?php


/*
 * Workshop detail view.
 */
class workshopDetailView {

	public 
		$hiddenColumns,
		$privateData,
		$fancyColumnTitles;

	public function __construct() {
		$this->hiddenColumns = array("id", "title", "date");
		$this->privateData = array("donationsdeposited", "payment", "chequenumber");
		$this->fancyColumnTitles = array("donationsdeposited" => "Donations Deposited", 
						"chequenumber" => "Cheque Number");
	}

	/*
	 * render details of a workshop
	 */
	function render_details( $workshop, $columns, $attendees ) {
		$attendance_nonce = wp_create_nonce('attendance_nonce');
		$wp_rest_nonce = wp_create_nonce( 'wp_rest' );

		$workshop_id = $workshop['id'];
		$edit_url = get_admin_url() . "admin.php?page=workshop&workshop=$workshop_id&action=edit";
        $attendance_react_url = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(dirname(__FILE__))) . "/attendance/?event_id=$workshop_id&_wpnonce=$wp_rest_nonce";
		$max_recents = get_option('workshop_attendance_recents_history_length');
		if (isset($max_recents) && is_numeric($max_recents)) {
			$attendance_react_url = $attendance_react_url . "&max_recents=$max_recents";
		}
?>
	<h2><?php echo stripslashes($workshop['title']); ?> 
<?php
	if (current_user_can('edit_pages')) {
?>
		<a class="add-new-h2" href="<?php echo $edit_url; ?>" title="Edit Details">Edit Details</a>
		<a class="add-new-h2" href="<?php echo $attendance_react_url; ?>" title="Take Attendance">Take Attendance</a>
<?php
	}
?>
	</h2>
	<h3><?php echo strftime("%A, %e %B %Y",strtotime($workshop['date'])); ?></h3>
	<div>
<?php
		$size = sizeof($workshop);
		for($i = 0; $i < $size; ++$i)
		{
			$column_name = $columns[$i]['Column Name'];
			if ((! in_array($column_name, $this->hiddenColumns)) 
				&& (('read_private_pages') || (! in_array($column_name, $this->privateData)))
				) {
				$data_type = $columns[$i]['Data Type'];
				$value = $workshop[$column_name];
				$column_title = array_key_exists($column_name, $this->fancyColumnTitles) ? $this->fancyColumnTitles[$column_name] : null;
				if (! $column_title) {
					$column_title = ucwords($column_name);
				}

				if ($value && (strcmp($data_type, "date") == 0)) {
					if (strcmp($value, "0000-00-00") == 0) {
						$value = 0;
					} else {
						$value = strtotime($value);
						if ($value) {
							$value = strftime("%A, %e %B %Y", $value);
						}
					}
				}

				if ($value) {
					$value = stripslashes($value);
					echo "<h4>";
					echo $column_title;
					echo ":</h4>";
					echo "<p>$value</p>";
				}
			}
		}

?>
<?php

		if (count($attendees) > 0) {
?>
			<h4>Attendees </h4>
			<table class="widefat">
			<thead>
				<tr>
					<th>name</th>
<?php
			if (current_user_can('read_private_posts')) {
?>
					<th>email</th>
					<th>phone</th>
<?php
			}
?>
					<th>notes</th>
					<th>new</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>name</th>
<?php
			if (current_user_can('read_private_posts')) {
?>
					<th>email</th>
					<th>phone</th>
<?php
			}
?>
					<th>notes</th>
					<th>new</th>
				</tr>
			</tfoot>
			<tbody>
<?php
			foreach($attendees as $attendee) {
?>
				<tr>
					<td>
						<?php echo stripslashes($attendee['firstname']); ?>
						<?php 
			if (current_user_can('read_private_posts')) {
				echo stripslashes($attendee['lastname']); 
			} else {
				echo substr(stripslashes($attendee['lastname']), 0, 1); 
			}
						?>
					</td>
<?php
			if (current_user_can('read_private_posts')) {
?>
					<td>
						<?php echo $attendee['email']; ?>
					</td>
					<td>
						<?php echo $attendee['phone']; ?>
					</td>
<?php
			}
?>
					<td>
						<?php echo stripslashes($attendee['notes']); ?>
					</td>
					<td>
<?php
			if (! $attendee['user_id']) {
					echo "new";
			}
?>
					</td>
				</td>
<?php
			}
			echo "</tbody>";
			echo "</table>";
		}

?>
	</div>
<?php

	}

};

?>
