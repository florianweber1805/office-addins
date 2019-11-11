<?php
    include("login.php");			
    $connect = sconnect();

    // Check connection
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $text = $_GET["text"];
    $description = $_GET["description"];
    $type = $_GET["type"];
    $author = $_GET["author"];

    $sql = "INSERT INTO textblocks (Type, Text, Description, Author) VALUES (" . $type . ", " . $text . ", " . $description . ", " . $author . ")";
    $result = mysqli_query($connect, $sql);

    if (mysqli_query($connect, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    }

    mysqli_free_result($result);    
    mysqli_close($connect);
?>