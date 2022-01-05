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
		$this->inputTypes = array("notes" => "textarea", "date" => "date", "donationsdeposited" => "date");
		$this->columnDescriptions = array("date" => "e.g., 2021-01-24.", "donationsdeposited" => "e.g., 2021-01-24.");
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
			$value = isset($workshop[$column_name]) ? $workshop[$column_name] : '';
			if (in_array($column_name, $this->hiddenColumns)) {
				// Hidden input
?>
				<input id="<?php echo $column_name; ?>"
					type="hidden"
				       name="<?php echo $column_name; ?>"
				       value="<?php echo $value; ?>" />
<?php
			} else if ($column_name == 'categories') {
				// Special handling for categories.

				$value = isset($workshop[$column_name]) ? $workshop[$column_name] : '';
				$values = isset($value) ? explode(',', $value) : array();

				// echo "<tr><th>DFDF  ==> DEBUG: " . $value . " " . $values[0] . "</th></tr>";

				echo "<tr><th>Categories :</th>";
				echo "<td><fieldset>";

				$categories = get_terms('events', array('hide_empty' => false));
				foreach ($categories as $category) {
					$category_id = "category_" . $category->term_id;
					$checked = in_array($category->name, $values) ? 'checked=true' : '';

					$input =  '<input type="checkbox" id="' . $category_id . '" name="' . $category_id . '" value="' . $category->name . '" ' . $checked .'/>';
					$label = '<label for="' . $category_id . '">' .  $category->name . '</label>';

					echo $input;
					echo $label;
					echo "<br/>";
				}

				echo "</fieldset></td>";
				echo "</tr>";
			} else {
				echo "<tr>";
				$data_type = $columns[$i]['Data Type'];
				$input_type = isset($this->inputTypes[$column_name]) ? $this->inputTypes[$column_name] : null;
				if (! $input_type) {
					$input_type = "text";
				}
				$column_title = isset($this->fancyColumnTitles[$column_name]) ? $this->fancyColumnTitles[$column_name] : null;
				if (! $column_title) {
					$column_title = ucwords($column_name);
				}

				if ($value && (strcmp($data_type, "date") == 0)) {
					if (strcmp($value, "0000-00-00") == 0) {
						$value = "";
					} 
				}
				$column_description = isset($this->columnDescriptions[$column_name]) ? $this->columnDescriptions[$column_name] : '';
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
		if (isset($workshop['id']) && $workshop['id']) {
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
