<?php
    header("Access-Control-Allow-Origin: *");
    
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

    $update = $_GET["u"];

    $sql = "INSERT INTO textblocks (Type, Text, Description, Author) VALUES (" . $type . ", " . $text . ", " . $description . ", " . $author . ")";
    if (!is_null($update)) {
        $data = json_decode($update);
        $sql = "UPDATE textblock AS tb
            SET tb.name = '".$data["primaryText"]."', tb.text = '".$data["secondaryText"]."', tb.description = '".$data["tertiaryText"]."'
            WHERE tb.id = ".$data["id"];
    }
    $result = mysqli_query($connect, $sql);

    if (mysqli_query($connect, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connect);
    }

    mysqli_free_result($result);    
    mysqli_close($connect);
?>