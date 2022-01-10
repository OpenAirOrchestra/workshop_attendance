<?php
/**
 * Plugin Name: Workshop Attendance
 * Plugin URI: https://github.com/OpenAirOrchestra/workshop_attendance
 * Description: A simple workshop attendance plugin for the carnival band
 * Version: 1.5.14
 * Author: DarrylF
 * Author URI: http://www.thecarnivalband.com
 * License: GPL2
 * GitHub Plugin URI: https://github.com/OpenAirOrchestra/workshop_attendance
 **/
?>
<?php
/*  Copyright 2011  DarrylF (email : oaowebmonkey@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

require_once( dirname(__FILE__) . '/views/workshop_table_view.php');
require_once( dirname(__FILE__) . '/views/workshop_detail_view.php');
require_once( dirname(__FILE__) . '/views/workshop_form_view.php');
require_once( dirname(__FILE__) . '/controllers/workshop_form_controller.php');
require_once( dirname(__FILE__) . '/controllers/workshop_rest_controller.php');
require_once( dirname(__FILE__) . '/controllers/attendance_rest_controller.php');
require_once( dirname(__FILE__) . '/controllers/users_rest_controller.php');

/*
 * Main class for Workshop attandance Handles activation, hooks, etc.
 */
class workshopAttendance {

	public $workshopTableView;
	public $workshopDetailView;
	public $workshopFormView;
	public $workshopFormController;

	/*
	 * returns "add new" link URI
	 */
	function add_new_uri() {
		$request = get_admin_url() . "admin.php?page=new-workshop";
		return $request;
	}

	/*
	 * returns "list" link URI
	 */
	function list_uri() {
		$request = get_admin_url() . "admin.php?page=list-workshops";
		return $request;
	}

	/*
	 * Process workshop post data
	 */
	function process_post() {
		if (current_user_can('edit_pages')) {
			$nonce = array_key_exists('_wpnonce', $_POST) ? $_POST['_wpnonce'] : null;
			if ($nonce && wp_verify_nonce($nonce, 'workshop_details_nonce')) {
				// Process post
				$this->workshopFormController = new workshopFormController;
				$this->workshopFormController->process_post();
			}
		}
	}

	/*
	 * Create a page that allows export of workshop details and attendance 
	 */
	function export_workshops() {

		$export_nonce = wp_create_nonce('export_nonce');
		$export_url = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(__FILE__)) . "/csv.php";
		$today = date("j M o", time() - 8 * 60 * 60 /* we are GMT-8 */);
		$long_ago = ("1 Jan 2001");
?>
	<div class="wrap">
		<div id="icon-tools" class="icon32"><br/></div>
		<h2>Export Workshops</h2>

		<p>
		When you click one of the buttons below, 
		the Workshop Attendance plugin will create a 
		comma separated value file (CSV) for you to save to
		your computer.
		</p>
		<p>
		Once you have saved this file, you should be able to
		load it into the spreadsheet software of your choice.
		</p>

		<h3>Export Workshop Details</h3>

		<p>Export workshop details for a range of dates:</p>

		<form method="POST" action="<?php echo $export_url; ?>">
			<input type="hidden" name="export_nonce"
				       value="<?php echo $export_nonce; ?>" />
		
			<label for="from">From:</label>
			<input name="from" value="<?php echo $long_ago; ?>" />
			<label for="from">To:</label>
			<input name="to" value="<?php echo $today; ?>" />
				

			
			<input class="button" type="submit" name="workshop_export" value="Download Export File" id="submitbutton" /> </th></tr>
		</form>

		<h3>Export Workshop Attendance</h3>
		<p>Export workshop attendance for a range of dates:</p>

		<form method="POST" action="<?php echo $export_url; ?>">
			<input type="hidden" name="export_nonce"
				       value="<?php echo $export_nonce; ?>" />
		
			<label for="from">From:</label>
			<input name="from" value="<?php echo $long_ago; ?>" />
			<label for="from">To:</label>
			<input name="to" value="<?php echo $today; ?>" />
				

			
			<input class="button" type="submit" name="attendance_export" value="Download Export File" id="submitbutton" /> </th></tr>
		</form>
	<div>
<?php
	}

	/*
	 * Create a page that views, edits, or does attendance for a workshop
	 */
	function workshop_details() {
		$workshop_id = array_key_exists('workshop', $_GET) ? intval($_GET['workshop']) : 0;
		
?>
	<div class="wrap">
<?php
		global $wpdb;
		$table_name = $wpdb->prefix . "workshops";

		if (! $workshop_id) {
			$today = date( 'Y-m-d' , time() - 8 * 60 * 60 /* we are GMT-8 */);
			$sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE date = %s ORDER BY id DESC", $today);
			$workshop = $wpdb->get_row( $sql, ARRAY_A );
			$workshop_id = $workshop ? $workshop['id'] : 0;
		}

		if (! $workshop_id) {
			$attendance_nonce = wp_create_nonce('attendance_nonce');
			$wp_rest_nonce = wp_create_nonce( 'wp_rest' );
			
			$attendance_url = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(__FILE__)) . "/attendance.php?attendance_nonce=$attendance_nonce";
			$attendance_react_url = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(__FILE__)) . "/attendance/?_wpnonce=$wp_rest_nonce";
?>
			<div id="icon-edit" class="icon32"><br/></div>
			<h2>Today's Workshop
<?php
			if (current_user_can('edit_pages')) {
?>
				<a class="add-new-h2" href="<?php echo $this->add_new_uri() ?>">Edit Details</a>
				<a class="add-new-h2" href="<?php echo $attendance_url; ?>" title="Take Attendance">Take Attendance</a>
				<a class="add-new-h2" href="<?php echo $attendance_react_url; ?>" title="Take Attendance (Alpha)" >Take Attendance (Alpha)</a>
<?php
			}
?>
	
			</h2>
<?php
			$this->process_post();

		} else {
			 if (array_key_exists('action', $_GET) && strcasecmp($_GET["action"], 'edit') == 0 &&
				current_user_can('edit_pages')) {
?>
				<div id="icon-edit" class="icon32"><br/></div>
				<h2>Edit Workshop</h2>
<?php
				$this->process_post();
			}

			$sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE id = %d", $workshop_id);
			$workshop = $wpdb->get_row( $sql, ARRAY_A );

			$sql = "SELECT column_name 'Column Name',
				data_type 'Data Type'
				FROM information_schema.columns
				WHERE table_name = '$table_name'";

			$columns = $wpdb->get_results( $sql, ARRAY_A );

			 if (array_key_exists('action', $_GET) && strcasecmp($_GET["action"], 'edit') == 0 &&
				current_user_can('edit_pages')) {
				$this->workshopFormView = new workshopFormView;
				$this->workshopFormView->render_form($_SERVER['REQUEST_URI'], $workshop, $columns);
			} else {
			
   				$table_name = $wpdb->prefix . "workshop_attendance";
				$sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE workshopid = %d ORDER BY `lastname`", $workshop_id);
				$attendees = $wpdb->get_results( $sql, ARRAY_A );

				$this->workshopDetailView = new workshopDetailView;
				$this->workshopDetailView->render_details($workshop, $columns, $attendees);
			}
		}
?>

	</div>
<?php
	}

	/// Rough time of day (morning, afternoon, evening, night) from hours
	function roughTimeOfDay($hours)
	{
		if ($hours < 12) {
			return "Morning";
		}

		if ($hours < 17) {
			return "Afternoon";
		}

		if ($hours < 20) {
			return "Evening";
		}

		return "Night";
	}

	/*
	 * Create a page to create a new workshop 
	 */
	function new_workshop() {
		if (current_user_can('edit_pages')) {
?>
	<div class="wrap">
		<div id="icon-edit" class="icon32"><br/></div>
		<h2>New Workshop</h2>
<?php

		global $wpdb;
		$table_name = $wpdb->prefix . "workshops";
		$sql = "SELECT column_name 'Column Name',
			data_type 'Data Type'
			FROM information_schema.columns
			WHERE table_name = '$table_name'";

		$columns = $wpdb->get_results( $sql, ARRAY_A );

		$hours = date("H", time() - 8 * 60 * 60 /* we are GMT-8 */);

		$workshop = array( 'date' => date("j M o", time() - 8 * 60 * 60 /* we are GMT-8 */),
				   'title' => date("l", time() - 8 * 60 * 60 /* we are GMT-8 */) . " " . $this->roughTimeOfDay($hours) . " Workshop, " . date("jS F Y", time() - 8 * 60 * 60 /* we are GMT-8 */));
		$this->workshopFormView = new workshopFormView;
		$this->workshopFormView->render_form($this->list_uri(), $workshop, $columns);
?>

	</div>
<?php
	  }
	}

	/*
 	 * Delete a workshop
 	 */
	function delete_workshop($workshop_id) {
		if (current_user_can('delete_pages')) {
			global $wpdb;
			$table_name = $wpdb->prefix . "workshops";

			$sql = $wpdb->prepare("DELETE FROM `$table_name` WHERE id = %d", $workshop_id);
			$wpdb->query($sql);

			$table_name = $wpdb->prefix . "workshop_attendance";
			$sql = $wpdb->prepare("DELETE FROM `$table_name` WHERE workshopid = %d", $workshop_id);
			$wpdb->query($sql);
		}
	}

	/*
 	 * Create tools page that lists workshops
  	 */
        function list_workshops() {

?>
	<div class="wrap">
		<div id="icon-edit" class="icon32"><br/></div>
		<h2>Workshops 
<?php
		if (current_user_can('edit_pages')) {
?>
			<a class="add-new-h2" href="<?php echo $this->add_new_uri() ?>">Add New</a>
<?php
		}
?>
		</h2>

<?php
		$this->process_post();

		 global $wpdb;

		 if (array_key_exists('action', $_GET) && strcasecmp($_GET["action"], 'delete') == 0) {
			$delete_nonce = $_GET["delete_nonce"];
			$workshop_id = $_GET["workshop"];
			if ($workshop_id && $delete_nonce && 
				wp_verify_nonce($delete_nonce, "delete_nonce")) {

				$this->delete_workshop($workshop_id);

			}
		 }

		// orderby=title&order=asc

		$orderBy = 'date';
		$order = 'DESC';
		if ((array_key_exists('orderby', $_GET) && strcasecmp($_GET["orderby"], 'title') == 0) ||
		(array_key_exists('orderby', $_GET) && strcasecmp($_GET["orderby"], 'facilitators') == 0) || 
		(array_key_exists('orderby', $_GET) && strcasecmp($_GET["orderby"], 'categories') == 0)) {
			$orderBy = strtolower($_GET["orderby"]);
		}
		if (array_key_exists('order', $_GET) && strcasecmp($_GET["order"], 'asc') == 0) {
			$order = "ASC";
		}
		
		$paged = 1;
		if (array_key_exists('paged', $_GET) && $_GET["paged"]) {
			$paged = intval($_GET['paged']);
			if ($paged < 1) {
				$paged = 1;
			}
		}

		$limit = 31;
		$offset = $limit * ($paged - 1);

		$attendee = 0;
		$current_user = wp_get_current_user();

   		$table_name = $wpdb->prefix . "workshops";
	
		$all_count = $wpdb->get_var( "SELECT COUNT(*) FROM $table_name;" );
		$filtered_count = $all_count;

		$sql = $wpdb->prepare("SELECT * FROM `$table_name` ORDER BY `$table_name`.`$orderBy` $order LIMIT %d, %d", $offset, $limit);
 
		if (array_key_exists('attendee', $_GET) && $_GET["attendee"]) {
			$attendee = intval($_GET['attendee']);
		}
		if ($attendee > 0) {
   			$attendance_table_name = $wpdb->prefix . "workshop_attendance";

			$sql = $wpdb->prepare("
				SELECT * 
				FROM $attendance_table_name, $table_name
				WHERE 
					$attendance_table_name.user_id = %d
				AND 
					$table_name.id = $attendance_table_name.workshopid
				", $attendee);
		}
		$rows = $wpdb->get_results( $sql, ARRAY_A );


		$table_name = $wpdb->prefix . "workshop_attendance";

		$sql =  $wpdb->prepare( "SELECT COUNT(*) FROM $table_name WHERE `user_id` = %d;", $current_user->ID );
		$my_count = $wpdb->get_var( $sql  );

		$this->workshopTableView = new workshopTableView;
		$this->workshopTableView->render_table( $rows, $orderBy, $order, $all_count, $filtered_count, $my_count, $limit, $paged );
?>

	</div>
<?php
	}



	/*
     * Create admin menu(s) for this plugin.  
         * Create admin menu(s) for this plugin.  
     * Create admin menu(s) for this plugin.  
     */
	function create_admin_menu()
	{

		// Add menu page
		add_menu_page('Workshops', 'Workshops', 'read', 'list-workshops', array($this, 'list_workshops'), plugins_url('images/music-stand.png', __FILE__));

		add_submenu_page('list-workshops', "Add New Workshop", "Add New", 'edit_others_pages', 'new-workshop', array($this, 'new_workshop'));

		add_submenu_page('list-workshops', "View Workshop", "Newest Workshop Today", 'read', 'workshop', array($this, 'workshop_details'));

		// Add tools page
		add_management_page('Export Workshops', 'Export Workshops', 'read_private_pages', 'export-workshops', array($this, 'export_workshops'));
	}

	/*
	 * Plugin is being activated
 	 * Here we will create tables needed for attendance
 	 */
	function activate()
	{

		global $wpdb;


		// Database version option

		// Create workshops table
		$table_name = $wpdb->prefix . "workshops";
		$sql = "CREATE TABLE $table_name (
  			id mediumint(9) NOT NULL AUTO_INCREMENT,
  			date date DEFAULT '0000-00-00' NOT NULL,
  			title text ,
			categories text,
  			donations text ,
  			donationsdeposited date DEFAULT '0000-00-00',
  			facilitators text ,
  			payment text ,
  			chequenumber text ,
  			notes text ,
  			UNIQUE KEY id (id) );";

		dbDelta($sql);

		// Create workshop_attendance table
		$table_name = $wpdb->prefix . "workshop_attendance";

		$sql = "CREATE TABLE $table_name (
  			id mediumint(9) NOT NULL AUTO_INCREMENT,
  			workshopid mediumint(9) NOT NULL,
			user_id bigint(20),
  			firstname text ,
  			lastname text ,
  			phone text ,
  			email text ,
  			notes text ,
  			UNIQUE KEY id (id) );";

		dbDelta($sql);
	}

};

// instantiate classes
$WORKSHOPATTENDANCE = new workshopAttendance;

add_action('admin_menu', array($WORKSHOPATTENDANCE, 'create_admin_menu'));

register_activation_hook(__FILE__, array($WORKSHOPATTENDANCE, 'activate'));

$WORKSHOP_REST_CONTROLLER = new workshopAttendanceWorkshopRestController;
add_action('rest_api_init', array($WORKSHOP_REST_CONTROLLER, 'register_routes'));

$ATTENDANCE_REST_CONTROLLER = new workshopAttendanceAttendanceRestController;
add_action('rest_api_init', array($ATTENDANCE_REST_CONTROLLER, 'register_routes'));

$USER_REST_CONTROLLER = new workshopAttendanceUsersRestController;
add_action('rest_api_init', array($USER_REST_CONTROLLER, 'register_routes'));

?>
