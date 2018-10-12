<?php
/**
 * Created by PhpStorm.
 * User: emon
 * Date: 7/27/2018
 * Time: 8:18 PM
 */

//header('Access-Control-Allow-Origin: *');
$connection = mysqli_connect('localhost','emon','emon','uni_book');
echo "151";
$sql = "insert into roles(role_name) values ('".$_POST["tweet"]."')";

//mysqli_query($connection,$sql);