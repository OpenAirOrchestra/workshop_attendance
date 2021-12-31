<?php

/*
 * Workshop table view.
 */
class workshopTableView {

	/*
	 * Given an array of query parameters returns the current request
	 * url with given query parameters added/replaced
	 */
	function current_request_with_params($params) {
		$all_params = $_GET;
		foreach ($params as $key => $value) {
			$all_params[$key] = $value;
		}
		$request = $_SERVER['REQUEST_URI'];
		$query = $_SERVER['QUERY_STRING'];
		if (strlen($query)) {
			$request = str_replace( $query, "", $request);
		}
		$sep = "";
		foreach ($all_params as $key => $value) {
			$request = $request . $sep;
			$sep = '&';
			$request = $request . $key . "=" . $value;
		}

		return $request;
	}

	/*
 	 * render subsubsub (all() | attended by me ()
	 */
	function render_subsubsub( $all_count, $my_count ) {
		$current_user = wp_get_current_user();
		$all_url = $this->current_request_with_params( 
				array('attendee' => 0 ) );
		$my_url = $this->current_request_with_params( 
				array('attendee' => $current_user->ID ) );

		$all_class = "current";
		$attended_class = "";
		if (array_key_exists('attendee', $_GET) && $_GET["attendee"] && $_GET["attendee"] == $current_user->ID) {
			$all_class = "";
			$attended_class = "current";
		} 
?>

		<ul class="subsubsub">
			<li class="all">
				<a class="<?php echo $all_class;?>" href="<?php echo $all_url; ?>">All
					<span class="count">(<?php echo $all_count; ?>)</span>
				</a>
				|
			</li>
			<li class="attended">
				<a class="<?php echo $attended_class; ?>" href="<?php echo $my_url; ?>">Attended By 
<?php
			echo $current_user->display_name;
?>
					<span class="count">(<?php echo $my_count; ?>)</span>
				</a>
			</li>
		</ul>
<?php
	}


	/*
 	 * render table navigation top
	 */
	function render_table_nav( $position, $all_count, $filtered_count, $my_count, $limit, $paged ) {
			$total_pages = ceil($filtered_count / $limit);
			
			$first_page = $this->current_request_with_params( 
				array('paged' => 1 ) );

			$prev_page = $first_page;
			if ($paged > 1) {
				$prev_page = $this->current_request_with_params( 
					array('paged' => $paged - 1 ) );
			}
			$last_page = $this->current_request_with_params( 
				array('paged' => $total_pages ) );
			$next_page = $last_page;
			if ($paged < $total_pages) {
				$next_page = $this->current_request_with_params( 
					array('paged' => $paged + 1 ) );
			}

?>
			<div class="tablenav <?php echo $position; ?>">
				<div class="tablenav-pages">
					<span class="displaying-num"><?php echo $filtered_count; ?> items</span>
					<span class="pagination-links">
						<a class="first-page" title="Go to the first page" href="<?php echo $first_page; ?>">&laquo;</a>
						<a class="prev-page" title="Go to the previous page" href="<?php echo $prev_page?>">&lsaquo;</a>
						 <span class='current-pages'>
						 <?php echo $paged; ?>
						</span>	
						 of <span class='total-pages'>
						 <?php echo $total_pages; ?> </span>
						
						<a class="next-page" title="Go to the next page" href="<?php echo $next_page; ?>">&rsaquo;</a>
						<a class="last-page" title="Go to the last page" href="<?php echo $last_page; ?>">&raquo;</a>
					</span>
				</div>
				<br class="clear"/>
			</div>			
<?php
	}

	/*
	 * render th
         */
	function render_th($column, $title, $orderBy, $order) {
		$newOrder = $order;
		if ( strcasecmp($order, 'desc') == 0) {
			$newOrder = 'asc';
		} else {
			$newOrder = 'desc';
		}
		echo '<th class="manage-column column-';
		echo $column;
		if (strcmp($column, $orderBy) == 0) {
			echo ' sorted ';
		} else {
			echo ' sortable ';
		}
		if (strcmp($order, "DESC") == 0) {
			echo ' desc ';
		} else {
			echo ' asc ';
		}
		echo '" scope="col">';
?>
		<a href="<?php 
			echo $this->current_request_with_params( 
				array('orderby' => $column, 'order' => $newOrder ) );
?>">
			<span><?php echo $title; ?></span><span class="sorting-indicator"></span>
		</a>
<?php
		echo "</th>";
		
	}

	/*
 	 * render table header/footer
	 */
	function render_table_header_footer($orderBy, $order) {
?>
		<tr>
<?php
			$this->render_th('title', 'Title', $orderBy, $order); 
			$this->render_th('date', 'Date', $orderBy, $order); 
			$this->render_th('facilitators', 'Facilitators', $orderBy, $order); 
			$this->render_th('categories', 'Categories', $orderBy, $order); 
?>
		</tr>
<?php
	}

	/*
	 * render workshop table body
	 */
	function render_table_body( $workshops ) {
		echo '		<tbody id="the-list">';

		$delete_nonce = wp_create_nonce('delete_nonce');
		$attendance_nonce = wp_create_nonce('attendance_nonce');
		$wp_rest_nonce = wp_create_nonce( 'wp_rest' );

		foreach ($workshops as $workshop)
		{
			$this->render_row($workshop, $delete_nonce, $attendance_nonce, $wp_rest_nonce);
		}
		echo '		</tbody>';
	}

	/*
	 * render a row in workshop table
	 */
	function render_row( $workshop, $delete_nonce, $attendance_nonce, $wp_rest_nonce) {
		$workshop_id = $workshop['id'];
		$view_url = get_admin_url() . "admin.php?page=workshop&workshop=$workshop_id";
		$edit_url = get_admin_url() . "admin.php?page=workshop&workshop=$workshop_id&action=edit";
		$delete_url = get_admin_url() . "admin.php?page=list-workshops&workshop=$workshop_id&action=delete&delete_nonce=$delete_nonce";
		$attendance_url = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(dirname(__FILE__))) . "/attendance.php?workshop=$workshop_id&attendance_nonce=$attendance_nonce";
		$attendance_react_url = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(dirname(__FILE__))) . "/attendance/?event_id=$workshop_id&_wpnonce=$wp_rest_nonce";
?>
		<tr>
			<td class="post-title page-title column-title">
				<strong>
					<a href="<?php echo $view_url; ?>">
					<?php echo stripslashes($workshop['title']); ?>
					</a>
				</strong>
<?php
				if (current_user_can('edit_pages')) {
?>

				<div class="row-actions">
					<span class="edit">
<a href="<?php echo $edit_url; ?>" title="Edit this item">Edit</a> | </span>
					<span class="attendance">
<a href="<?php echo $attendance_url; ?>" title="Take Attendance">Attendance</a> | 
<a href="<?php echo $attendance_react_url; ?>" title="Take Attendance (Alpha)">Attendance (Alpha)</a> | 

</span>

					<span class="trash">
<a href="<?php echo $delete_url; ?>" title="Delete this item">Delete</a> | </span>
					<span class="view">
<a href="<?php echo $view_url; ?>" title="View this item">View</a></span>
				</div>
<?php
				}
?>
			</td>
			<td class="date column-date"><abbr title="<?php echo $workshop['date']; ?>"><?php echo $workshop['date']; ?></abbr></td>
			<td class="facilitators column-facilitators">
			<?php echo stripslashes($workshop['facilitators']); ?> 
			</td>
			<td class="categories column-categories">
			<?php echo stripslashes($workshop['categories']); ?> 
			</td>

		</tr>
<?php
	}

	/*
 	 * Create render table that lists workshops
  	 */
        function render_table( $workshops, $orderBy, $order, $all_count, $filtered_count, $my_count, $limit, $paged ) {
?>
		<?php $this->render_subsubsub( $all_count, $my_count ); ?>
			<?php $this->render_table_nav( "bottom", $all_count, $filtered_count, $my_count, $limit, $paged ); ?>

			<table class="wp-list-table widefat fixt posts" cellspacing="0">
				<thead>
					<?php $this->render_table_header_footer($orderBy, $order); ?>
				</thead>
				<tfoot>
					<?php $this->render_table_header_footer($orderBy, $order); ?>
				</tfoot>
				<?php $this->render_table_body($workshops); ?>

			</table>
			<?php $this->render_table_nav( "bottom", $all_count, $filtered_count, $my_count, $limit, $paged ); ?>

<?php
	}

};

?>
