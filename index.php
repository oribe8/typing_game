<?php
$pdo = new PDO('mysql:host=localhost;dbname=keijiban;charset=utf8','staff2','password');
$i = 0;
$sql = $pdo -> query('SELECT keyword FROM wordlist');
foreach($sql as $item) {
    $wordList[$i] = $item['keyword'];
    $i++;
}
$json_wordList = json_encode($wordList);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
    <link rel="stylesheet" href="css/base.css">
    <title>タイピングゲーム</title>
</head>
<body>
    <main>
        <h1 class="typingTitle">タイピングゲーム</h1>
        <button class="startButton">スタート</button>
        <script>
            let tangoList = <?php echo $json_wordList; ?>;
        </script>
        <script src="js/script.js"></script>
    </main>
</body>
</html>