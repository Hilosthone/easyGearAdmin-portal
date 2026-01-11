<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once '../db.php'; 

try {
    // Select real data from your database
    // $sql = "SELECT id, fullname as owner, store_name as name, email, phone, 'Approved' as status FROM vendors ORDER BY id DESC";
    // Update your SQL query to include 'password'
    $sql = "SELECT id, fullname as owner, store_name as name, email, phone, status, password FROM vendors ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $vendors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $vendors
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>