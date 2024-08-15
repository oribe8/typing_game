<?php
$pdo = new PDO('mysql:host=localhost;dbname=keijiban;charset=utf8','staff2','password');
$i = 0;
$sql = $pdo -> query('SELECT keyword FROM wordlist'); //wordlistテーブルからkeyword列を取り出す
foreach($sql as $item) {
    $wordList[$i] = $item['keyword']; //wordList配列へkeyword列の値を出力
    $i++;
}
$json_wordList = json_encode($wordList); //JSON形式にエンコードしたwordList配列をjson_wordListへ格納
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
    <link rel="stylesheet" href="css/base.css">
    <title>タイピングゲーム</title>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JWQVKQDXHL"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JWQVKQDXHL');
    </script>
    <!-- Google tag (gtag.js) -->
</head>
<body>
    <main>
        <h1 class="typingTitle">タイピングゲーム</h1>
        <button class="startButton">スタート</button>
    </main>
    <script>
        let tangoList = <?php echo $json_wordList; ?>; //JS側の配列へ、php側で作成したjson_wordListを格納する
    </script>
    <script src="js/script.js"></script>
</body>
</html>