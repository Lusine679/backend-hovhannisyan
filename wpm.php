<?php
/**
 * Plugin Name:     WP user list
 * Description:     WP user list to get users in admin panel.
 * Version:         1.0.0
 * Author:          Lusine
 * License: GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */

if (!defined('WPM_URL')) {
    define('WPM_URL', plugins_url(plugin_basename(dirname(__FILE__))));
}

if (!defined('WPM_VERSION')) {
    define('WPM_VERSION', "1.0.0");
}

if (is_admin()) {
    require_once('wpm_admin_class.php');
    add_action('plugins_loaded', array('WPM_Admin', 'get_instance'));
}