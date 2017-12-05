<?php
$media = json_decode(file_get_contents("media.json"));
$size  = count($media)/3;
$index = rand(0, $size) * 3;
$image = "https://www.standard3d.com/holodeck/img/" . $media[$index] . "?u=" .  uniqid();
$title = $media[$index+1] . " - " . $media[$index+2];
$descr = "Holodeck Mobile VR Experience";
?>
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@standard3d">
<meta name="twitter:creator" content="@standard3d">
<meta name="twitter:image" content="<?php echo $image ?>">
<meta name="twitter:title" content="<?php echo $title ?>">
<meta name="twitter:description" content="<?php echo $descr ?>">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="refresh"
	content="0; url=https://play.google.com/store/apps/details?id=com.standard3d.holodeck.v1.free" />
<style>
body {
    background-color: #000000
    background-image: url('https://www.standard3d.com/holodeck/holodeck.svg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center; 
}
</style>
</head>
<BODY>
</BODY>
</HTML>