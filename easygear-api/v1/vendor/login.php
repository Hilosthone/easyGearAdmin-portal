<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    // 1. Find the vendor by email
    $sql = "SELECT id, fullname, store_name, password FROM vendors WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data->email]);
    $vendor = $stmt->fetch();

    // 2. Verify password
    if ($vendor && password_verify($data->password, $vendor['password'])) {
        // Success: In a real app, you'd generate a JWT token here
        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "user" => [
                "id" => $vendor['id'],
                "fullname" => $vendor['fullname'],
                "store_name" => $vendor['store_name']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete login data"]);
}