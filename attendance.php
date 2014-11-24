<?php

/*
 * this php is called directly to do iphone friendly attendance form
 */
require_once 'ajaxSetup.php';

/*
 * class to process or render an iphone friendly attendance form
 */
class workshopAttendees {
	
	private $count = 0;  //tracks attendee count
	/*
 	 * Processes posted data
 	 * Returns diagnostics
	 */
	function process_post() {

		$diagnostics = "";

		$attendance_nonce = $_REQUEST['attendance_nonce'];
		
		if ( wp_verify_nonce($attendance_nonce, 'attendance_nonce') ) {
			if ($_POST['Update']) {
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

				$count = $_POST['count'];

				if ($count <= 0) {
					$count = count($_POST);
				}
				// Evil hacker limit
				if ($count > 10000) {
					$count = 10000;
				}

				for ($i = 1; $i < $count; ++ $i) {

					$diagnostics = $diagnostics . $i . "\n";
				
					$id = $_POST[ 'id_' . $i ];
				
					$attending = $_POST[ 'attending_' . $i ];
					$user_id = $_POST[ 'user_id_' . $i ];
					$firstname = $_POST[ 'firstname_' . $i ];
					$lastname = $_POST[ 'lastname_' . $i ];
					$email = $_POST[ 'email_' . $i ];
					$phone = $_POST[ 'phone_' . $i ];
					$notes = $_POST[ 'notes_' . $i ];
					if ($firstname != "First Name (Required)") //don't insert New Folk data if first name not entered
					{
						$diagnostics = $diagnostics . $firstname . "\n";
						$data = array();
						$format = array();
						
						//none of these are required so clear if not changed
						if ($lastname == "Last Name") {$lastname = "";}
						if ($email == "Email") {$email = "";}
						if ($phone == "Phone") {$phone = "";}
				
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
							$diagnostics = $diagnostics . " INSERT \n";
						} else if ($attending && $id) {
							$wpdb->update( $table_name,
								$data,
								array ( 'ID' => $id),
								$format);
							$diagnostics = $diagnostics . " UPDATE \n";
						} else if (!$attending && $id) {
							$sql = $wpdb->prepare("DELETE FROM `$table_name` WHERE id = %d", $id);
							$wpdb->query( $sql );
							$diagnostics = $diagnostics . " DELETE \n";
						} else {
							$diagnostics = $diagnostics . " UNCHANGED \n";
						}
					} else {
						$diagnostics = $diagnostics . "Missing First Name \n SKIP\n";
					}
				}
				
			}
		}
		return $diagnostics;
	}

	/* 
	 * Returns users in database rows
	 * sorted by first_name or display_name
	 *
	 * filtered by recent attendance if a
	 * type is specified ('recent' or 'remaining')
	 */
	function users($type = NULL) {
		global $wpdb;

		$users_name = $wpdb->prefix . "users";
		$usermeta_name = $wpdb->prefix . "usermeta";
		$workshop_attendance_name = $wpdb->prefix . "workshop_attendance";
		$workshops_name = $wpdb->prefix . "workshops";

		// Unfiltered users sql query.
		$sql = $wpdb->prepare("SELECT display_name, u.ID, user_email
								FROM  `$users_name` u
								JOIN  `$usermeta_name` m ON u.id = m.user_id AND m.meta_key =  'first_name'
								JOIN  `$usermeta_name` m2 ON u.id = m2.user_id AND m2.meta_key IN ('wp_capabilities')								
								WHERE u.id <> 1 
								AND 
									(
										m2.meta_value LIKE '%%author%%'
										OR m2.meta_value LIKE '%%editor%%'
										OR m2.meta_value LIKE '%%administrator%%'
									)
								ORDER BY COALESCE( NULLIF( m.meta_value,  '' ) , display_name )", $workshop_id);

		if ($type == "remaining" || $type == "recent") {
			// Filtered users sql query.
			$sqlFilter = ""; //$type == "recent"
			if ($type == "remaining")
			{
				$sqlFilter = "NOT";
			}
			$sql = $wpdb->prepare("SELECT display_name, u.ID, user_email
									FROM  `$users_name` u
									JOIN  `$usermeta_name` m ON u.id = m.user_id AND m.meta_key =  'first_name'
									JOIN  `$usermeta_name` m2 ON u.id = m2.user_id AND m2.meta_key IN ('wp_capabilities')								
									WHERE u.id <> 1 
									AND u.id " . $sqlFilter . " IN 
									(
										SELECT DISTINCT a.user_ID
										FROM `$workshop_attendance_name` a
										JOIN `$workshops_name` w ON w.id = a.workshopid 
										AND w.date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
										AND w.date < DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
									)
									AND 
										(
											m2.meta_value LIKE '%%author%%'
											OR m2.meta_value LIKE '%%editor%%'
											OR m2.meta_value LIKE '%%administrator%%'
										)
									ORDER BY COALESCE( NULLIF( m.meta_value,  '' ) , display_name )", $workshop_id);
		}
		
		$users = $wpdb->get_results( $sql, ARRAY_A );
		return $users;
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

		$post_diagnostics = $this->process_post();

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
		
		$this->render_form($workshop_id, $attendee_rows, $post_diagnostics);
	}

	/*
	 * render attendee tab, recent or remaining
	 * returns updated rendered_emails array.
	 */
	function render_attendees($type, $attendees, $rendered_emails)
	{
?>
		<table>
<?php
		$users = array();
		
		// Use database to filter if we are rendering
		$users = $this->users($type);

		foreach ($users as $user) {
			$this->count = $this->count + 1;
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
				<input onclick="checkClicked(this, event)" type="checkbox" name="attending_<?php echo $this->count; ?>" value="attending" <?php echo $checked; ?> ><?php echo $name; ?></input>
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
			<input type="hidden" disabled = "disabled" name="user_id_<?php echo $this->count; ?>" value="<?php echo $user['ID']; ?>"/>
<?php
			if ($user_info->first_name) {
?>
				<input type="hidden" disabled = "disabled" name="firstname_<?php echo $this->count; ?>" value="<?php echo $user_info->first_name; ?>"/>
<?php
			}
			if ($user_info->last_name && strlen($user_info->last_name)) {
?>
				<input type="hidden" disabled = "disabled" name="lastname_<?php echo $this->count; ?>" value="<?php echo $user_info->last_name; ?>"/>
<?php
			} else {
?>
				<input type="hidden" disabled = "disabled" name="lastname_<?php echo $this->count; ?>" value="<?php echo $user['display_name']; ?>"/>
<?php
			}
			if ($attendance_info) {
?>
				<input type="hidden" disabled = "disabled" name="id_<?php echo $this->count; ?>" value="<?php echo $attendance_info["id"]; ?>"/>
<?php
			}
?>
				<input type="hidden" disabled = "disabled" name="email_<?php echo $this->count; ?>" value="<?php echo $user['user_email']; ?>"/>
			</tr>
<?php
		
		}
?>
		</table>
<?php
		return $rendered_emails;
	}
	
	/*
	 * renders form
	 */
	function render_form( $workshop_id, $attendee_rows, $post_diagnostics ) {

		$attendees = $this->attendees( $workshop_id, $attendee_rows );

		global $wpdb;
		$attendance_nonce = wp_create_nonce('attendance_nonce');
?>

	<form method="post" action="<?php echo plugins_url( 'attendance.php', __FILE__ );?>">
		<input type="hidden" name="attendance_nonce" value="<?php echo $attendance_nonce; ?>" />
		<input id="Update" type="submit" name="Update" value="Update">
<?php
		if ($workshop_id) {
?>
		<input type="hidden" name="workshop" value="<?php echo $workshop_id;?>">
<?php
		}
?>
<br>
<br>
<div class="tabs">
	<ul>
<?php 
	if (isset($_POST['current_tab']))	
	{
		$current_tab = $_POST['current_tab'];
	}
	else
	{
		$current_tab = "#recent";
	}
?>
	<input type="hidden" id="current_tab" name="current_tab" value="<?php echo $current_tab;?>" />
	<li><a href="#recent"><h3>Recent</h3></a></li>
	<li><a href="#remaining"><h3>Remaining</h3></a></li>
	<li><a href="#newfolks"><h3>New Folks</h3></a></li>
	<!-- <li><a href="#diagnostics"><h4>Diagnostics</h4></a></li> -->
	</ul>
	<div>
	<div id="recent" class="tab-content">
<?php
	$rendered_emails = array();
	$rendered_emails = $this->render_attendees("recent", $attendees, $rendered_emails);
?>	
	</div>
	<div id="remaining" class="tab-content">
<?php
	$rendered_emails = $this->render_attendees("remaining", $attendees, $rendered_emails);
	$this->count = $this->count + 1;
?>	
	</div>
	<div id="newfolks" class="tab-content">
	<dl>
				<dd><input type="text" name="firstname_<?php echo $this->count; ?>" title="First Name (Required)"/></dd>
				<dd><input type="text" name="lastname_<?php echo $this->count; ?>" title="Last Name"/></dd>
				<dd><input type="text" name="email_<?php echo $this->count; ?>" title="Email"/></dd>
				<dd><input type="text" name="phone_<?php echo $this->count; ?>" title="Phone"/></dd>
				<dd>Notes<br><textarea name="notes_<?php echo $this->count; ?>"></textarea></dd>
				<input type="hidden" name="attending_<?php echo $this->count; ?>" value="attending"/>
	</dl>
	<table>
<?php
	$class = "present";
	foreach ($attendee_rows as $attendee) {
		if (! in_array($attendee['email'], $rendered_emails)) {
			$this->count = $this->count + 1;
?>
			<tr onclick="selectRow(this)" class="<?php echo $class; ?>"><td>
				<input onclick="checkClicked(this, event)" type="checkbox" checked="checked" name="attending_<?php echo $this->count; ?>" value="attending" <?php echo $checked; ?> ><?php echo $attendee['firstname'] . " " . $attendee['lastname']; ?></input>
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
				<input type="hidden" disabled = "disabled" name="user_id_<?php echo $this->count; ?>" value="<?php echo $attendee['user_id']; ?>"/>
				<input type="hidden" disabled = "disabled" name="firstname_<?php echo $this->count; ?>" value="<?php echo $attendee['firstname']; ?>"/>
				<input type="hidden" disabled = "disabled" name="lastname_<?php echo $this->count; ?>" value="<?php echo $attendee['lastname']; ?>"/>
				<input type="hidden" disabled = "disabled" name="email_<?php echo $this->count; ?>" value="<?php echo $attendee['email']; ?>"/>
				<input type="hidden" disabled = "disabled" name="phone_<?php echo $this->count; ?>" value="<?php echo $attendee['phone']; ?>"/>
				<input type="hidden" disabled = "disabled" name="notes_<?php echo $this->count; ?>" value="<?php echo stripslashes($attendee['notes']); ?>"/>
				<input type="hidden" disabled = "disabled" name="id_<?php echo $this->count; ?>" value="<?php echo stripslashes($attendee['id']); ?>"/>
			</tr>
<?php
		}
	}
	$this->count = $this->count + 1;
?>
	</table>
	</div>
	
<!-- <div id="diagnostics" class="tab-content"> -->
<?php
	// $this->render_diagnostics( $post_diagnostics );
?>	
	<!-- </div> -->
	</div>	
</div>
<input type="hidden" name="count" value="<?php echo $this->count; ?>"/>
<script type="text/javascript">

$(".tab-content").hide();
$("<?php echo $current_tab; ?>").fadeIn();
var selected_tab = $("a[href='<?php echo $current_tab; ?>']").parent();
selected_tab.addClass("current");

$(document).ready(function(){
	//tab functionality
	$(".tabs li").click(function() {
		$(this).parent().parent().find(".tab-content").hide();
		var selected_tab = $(this).find("a").attr("href");
		$(selected_tab).fadeIn();
		$(this).parent().find("li").removeClass('current');
		$(this).addClass("current");
		$("input#current_tab").val(selected_tab);
		return false;
    });

	//grey input functionality
    var inputs = $('input[type=text]');
    inputs.each(function(){
        $(this).val($(this).attr('title')).addClass('unfocused');
    });
    inputs.focus(function(){
        var input = $(this);
        if(input.val() == input.attr('title')){
            $(this).removeClass('unfocused').val('');
        }
    });
    inputs.blur(function(){
        var input = $(this);
        if(input.val() == ''){ // User has not placed text
            input.val(input.attr('title')).addClass('unfocused');
        }
    }); 	
});</script>
</form>
<?php
	}

	/*
  	 * Renders diagnostics
	 */
	function render_diagnostics( $post_diagnostics ) {
?>	
		<div class="diagnostics">
		<h4>raw post</h4>
		<pre>
<?php
		
		var_dump($_POST);	
?>	
		</pre>
		<h4>post processing diagnostics</h4>
		<pre>
			<?php echo $post_diagnostics; ?>
		</pre>
		</div>
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
		<script type="text/javascript" src="js/formUI.js"></script>
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
