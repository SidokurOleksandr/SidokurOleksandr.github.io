<?php
$word1 = array('Чудесных', 'Суровых', 'Занятных', 'Внезапных');
$word2 = array('слов', 'зим', 'глаз', 'дней', 'лет', 'мир', 'взор');
$word3 = array('прикосновений', 'поползновений', 'судьбы явлений',  'сухие листья', 'морщины смерти', 'долины края', 'замены нету', 'сухая юность', 'навек исчезнув');
$word4 = array('обретаю', 'понимаю', 'начертаю', 'закрываю', 'оставляю',  'вынимаю', 'умираю', 'замерзаю', 'выделяю');
$word5 = array('очертания', 'безысходность', 'начертанья', 'смысл жизни', 'вирус смерти', 'радость мира');

function getWord($arr){
   return $arr[rand( 0, count($arr)-1)];
}
echo getWord($word1).' '.getWord($word2).' '.getWord($word3).'<br>';
echo getWord($word1).' '.getWord($word2).' '.getWord($word3).'<br>';
echo "Я ".getWord($word4).' '.getWord($word5);

echo "<br><br><br><br><br>";

define("NEW_PHONE_PRICE", 34499);
function calcCreditPay($price, $percentage, $commission = 0){
    $months=0;
    $full_sum =$price;
    for(; $price >= 0; $months++){
        $price = ($price+ $commission + $price*$percentage/100 )-5000 ;
        $full_sum+=$commission+$price*$percentage/100;
    }
    return ["term"=>"$months - months", "full_sum" =>"$full_sum UAH"];
}

$new_phone1 = calcCreditPay( NEW_PHONE_PRICE, 4, 500);
$new_phone2 = calcCreditPay( NEW_PHONE_PRICE, 3, 1000);
$new_phone3 = calcCreditPay( NEW_PHONE_PRICE+6666, 2);

echo '<table>';
echo '<tr><td>HomoCredit: </td>'.'<td>'.$new_phone1["term"].'</td>'.'<td>'.$new_phone1["full_sum"].'</td></tr><br>';
echo '<tr><td>Softbank: </td>'.'<td>'.$new_phone2["term"].'</td>'.'<td>'.$new_phone2["full_sum"].'</td></tr><br>';
echo '<tr><td>StrawberryBank </td>'.'<td>'.$new_phone3["term"].'</td>'.'<td>'.$new_phone3["full_sum"].'</td></tr><br>';
echo '</table>';

echo "<br><br><br><br><br>";

echo "Найвигідніша пропозиція: ";
if($new_phone1<$new_phone2 && $new_phone1<$new_phone3){
    echo 'HomoCredit: '.$new_phone1["term"].' '.$new_phone1["full_sum"];
}elseif($new_phone2<$new_phone3){
    echo 'Softbank: '.$new_phone2["term"].' '.$new_phone2["full_sum"];
}else{
    echo 'StrawberryBank: '.$new_phone3["term"].' '.$new_phone3["full_sum"];
}
echo "<br><br><br><br><br>";

$file_shev = file('shevchenko.txt');
    echo "<div style='display:flex; justify-content: space-around;'>";
foreach($file_shev as $shev_str){
    $shev_str_arr =preg_split('//u', $shev_str, -1, PREG_SPLIT_NO_EMPTY);
    echo '<div>';
    foreach($shev_str_arr as $letter){
        echo "<pre>$letter</pre>";
    }
    echo '</div>';
}
echo '</div>';
