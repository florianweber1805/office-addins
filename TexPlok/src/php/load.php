<?php
    include("login.php");
    $connect = sconnect();

    // Check connection
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $textblock = $_GET["textblock"];
    $company = $_GET["company"];
    $department = $_GET["department"];
    $group = $_GET["group"];
    $person = $_GET["person"];

    // Attributes
    $sql = "SELECT * FROM textblocks";
    $result = mysqli_query($connect, $sql);

    // Check results
    if (mysqli_num_rows($result) > 0) {
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }
        print json_encode($rows);
    } else {
        die("0 results");
    }

    mysqli_free_result($result);
    mysqli_close($connect);
?>