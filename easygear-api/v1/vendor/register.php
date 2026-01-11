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

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data);

// Validation
if (
    !empty($data->fullname) && 
    !empty($data->store_name) && 
    !empty($data->email) && 
    !empty($data->phone) && 
    !empty($data->password)
) {
    // Check if email exists
    $check_sql = "SELECT id FROM vendors WHERE email = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->execute([$data->email]);

    if ($check_stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
        exit;
    }

    // Hash Password
    $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);

    // Insert
    $sql = "INSERT INTO vendors (fullname, store_name, email, phone, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    try {
        $stmt->execute([
            $data->fullname,
            $data->store_name,
            $data->email,
            $data->phone,
            $hashedPassword
        ]);
        http_response_code(201);
        echo json_encode(["status" => "success", "message" => "Vendor account created!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server error, please try again"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Please fill all fields"]);
}