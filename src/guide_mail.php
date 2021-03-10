<?php

header("Content-Type: application/json");

$msg_box = ""; // в этой переменной будем хранить сообщения формы
$errors = array(); // контейнер для ошибок
$data = json_decode(file_get_contents('php://input'));

// проверяем корректность полей
if($data->email == "") $errors[] = "Поле 'E-mail' не заполнено";

// если форма без ошибок
if(empty($errors)) {
    // собираем данные из формы
    $message  = "Здравствуйте,<br/> Ваш гид по Рязани во вложении к письму. ";

    $files = array(
        __DIR__ . '/img/popup_main-1.jpg',
        __DIR__ . '/img/popup_main-2.jpg'
    );

    if (send_mail_attachments($data->email, $message, "Гид по Рязани", $files, true) /* отправим письмо */ ) {
        // выведем сообщение об успехе
        $msg_box = "<span class='msg msg_success'>Письмо успешно отправлено!</span>";
    } else {
        $msg_box = "<span class='msg msg_error'>Ошибка при отправке письма.</span>";
    }
} else {
    // если были ошибки, то выводим их
    $msg_box = "";
    foreach($errors as $one_error){
        $msg_box .= "<span class='msg msg_error'>$one_error</span><br/>";
    }
}

// делаем ответ на клиентскую часть в формате JSON
echo json_encode(array(
    'result' => $msg_box
));


// функция отправки письма
function send_mail_attachments($mail_to, $message, $theme, $files = null, $isHTML = false){
    $boundary = "--" . strtoupper(md5(uniqid(rand())));
    $EOL = "\r\n";
    $headers  = "MIME-Version: 1.0;" . $EOL;
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"" . $EOL;
    if ($isHTML) {
        $type = 'text/html';
    } else {
        $type = 'text/plain';
    }
    $body = "--" . $boundary . $EOL;
    $body.= "Content-Type: " . $type . "; charset=utf-8" . $EOL;
    $body.= "Content-Transfer-Encoding: Quot-Printed" . $EOL . $EOL;
    $body.= $message . $EOL . $EOL;
    if ((is_array($files)) && (!empty($files))) {
        foreach($files as $filename) {
            $body .= "--" . $boundary . $EOL;
            $body .= "Content-Type: application/octet-stream" . $EOL;
            $body .= "Content-Transfer-Encoding: base64" . $EOL;
            $body .= "Content-Disposition: attachment; filename=\"" . basename($filename) . "\"" . $EOL . $EOL;
            $body .= chunk_split(base64_encode(file_get_contents($filename))) . $EOL;
        }
    }
    $body .= "--" . $boundary . "--" . $EOL;

    return mail($mail_to, $theme, $body, $headers);
}

?>
