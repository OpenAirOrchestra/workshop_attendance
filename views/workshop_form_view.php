<?php


/*
 * Workshop form view.
 * nonce: workshop_details_nonce
 */
class workshopFormView {

	public 
		$hiddenColumns,
		$fancyColumnTitles,
		$columnDescriptions,
		$inputTypes;

	public function __construct() {
		$this->hiddenColumns = array("id");
		$this->fancyColumnTitles = array("donationsdeposited" => "Date Donations Deposited", 
						"chequenumber" => "Cheque Number");
		$this->inputTypes = array("notes" => "textarea");
		$this->columnDescriptions = array("date" => "e.g., 04 Dec 2012.");
	}

	/*
	 * render details of a workshop
	 */
	function render_form( $action, $workshop, $columns ) {
?>
	<div>
		<form method="POST" action="<?php echo $action; ?>">
			<table class="form-table">
<?php
		wp_nonce_field('workshop_details_nonce');
		$size = sizeof($columns);
		for($i = 0; $i < $size; ++$i)
		{
			$column_name = $columns[$i]['Column Name'];
			$value = $workshop[$column_name];
			if (in_array($column_name, $this->hiddenColumns)) {
				// Hidden input
?>
				<input id="<?php echo $column_name; ?>"
					type="hidden"
				       name="<?php echo $column_name; ?>"
				       value="<?php echo $value; ?>" />
<?php
			} else {
				echo "<tr>";
				$data_type = $columns[$i]['Data Type'];
				$input_type = $this->inputTypes[$column_name];
				if (! $input_type) {
					$input_type = "text";
				}
				$column_title = $this->fancyColumnTitles[$column_name];
				if (! $column_title) {
					$column_title = ucwords($column_name);
				}

				if ($value && (strcmp($data_type, "date") == 0)) {
					if (strcmp($value, "0000-00-00") == 0) {
						$value = "";
					} else {
						$value = strtotime($value);
						if ($value) {
							$value = strftime("%e %b %Y", $value);
						}
					}
				}
				$column_description = $this->columnDescriptions[$column_name];
?>
				<th>
				<label for="<?php echo $column_name; ?>">
					<?php echo $column_title; ?> :
					<span class="description">
					<?php echo $column_description; ?>
					</span>
				</label>
				</th>
				<td>
<?php
				if (strcmp($input_type, "textarea") == 0) {
?>
					<textarea rows="5" cols="40" 
						id="<?php echo $column_name; ?>"
				       		name="<?php echo $column_name; ?>"><?php echo stripslashes($value); ?></textarea>
<?php
				} else {
?>
					<input class="regular-text" 
					type="<?php echo $input_type; ?>"
					id="<?php echo $column_name; ?>"
				       name="<?php echo $column_name; ?>"
				       value="<?php echo stripslashes($value); ?>" />
<?php
				}
?>
				</td>
			</tr>
<?php
			}
		}

		$button_label = "Add Workshop";
		if ($workshop['id']) {
			$button_label = "Update Workshop Details";
		}
?>
		<tr><th><input class="button-primary" type="submit" name="save" value="<?php echo $button_label; ?>" id="submitbutton" /> </th></tr>
		</table>
	</form>
	</div>
<?php

	}

};

?>
