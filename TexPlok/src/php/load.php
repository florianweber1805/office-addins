<?php
    header("Access-Control-Allow-Origin: *");

    include("login.php");
    $connect = sconnect();

    // Check connection
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $action = $_GET["a"];
    $actioninfo = $_GET["ai"];
    $info = $_GET["i"];
    $search = $_GET["s"];
    $textblock = $_GET["t"];
    $group = $_GET["g"];
    
    // Attributes
    $sql = "SELECT tbs.id AS 'id' FROM textblock AS tbs";
    if (!is_null($actioninfo)) {
        $sql = "SELECT a.id AS 'id', a.name AS 'name', a.icon AS 'icon'
            FROM action AS a
            WHERE a.id = " . (string)$actioninfo;
    } elseif (!is_null($action)) {
        $sql = "SELECT tba.action AS 'action'
            FROM textblock_action AS tba
            INNER JOIN action AS a ON tba.action = a.id
            WHERE tba.parent = " . (string)$action . "
            ORDER BY a.orderindex ASC";
    } elseif (!is_null($info)) {
        $sql = "SELECT i.icon AS 'icon', tbs.name AS 'name', tbs.text AS 'text', tbs.description AS 'description', 
                tbs.author AS 'author', CONVERT(tbs.timestamp, DATE) AS 'timestamp', tbs.type AS 'type' FROM textblock AS tbs
            INNER JOIN textblock_icon AS tbi ON tbi.parent = tbs.id
            INNER JOIN icon AS i ON tbi.icon = i.id
            WHERE tbs.id = " . (string)$info;
    } elseif (!is_null($textblock)) {
        $sql = "SELECT tbs.id AS 'id' FROM textblock_child AS tbc
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