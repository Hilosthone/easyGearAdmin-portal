// <?php
// 1. Improved Headers for Cross-Origin Resource Sharing (CORS)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// 2. Handle Preflight OPTIONS request (CRITICAL)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "localhost";
$db   = "easygear_db";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    // Enable exceptions for debugging
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = $_GET['q'] ?? '';
    $role  = $_GET['role'] ?? 'vendor'; 

    if (empty($query)) {
        echo json_encode([]);
        exit;
    }

    $searchTerm = "%$query%";

    if ($role === 'admin') {
        $stmt = $pdo->prepare("
            SELECT id, 'vendor' as type, business_name as name, email as detail FROM vendors WHERE business_name LIKE ?
            UNION
            SELECT id, 'user' as type, name, email as detail FROM users WHERE name LIKE ?
            LIMIT 10
        ");
        $stmt->execute([$searchTerm, $searchTerm]);
    } else {
        $stmt = $pdo->prepare("
            SELECT id, 'product' as type, product_name as name, CAST(price AS CHAR) as detail FROM products WHERE product_name LIKE ?
            UNION
            SELECT id, 'order' as type, order_number as name, status as detail FROM orders WHERE order_number LIKE ?
            LIMIT 10
        ");
        $stmt->execute([$searchTerm, $searchTerm]);
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Ensure we always return an array, even if empty
    echo json_encode($results ? $results : []);

} catch (PDOException $e) {
    // If there is a DB error, this will show in your browser console
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>