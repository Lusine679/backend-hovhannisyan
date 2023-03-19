<?php
Class WPM_Admin{
    protected static $instance = null;
    private function __construct() {
        add_action('admin_menu', array($this, 'wpm_user_list'));
        add_action("admin_enqueue_scripts", array($this, "load_admin_scripts"));
        add_action("admin_enqueue_scripts", array($this, "load_styles"));
        add_action( 'wp_ajax_user_filter', array($this ,'user_filter' ));
        add_action( 'wp_ajax_nopriv_user_filter', array($this, 'user_filter' ));
    }

    public function load_admin_scripts(){
        wp_enqueue_script( 'jquery' );
        wp_enqueue_media();
    
        wp_register_script( 'wpm_script_js', WPM_URL . '/assets/admin/js/wpm_script.js', array( 'jquery') , WPM_VERSION, true );
        wp_enqueue_script( 'wpm_script_js' );
        wp_localize_script( 'wpm_script_js', 'my_ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    }

    public function load_styles(){
        wp_enqueue_style( 'load_styles', WPM_URL . '/assets/admin/css/wpm_admin.css',"", WPM_VERSION );
    }

    public function wpm_user_list(){
        add_menu_page('User List', 'User List', 'manage_options', 'user-list', array($this,"wpm_users_view") );
    }

    public function wpm_users_view(){
        require_once ("admin/view/wpm-user_list.php");
    }

    public function user_filter() {
        $role = $_POST['role'];
        $args = array(
            'role'    => $_POST['role'],
            'order'   => 'ASC'
        );
        $role == 'all' ? $users = get_users() : $users = get_users( $args );

        echo json_encode($users); die();
    }

    public static function get_instance() {
        if (null == self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }
}