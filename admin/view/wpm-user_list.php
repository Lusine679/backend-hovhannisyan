<h2>A list of users</h2>
<input type="text" id="user-name" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

<div class="custom-select">
  Filter by role
  <select>
    <option value="all">All</option>
    <?php global $wp_roles;
    if ( ! isset( $wp_roles ) )
      $wp_roles = new WP_Roles();

    $role_name = $wp_roles->get_names();
    foreach($role_name as $name){
      echo '<option value=' . $name . '>' . $name . '</option>';
    }
    ?>
  </select>
</div>

<table id="userTable">
  <tr class="header">
    <th>N</th>
    <th>Name</th>
    <th>Mail</th>
    <th>Role</th>
  </tr>
  <?php 
  $args = array('orderby' => 'ASC');
  $wp_user_query = new WP_User_Query($args);
  $authors = $wp_user_query->get_results();
  if (!empty($authors)) {
    $i = 1;
    foreach ($authors as $author) {
      $author_info = get_userdata($author->ID);
      if(empty($author_info->roles[0])){
        $role = "";
      }else{
        $role = $author_info->roles[0];
      }
      $table =  "<tr><td>". $i++ ."</td><td>"
                . $author_info->display_name . 
                "</td><td>"
                . $author_info->user_email .
                "</td><td>"
                . $role . 
                "</td></tr>";

      echo $table;
    }
  } else {
    echo 'No results';
  } ?>
</table>

<div id="pageNavPosition" class="pager-nav"></div>
<div class="custom-select" style="width:200px;">