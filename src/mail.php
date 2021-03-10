<?php

include_once "config.php";
header("Content-Type: application/json");

$msg_box = ""; // в этой переменной будем хранить сообщения формы
$errors = array(); // контейнер для ошибок
$data = json_decode(file_get_contents('php://input'));

// проверяем корректность полей
if($data->name == "") $errors[] = "Поле 'Как Вас зовут' не заполнено";

if ($data->theme == "Заявка с сайта на экскурсию") {
    if($data->phone == "") $errors[] = "Поле 'Контактный телефон' не заполнено";
    if($data->from  == "") $errors[] = "Поле 'Откуда Вы' не заполнено";
    if($data->email == "") $errors[] = "Поле 'E-mail' не заполнено";
}

if ($data->theme == "Заявка с сайта на партнёрство") {
    if($data->company == "") $errors[] = "Поле 'Название заведения' не заполнено";
    if($data->phone == "") $errors[] = "Поле 'Как с вами связаться' не заполнено";
}

if($data->agree != "true") $errors[] = "Необходимо согласие на обработку персональных данных";

// если форма без ошибок
if(empty($errors)) {
    // собираем данные из формы
    $message  = "<strong>Имя пользователя:</strong> " . $data->name . "<br/>";

    if ($data->theme == "Заявка с сайта на экскурсию") {
        $message .= "<strong>Откуда:</strong> " . $data->from . "<br/>";
        $message .= "<strong>Телефон:</strong> " . $data->phone . "<br/>";
        $message .= "<strong>E-mail пользователя:</strong> " . $data->email;
    }

    if ($data->theme == "Заявка с сайта на партнёрство") {
        $message .= "<strong>Как связаться:</strong> " . $data->phone . "<br/>";
        $message .= "<strong>Название заведения:</strong> " . $data->company;
    }

    send_mail($email, $message, $data->theme); // отправим письмо
    // выведем сообщение об успехе
    $msg_box = "<span class='msg msg_success'>Сообщение успешно отправлено!</span>";
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
function send_mail($mail_to, $message, $theme) {
    // заголовок письма
    $headers= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
    //$headers .= "From: Тестовое письмо <no-reply@test.com>\r\n"; // от кого письмо

    // отправляем письмо
    mail($mail_to, $theme, $message, $headers);
}

?>

