<?php

// переменная для хранения результата
define('_DS', DIRECTORY_SEPARATOR);
error_reporting(E_ALL);
ini_set("display_errors", 1);
// путь для загрузки файлов
$upload_path = dirname(__FILE__) . _DS . "img" . _DS . "gift" . _DS;
// если файл был успешно загружен, то
if ($_FILES['file']['error'] == UPLOAD_ERR_OK) {
    // получаем расширение исходного файла
    $extension_file = mb_strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
    // создадим директорию, если её не существует
    if (!file_exists($upload_path)) {
        mkdir($upload_path, 0777, true);
    }
    // загрузка изображения нужного типа
    $img_border = imagecreatefrompng($upload_path . "border.png");

    $border_width = imagesx($img_border);
    $border_height = imagesy($img_border);
    $border_window_x = 115;
    $border_window_y = 115;
    $border_window_width  = 1050;
    $border_window_height = 886;

    switch ($extension_file) {
        case "png":
            $img = imagecreatefrompng($_FILES['file']['tmp_name']);
            break;
        case "gif":
            $img = imagecreatefromgif($_FILES['file']['tmp_name']);
            break;
        case "jpeg":
        case "jpg":
        case "jfif":
        case "pjpeg":
        case "pjp":
            $img = imagecreatefromjpeg($_FILES['file']['tmp_name']);
            break;
        default:
            // error
    }
    $img_width = imagesx($img);
    $img_height = imagesy($img);

    if ($border_window_height > $border_window_width * $img_height / $img_width) {
        // изображение менее высокое
        $new_width = ceil($border_window_height * $img_width / $img_height);
        $new_height = $border_window_height;
        $img = imagescale($img, $new_width);
//        $img_crop = imagecreatetruecolor($border_width, $border_height);
//        imagecopy($img_crop, $img, 0, 0, floor(($new_width - $border_width) / 2), 0, $border_width, $border_height);
        $img = imagecrop($img, ["x" => ceil(($new_width - $border_window_width) / 2), "y" => 0, "width" => $border_window_width - 1, "height" => $border_window_height - 1]);
    } else {
        // изображение более высокое
        $new_width = $border_window_width;
        $new_height = ceil($border_window_width * $img_height / $img_width);
        $img = imagescale($img, $new_width);
        //$img_crop = imagecreatetruecolor($border_width, $border_height);
        //imagecopy($img_crop, $img, 0, 0, 0, floor(($new_height - $border_height) / 2), $border_width, $border_height);
        $img = imagecrop($img, ["x" => 0, "y" => ceil(($new_height - $border_window_height) / 2), "width" => $border_window_width - 1, "height" => $border_window_height - 1]);
    }
    $img_expanded = imagecreatetruecolor($border_width, $border_height);
    imagefilledrectangle($img_expanded, 0, 0, $border_width - 1, $border_height - 1, imagecolorallocate($img_expanded, 255, 255, 255));
    imagecopy($img_expanded, $img, $border_window_x + 1, $border_window_y + 1, 0, 0, $border_window_width - 1, $border_window_height - 1);
    imagecopy($img_expanded, $img_border, 0, 0, 0, 0, $border_width, $border_height);
    // получаем уникальное имя под которым будет сохранён файл
    $unique_name = uniqid("img_", true) . "." . $extension_file;
    // полное имя с директориями
    $full_unique_name = $upload_path . $unique_name;
    if (imagejpeg($img_expanded, $full_unique_name)) {
        $result = $unique_name;
    } else {
        $result = "error";
    }
    imagedestroy($img_border);
    imagedestroy($img_expanded);
    imagedestroy($img);
}
// возвращаем результат (ответ сервера)
echo $result;
?>