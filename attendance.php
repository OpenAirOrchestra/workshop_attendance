<?php

/*
 * this php is called directly to do iphone friendly attendance form
 */
require_once 'ajaxSetup.php';

/*
 * class to process or render an iphone friendly attendance form
 */
class workshopAttendees {
	
	/*
 	 * Processes posted data
	 */
	function process_post() {

		$attendance_nonce = $_REQUEST['attendance_nonce'];
		if ( wp_verify_nonce($attendance_nonce, 'attendance_nonce') ) {
			if ($_POST['submit']) {
				global $wpdb;

				$workshop_id = $_POST['workshop'];
				
				if (! $workshop_id) {
				
					$table_name = $wpdb->prefix . "workshops";
					$workshop_data = array();
					$workshop_format = array();
	
					$date = date( 'Y-m-d', time() - 8 * 60 * 60 /* we are GMT-8 */);
					$workshop_data['date'] = $date;
					array_push($workshop_format, "%s");

					$title = date( 'l', time() - 8 * 60 * 60 /* we are GMT-8 */ ) . ' Workshop, ' . date( 'j F', time() - 8 * 60 * 60 /* we are GMT-8 */);
					$workshop_data['title'] = $title;
					array_push($workshop_format, "%s");

					$wpdb->insert( $table_name,
						$workshop_data,
						$workshop_format);

					$workshop_id = $wpdb->insert_id;
				}

				$table_name = $wpdb->prefix . "workshop_attendance";

				for ($i = 1; $i < count($_POST); ++ $i) {
				
					$id = $_POST[ 'id_' . $i ];
				
					$attending = $_POST[ 'attending_' . $i ];
					$user_id = $_POST[ 'user_id_' . $i ];
					$firstname = $_POST[ 'firstname_' . $i ];
					$lastname = $_POST[ 'lastname_' . $i ];
					$email = $_POST[ 'email_' . $i ];
					$phone = $_POST[ 'phone_' . $i ];
					$notes = $_POST[ 'notes_' . $i ];

					$data = array();
					$format = array();

					$data['workshopid'] = $workshop_id;
					array_push($format, "%d");
					$data['user_id'] = $user_id;
					array_push($format, "%d");
					$data['firstname'] = $firstname;
					array_push($format, "%s");
					$data['lastname'] = $lastname;
					array_push($format, "%s");
					$data['phone'] = $phone;
					array_push($format, "%s");
					$data['email'] = $email;
					array_push($format, "%s");
					$data['notes'] = $notes;
					array_push($format, "%s");


					if ($attending && !$id && ($user_id || $firstname || $lastname || $email)) {
						$wpdb->insert( $table_name,
							$data,
							$format);
					} else if ($attending && $id) {
						$wpdb->update( $table_name,
							$data,
							array ( 'ID' => $id),
							$format);
					} else if (!$attending && $id) {
						$sql = $wpdb->prepare("DELETE FROM `$table_name` WHERE id = %d", $id);
						$wpdb->query( $sql );
					}

				}

			}
		}
	}

	/* 
	 * Returns users in database rows
	 * sorted by first_name or display_name
	 */
	function recent_users() {
		global $wpdb;

		$sql = $wpdb->prepare("SELECT display_name, u.ID, user_email
								FROM  `wp_users` u
								JOIN  `wp_usermeta` m ON u.id = m.user_id AND m.meta_key =  'first_name'
								JOIN  `wp_usermeta` m2 ON u.id = m2.user_id AND m2.meta_key IN ('wp_capabilities')								
								WHERE u.id <> 1 
								AND u.id IN 
								(
									SELECT DISTINCT a.user_ID
									FROM `wp_workshop_attendance` a
									JOIN `wp_workshops` w ON w.id = a.workshopid 
									AND w.date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
								)
								AND m2.meta_value LIKE '%%author%%'
								ORDER BY COALESCE( NULLIF( m.meta_value,  '' ) , display_name )", $workshop_id);
		$recent_users = $wpdb->get_results( $sql, ARRAY_A );
		return $recent_users;
	}

	function remaining_users() {
		global $wpdb;

		$sql = $wpdb->prepare("SELECT display_name, u.ID, user_email
								FROM  `wp_users` u
								JOIN  `wp_usermeta` m ON u.id = m.user_id AND m.meta_key =  'first_name'
								JOIN  `wp_usermeta` m2 ON u.id = m2.user_id AND m2.meta_key IN ('wp_capabilities')								
								WHERE u.id <> 1 
								AND u.id NOT IN 
								(
									SELECT DISTINCT a.user_ID
									FROM `wp_workshop_attendance` a
									JOIN `wp_workshops` w ON w.id = a.workshopid 
									AND w.date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
								)
								AND m2.meta_value LIKE '%%author%%'
								ORDER BY COALESCE( NULLIF( m.meta_value,  '' ) , display_name )", $workshop_id);
		$remaining_users = $wpdb->get_results( $sql, ARRAY_A );
		return $remaining_users;
	}	

	/* 
	 * Returns attendees of workshop in database rows
	 * sorted by last name
	 */
	function attendee_rows( $workshop_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . "workshop_attendance";

		$sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE workshopid = %d ORDER BY `lastname`", $workshop_id);
		$rows = $wpdb->get_results( $sql, ARRAY_A );

		return $rows;
	}

	/* 
	 * Returns attendees of workshop in an associative array 
	 * indexed by email
	 */
	function attendees( $workshop_id, $rows ) {

		$attendees = array();

		foreach ($rows as $row) {
			if ($row['email']) {
				$attendees[$row['email']] = $row;
			}
		}

		return $attendees;
	}

	/* 
 	 * render page contents for workshop attendees
	 */
	function render_contents( $workshop_id ) {

		global $wpdb;
		$table_name = $wpdb->prefix . "workshops";

		$this->process_post();

		if (! $workshop_id) {
			$today = date( 'Y-m-d', time() - 8 * 60 * 60 /* we are GMT-8 */ );
			$sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE date = %s", $today);
			$workshop = $wpdb->get_row( $sql, ARRAY_A );
			$workshop_id = $workshop['id'];
		}

		if ($workshop_id) {
			$sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE id = %d", $workshop_id);
			$workshop = $wpdb->get_row( $sql, ARRAY_A );

		$url = get_admin_url() . "admin.php?page=workshop&workshop=" . $workshop_id;
?>
		<h1>
			Attendance for 
			<a href="<?php echo $url;?>"><?php echo $workshop['title']; ?></a>
		</h1>
<?php
		} else {
?>
			<h1>Attendance for Today's Workshop</h1>
<?php
		} 


		$attendee_rows = array();

		if ($workshop_id) {
			$attendee_rows = $this->attendee_rows( $workshop_id );
		}

		$this->render_form($workshop_id, $attendee_rows);
	}

	/*
	 * renders form
	 */
	function render_form( $workshop_id, $attendee_rows ) {

		$attendees = $this->attendees( $workshop_id, $attendee_rows );

		global $wpdb;

		$attendance_nonce = wp_create_nonce('attendance_nonce');
?>

	<form method="post" action="<?php echo plugins_url( 'attendance.php', __FILE__ );?>">
		<input type="hidden" name="attendance_nonce" value="<?php echo $attendance_nonce; ?>" />
<?php
		if ($workshop_id) {
?>
		<input type="hidden" name="workshop" value="<?php echo $workshop_id;?>">
<?php
		}

?>
<div class="tabs">
	<ul>
	<li class="current"><a href="#recent"><h2>Recent</h2></a></li>
	<li><a href="#remaining"><h2>Remaining</h2></a></li>
	<li><a href="#newfolks"><h2>New Folks</h2></a></li>
	</ul>
	<div>
	<div id="recent" class="tab-content">
	<table>
<?php
	$count = 0;
	$recent_users = $this->recent_users();
	$rendered_emails = array();
	foreach ($recent_users as $user) {
			$count = $count + 1;
			$name = $user['display_name'];
			$user_info = get_userdata($user['ID']);
			$attendance_info = $attendees[$user['user_email']];
			$checked = '';
			$class = "absent";

			array_push($rendered_emails, $user['user_email']);
			
			if ($attendance_info) {
				$checked = 'checked = "checked"';
				$class = "present";
			}
			if ($user_info->first_name || $user_info->last_name) {
				$name = $user_info->first_name . ' ' . $user_info->last_name;
			}

			
?>
			<tr onclick="selectRow(this)" class="<?php echo $class; ?>"><td>
				<input onclick="checkClicked(this, event)" type="checkbox" name="attending_<?php echo $count; ?>" value="attending" <?php echo $checked; ?> ><?php echo $name; ?></input>
<?php
			if ($user_info->user_description) {
?>
			<div class="details">

				<?php echo $user_info->user_description; ?>
			</div>
<?php
			}
?>
			</td>
			<input type="hidden" name="user_id_<?php echo $count; ?>" value="<?php echo $user['ID']; ?>"/>
<?php
			if ($user_info->first_name) {
?>
				<input type="hidden" name="firstname_<?php echo $count; ?>" value="<?php echo $user_info->first_name; ?>"/>
<?php
			}
			if ($user_info->last_name && strlen($user_info->last_name)) {
?>
				<input type="hidden" name="lastname_<?php echo $count; ?>" value="<?php echo $user_info->last_name; ?>"/>
<?php
			} else {
?>
				<input type="hidden" name="lastname_<?php echo $count; ?>" value="<?php echo $user['display_name']; ?>"/>
<?php
			}
			if ($attendance_info) {
?>
				<input type="hidden" name="id_<?php echo $count; ?>" value="<?php echo $attendance_info["id"]; ?>"/>
<?php
			}
?>
				<input type="hidden" name="email_<?php echo $count; ?>" value="<?php echo $user['user_email']; ?>"/>

			</tr>
<?php
	}
?>
	</table>
	</div>
	<div id="remaining" class="tab-content">
	<table>
<?php
	$remaining_users = $this->remaining_users();
	$rendered_emails = array();
	foreach ($remaining_users as $user) {
			$count = $count + 1;
			$name = $user['display_name'];
			$user_info = get_userdata($user['ID']);
			$attendance_info = $attendees[$user['user_email']];
			$checked = '';
			$class = "absent";

			array_push($rendered_emails, $user['user_email']);
			
			if ($attendance_info) {
				$checked = 'checked = "checked"';
				$class = "present";
			}
			if ($user_info->first_name || $user_info->last_name) {
				$name = $user_info->first_name . ' ' . $user_info->last_name;
			}

			
?>
			<tr onclick="selectRow(this)" class="<?php echo $class; ?>"><td>
				<input onclick="checkClicked(this, event)" type="checkbox" name="attending_<?php echo $count; ?>" value="attending" <?php echo $checked; ?> ><?php echo $name; ?></input>
<?php
			if ($user_info->user_description) {
?>
			<div class="details">

				<?php echo $user_info->user_description; ?>
			</div>
<?php
			}
?>
			</td>
			<input type="hidden" name="user_id_<?php echo $count; ?>" value="<?php echo $user['ID']; ?>"/>
<?php
			if ($user_info->first_name) {
?>
				<input type="hidden" name="firstname_<?php echo $count; ?>" value="<?php echo $user_info->first_name; ?>"/>
<?php
			}
			if ($user_info->last_name && strlen($user_info->last_name)) {
?>
				<input type="hidden" name="lastname_<?php echo $count; ?>" value="<?php echo $user_info->last_name; ?>"/>
<?php
			} else {
?>
				<input type="hidden" name="lastname_<?php echo $count; ?>" value="<?php echo $user['display_name']; ?>"/>
<?php
			}
			if ($attendance_info) {
?>
				<input type="hidden" name="id_<?php echo $count; ?>" value="<?php echo $attendance_info["id"]; ?>"/>
<?php
			}
?>
				<input type="hidden" name="email_<?php echo $count; ?>" value="<?php echo $user['user_email']; ?>"/>

			</tr>
<?php
	}
?>
	</table>
	</div>
	<div id="newfolks" class="tab-content">
	<table>
<?php
	$class = "present";
	foreach ($attendee_rows as $attendee) {
		if (! in_array($attendee['email'], $rendered_emails)) {
			$count = $count + 1;
?>
			<tr onclick="selectRow(this)" class="<?php echo $class; ?>"><td>
				<input onclick="checkClicked(this, event)" type="checkbox" checked="checked" name="attending_<?php echo $count; ?>" value="attending" <?php echo $checked; ?> ><?php echo $attendee['firstname'] . " " . $attendee['lastname']; ?></input>

<?php
			if ($attendee['notes']) {
?>
			<div class="details">

				<?php echo $attendee['notes']; ?>
			</div>
<?php
			}
?>

</td>
				<input type="hidden" name="firstname_<?php echo $count; ?>" value="<?php echo $attendee['firstname']; ?>"/>
				<input type="hidden" name="lastname_<?php echo $count; ?>" value="<?php echo $attendee['lastname']; ?>"/>
				<input type="hidden" name="email_<?php echo $count; ?>" value="<?php echo $attendee['email']; ?>"/>
				<input type="hidden" name="phone_<?php echo $count; ?>" value="<?php echo $attendee['phone']; ?>"/>
				<input type="hidden" name="notes_<?php echo $count; ?>" value="<?php echo stripslashes($attendee['notes']); ?>"/>
				<input type="hidden" name="id_<?php echo $count; ?>" value="<?php echo stripslashes($attendee['id']); ?>"/>


			</tr>
<?php
		}
	}
	$count = $count + 1;
?>
	</table>
	<dl>
				<dt>First Name</dt>
				<dd><input type="text" name="firstname_<?php echo $count; ?>"/></dd>
				<dt>Last Name</dt>
				<dd><input type="text" name="lastname_<?php echo $count; ?>"/></dd>
				<dt>Email</dt>
				<dd><input type="text" name="email_<?php echo $count; ?>"/></dd>
				<dt>Phone</dt>
				<dd><input type="text" name="phone_<?php echo $count; ?>"/></dd>
				<dt>Notes</dt>
				<dd><textarea name="notes_<?php echo $count; ?>"></textarea></dd>
				<input type="hidden" name="attending_<?php echo $count; ?>" value="attending"/>
	</dl>
			<p><input name="submit" type="submit" value="Update Attendance"></p>
	</div>
	</div>	
</div>
<script type="text/javascript">

$(document).ready(function(){
 $(".tabs li").click(function() {
  $(this).parent().parent().find(".tab-content").hide();
  var selected_tab = $(this).find("a").attr("href");
  $(selected_tab).fadeIn();
  $(this).parent().find("li").removeClass('current');
  $(this).addClass("current");
   return false;
    });
});</script>
</form>
<?php
	}

}

// instantiate class
$WORKSHOPATTENDEES = new workshopAttendees;

header("Content-Type: text/html");

$workshop_id = $_REQUEST['workshop'];

?>
<html>
	<head>
		<script type="text/javascript" src="js/attendance.js"></script>
		<link rel="stylesheet" type="text/css" href="css/attendance.css" >
		<link rel="stylesheet" type="text/css" href="css/tab.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<meta name="viewport" content="width=device-width" />
	</head>
<?php
		if ($_POST['submit']) {
?>
	<body onload="window.scrollTo(0, document.height);">
<?php
		} else {
?>
	<body>
<?php
		}
?>
<?php
	if (current_user_can('edit_pages')) {
		$WORKSHOPATTENDEES->render_contents($workshop_id);
	} else {
		echo "<p>Security Error: insufficient privileges</p>";
	}
?>
	</body>
</html>
<?php
?>
