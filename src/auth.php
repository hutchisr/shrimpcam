<?php
header('Content-Type: application/json');

$accepted_keys = [
  '$2y$10$YzO5LRY6B1OqocMQgh.uleGP2uXHybERTVIMJslm5N42gbnOLkZpO',
  '$2y$10$y9uG5bH/GhDs0OZyeUfhtu2X1IKd6nTGxG682OF2Ccg7AYzrAwnMm',
];

// file_put_contents(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'log.json', json_encode($_SERVER, JSON_PRETTY_PRINT));
foreach ($accepted_keys as $key) {
  if (password_verify($_GET['auth'], $key)) {
    $authenticated = true;
    break;
  }
}
if ($authenticated) {
  $res = ["result" => true];
  echo json_encode($res);
}
elseif (!$authenticated) {
  http_response_code(401);
  $res = ["result" => false];
  echo json_encode($res);
}
