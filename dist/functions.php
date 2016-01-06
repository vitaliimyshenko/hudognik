<?php
  
//register stylesheet
wp_register_style(
    'hudognik-styles', // handle name
    get_stylesheet_directory_uri() . '/dev/css/style.css', // the URL of the stylesheet
    '', // an array of dependent styles
    null, // version number
    'all' // CSS media type
);
?>
 
<?php
        
// enqueue registered the style
function mytheme_enqueue_style() {
	wp_enqueue_style( 'hudognik-styles' );
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_style' );
 
?>
  
    