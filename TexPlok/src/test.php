<?php
    include("connect.php");			
    $connect = sconnect ();

    // Check connection
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM textblocks";
    $result = mysqli_query($connect, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            echo "id: " . $row["ID"]. " - text: " . $row["Text"]. " " . $row["Description"]. "<br>";
        }
        //return $result;
    } else {
        echo "0 results";
    }

    mysqli_close($conn);
?>