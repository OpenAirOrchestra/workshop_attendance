<?php

class workshopAttendanceWorkshopRestController extends WP_REST_Controller
{

  /**
   * Register the routes for the objects of the controller.
   */
  public function register_routes()
  {
    $version = '1';
    $namespace = 'workshop_attendance/v' . $version;
    $base = 'events';
    register_rest_route($namespace, '/' . $base, array(
      array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => array($this, 'get_items'),
        'permission_callback' => array($this, 'get_items_permissions_check'),
        'args'                => array(),
      ),
      array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => array($this, 'create_item'),
        'permission_callback' => array($this, 'create_item_permissions_check'),
        'args'                => $this->get_endpoint_args_for_item_schema(true),
      ),
    ));
    register_rest_route($namespace, '/' . $base . '/(?P<id>[\d]+)', array(
      array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => array($this, 'get_item'),
        'permission_callback' => array($this, 'get_item_permissions_check'),
        'args'                => array(
          'context' => array(
            'default' => 'view',
          ),
        ),
      ),
      array(
        'methods'             => WP_REST_Server::EDITABLE,
        'callback'            => array($this, 'update_item'),
        'permission_callback' => array($this, 'update_item_permissions_check'),
        'args'                => $this->get_endpoint_args_for_item_schema(false),
      ),
      array(
        'methods'             => WP_REST_Server::DELETABLE,
        'callback'            => array($this, 'delete_item'),
        'permission_callback' => array($this, 'delete_item_permissions_check'),
        'args'                => array(
          'force' => array(
            'default' => false,
          ),
        ),
      ),
    ));
    register_rest_route($namespace, '/' . $base . '/schema', array(
      'methods'  => WP_REST_Server::READABLE,
      'callback' => array($this, 'get_public_item_schema'),
      'permission_callback' => array($this, 'get_items_permissions_check'),
    ));
  }

  /**
   * Get a collection of items
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_items($request)
  {
    //get parameters from request
    $params = $request->get_params();
    $page = $params['page'];
    $per_page = $params['per_page'];
    $search = $params['search'];  // Should be a date.

    if ($page == 0) {
      $page = 1;
    }

    if ($per_page == 0) {
      $per_page = 100;
    }

    $offset = ($page - 1) * $per_page;

    // query the database
    global $wpdb;
    $table_name = $wpdb->prefix . "workshops";

    $sql = "SELECT * FROM `$table_name`";
    if ($search) {
      $sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE date = %s LIMIT %d OFFSET %d", $search, $per_page, $offset);
    } else {
      $sql = $wpdb->prepare("SELECT * FROM `$table_name` LIMIT %d OFFSET %d", $per_page, $offset);
    }

    $items = $wpdb->get_results($sql, ARRAY_A);

    if (!$wpdb->last_error) {
      $data = array();
      foreach ($items as $item) {
        $itemdata = $this->prepare_item_for_response($item, $request);
        $data[] = $this->prepare_response_for_collection($itemdata);
      }

      return new WP_REST_Response($data, 200);
    }
    return new WP_Error('cant-get-items', __($wpdb->last_error, 'text-domain'), array('status' => 500));

  }

  /**
   * Get one item from the collection
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_item($request)
  {
    //get parameters from request
    $params = $request->get_params();
    $event_id = $params['id'];

    // query the database
    global $wpdb;
    $table_name = $wpdb->prefix . "workshops";

    $sql = $wpdb->prepare("SELECT * FROM `$table_name` WHERE id = %d", $event_id);
    $workshop = $wpdb->get_row($sql, ARRAY_A);

    $item = $workshop;

    $data = $this->prepare_item_for_response($item, $request);

    //return a response or error based on some conditional
    if (!$wpdb->last_error) {
      return new WP_REST_Response($data, 200);
    }
    return new WP_Error('cant-get-item', __($wpdb->last_error, 'text-domain'), array('status' => 500));
  }

  /**
   * Create one item from the collection
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function create_item($request)
  {
    $item = $this->prepare_item_for_database($request);

    // query the database
    global $wpdb;
    $table_name = $wpdb->prefix . "workshops";

    $workshop_data = array();
    $workshop_format = array();

    $workshop_data['date'] = $item['date'];
    array_push($workshop_format, "%s");

    $workshop_data['title'] = $item['title'];
    array_push($workshop_format, "%s");

    $rowCount = $wpdb->insert(
      $table_name,
      $workshop_data,
      $workshop_format
    );

    if (!$wpdb->last_error) {
      $workshop_id = $wpdb->insert_id;

      $item['id'] = $workshop_id;

      $data = $this->prepare_item_for_response($item, $request);
      return new WP_REST_Response($data, 200);
    }

    return new WP_Error('cant-create', __($wpdb->last_error, 'text-domain'), array('status' => 500));
  }

  /**
   * Update one item from the collection
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function update_item($request)
  {
    // $item = $this->prepare_item_for_database($request);
    return new WP_Error('cant-update', __('not implemented', 'text-domain'), array('status' => 500));
  }

  /**
   * Delete one item from the collection
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function delete_item($request)
  {
    // $item = $this->prepare_item_for_database($request);
    return new WP_Error('cant-delete', __('not implemented', 'text-domain'), array('status' => 500));
  }

  /**
   * Check if a given request has access to get items
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function get_items_permissions_check($request)
  {
    return current_user_can( 'read_private_posts' );
  }

  /**
   * Check if a given request has access to get a specific item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function get_item_permissions_check($request)
  {
    return $this->get_items_permissions_check($request);
  }

  /**
   * Check if a given request has access to create items
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function create_item_permissions_check($request)
  {
    return current_user_can( 'edit_others_posts' );
  }

  /**
   * Check if a given request has access to update a specific item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function update_item_permissions_check($request)
  {
    return $this->create_item_permissions_check($request);
  }

  /**
   * Check if a given request has access to delete a specific item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function delete_item_permissions_check($request)
  {
    return $this->create_item_permissions_check($request);
  }

  /**
   * Prepare the item for create or update operation
   *
   * @param WP_REST_Request $request Request object
   * @return WP_Error|object $prepared_item
   */
  protected function prepare_item_for_database($request)
  {
    return $request;
  }

  /**
   * Prepare the item for the REST response
   *
   * @param mixed $item WordPress representation of the item.
   * @param WP_REST_Request $request Request object.
   * @return mixed
   */
  public function prepare_item_for_response($item, $request)
  {
    return $item;
  }

  /**
   * Prepares a response for insertion into a collection.
   *
   * @param mixed $item WordPress representation of the item.
   * @param WP_REST_Response $response response object.
   * @return Array|Mixed. Response data, ready for insertion into collection data.
   */
  public function prepare_response_for_collection($response)
  {
    return $response;
  }

  /**
   * Get the query params for collections
   *
   * @return array
   */
  public function get_collection_params()
  {
    return array(
      'page'     => array(
        'description'       => 'Current page of the collection.',
        'type'              => 'integer',
        'default'           => 1,
        'sanitize_callback' => 'absint',
      ),
      'per_page' => array(
        'description'       => 'Maximum number of items to be returned in result set.',
        'type'              => 'integer',
        'default'           => 10,
        'sanitize_callback' => 'absint',
      ),
      'search'   => array(
        'description'       => 'Limit results to those matching a string.',
        'type'              => 'string',
        'sanitize_callback' => 'sanitize_text_field',
      ),
    );
  }
}
