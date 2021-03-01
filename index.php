<?php
$insert=false;
if(isset($_POST['name'])){
$server="localhost";
 $username="root";
 $password="";
 $con=mysqli_connect($server,$username,$password);
 if(!$con){
     die("connection to database failed due to ".mysqli_connect_error());
 }
// echo "Connected successfully!";
$name=$_POST['name'];
$email=$_POST['email'];
$age=$_POST['age'];
$city=$_POST['city'];
$phone=$_POST['phone'];

//echo "executed successfully.";

$sql = " INSERT INTO `travel_buddy` . `travel_buddy` 
(`name`, `email`, `age`, `city`, `phone`, `time_of_entry`) 
VALUES ('$name', '$email', '$age', '$city', '$phone',
 current_timestamp()); ";
//echo $sql;

if($con->query($sql)==true){
    echo "successfully inserted";
    $insert=true;
}
else {
    echo "ERROR : $sql <br> $con->error ";
}

$con->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TravelBuddy</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <img class="bg" src="bg.jpg" alt="Travel Buddy">
  <div class="container">
       <h2> Coz having a companion is great!</h2> 
       <p>Your one stop to finding a travel buddy!</p>
       <p> Enter your details here </p>
       <form action="index.php" method="post">
           <input type="text" name="name" id="name" placeholder="Enter your name">
           <input type="email" name="email" id="email" placeholder="Enter your email">
           <input type="text" name="age" id="age" placeholder="Enter your age">
           <input type="text" name="city" id="city" placeholder="Enter city to visit">
           <input type="text" name="phone" id="phone" placeholder="Enter your phone number">
           <button class="btn" type="submit">submit</button>
        </form>
   </div>
   <?php
   if($insert==true){
       echo "Thank you !";
   }
   ?>
   <!-- INSERT INTO `travel_buddy` 
    (`SI`, `name`, `email`, `age`, `city`, `phone`, `time_of_entry`) 
    VALUES ('1', 'shaubhik bhattacharya', 'shaubhik123@gmail.com', '25', 'Bangalore', '6289085978',
     current_timestamp());-->
<script src="index.js"></script>
</body>
</html>