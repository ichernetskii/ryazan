<?php

include_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'));

// собираем данные из формы
$message  = "<strong>Имя: </strong> " . $data->name . "<br/>";
$message .= "<strong>Пол: </strong> " . ($data->sex == "male" ? "Мужской" : "Женский") . "<br/>";
$message .= "<strong>Город: </strong> " . $data->city . "<br/>";
$message .= "<strong>Количество дней: </strong> " . $data->days . "<br/>";
$message .= "<strong>Откуда узнали о проекте: </strong> " . $data->know . "<br/>";
$message .= "<strong>Что впечатлило в Рязани: </strong> " . $data->impress . "<br/>";
$message .= "<strong>Над чем нам нужно поработать: </strong> " . $data->work . "<br/>";
$message .= "<strong>Хотели бы Вы вернуться в Рязань? </strong> " . $data->back . "<br/>";
$message .= "<strong>Порекомендуете ли Вы своим друзьям и близким путешествие в Рязань? </strong> " . $data->recommend . "<br/>";
$message .= "<strong>E-mail:</strong> " . $data->email;

// почта, на которую придет письмо
$mail_to = $email;

// заголовок письма
$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
//$headers .= "From: Тестовое письмо <no-reply@test.com>\r\n"; // от кого письмо

// отправляем письмо
mail($mail_to, "Отзыв с сайта", $message, $headers);

?>
