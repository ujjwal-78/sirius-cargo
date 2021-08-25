<?php
//get data from form
$email= $_POST['email'];

$to = "Info@sirius-cargo.com";

$subject = "Mail From Sirius Cargo Solutions LLP";

$txt ="Email = " . $email;

$headers = "From: noreply@sirius-cargo.com";

if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:");
?>