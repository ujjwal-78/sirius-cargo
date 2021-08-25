<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$number= $_POST['phone'];
$subject= $_POST['subject'];
$message= $_POST['message'];

$to = "Info@sirius-cargo.com";

$subject = "Mail From Sirius Cargo Solutions LLP";

$txt ="Name = ". $name . "\r\nEmail = " . $email . "\r\nMobile No. =" . $number . "\r\nSubject =" . $subject . "\r\nMessage = " . $message;

$headers = "From: noreply@sirius-cargo.com";

if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:");
?>