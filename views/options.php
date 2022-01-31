<?php

/*
 * Renders options page for workshop attendance plugin... admin UI
 */
class workshopAttendanceOptionsView
{

	/*
	 * Render options page
	 */
	function render()
	{
?>
		<div class="wrap">
			<h2>Workshop Attendance Plugin Settings</h2>

			<form method="post" action="options.php">

				<?php settings_fields('workshop-attendance-settings-group'); ?>

				<h3>Recents History Length</h3>

				<p>
					The number of entries in the attendance table that are used when building the
					"Recents" list for taking attendance.
				</p>

				<table class="form-table">
					<tr valign="top">
						<th scope="row">Recents History Length</th>
						<td><input type="number" name="workshop_attendance_recents_history_length" value="<?php echo get_option('workshop_attendance_recents_history_length'); ?>" /></td>
					</tr>
				</table>

				<p class="submit">
					<input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
				</p>

			</form>
		</div>
<?php
	}
}
?>