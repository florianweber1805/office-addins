<?php
    header("Access-Control-Allow-Origin: *");

    include("login.php");
    $connect = sconnect();

    // Check connection
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $search = $_GET["s"];
    $textblock = $_GET["t"];
    $company = $_GET["c"];
    $department = $_GET["d"];
    $group = $_GET["g"];
    $person = $_GET["p"];

    // Attributes
    $sql = "SELECT tbs.id, tbs.text, tbs.description, tbs.author, tbs.timestamp, tbs.Type FROM textblock AS tbs";
    if (!is_null($textblock)) {
        $sql = "SELECT tbs.id, tbs.text, tbs.description, tbs.author, tbs.timestamp, tbs.Type FROM textblock_child AS tbc
            INNER JOIN textblock AS tbs ON tbs.id = tbc.child
            WHERE tbc.parent = " . (string)$textblock;
    }
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