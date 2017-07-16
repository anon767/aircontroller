<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
<head>
    <title>Zombiegame</title>
    <meta charset="utf-8">
    <meta name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
          content="width=device-width, height=device-height"/>
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="apple-mobile-web-app-capable" content="yes">
</head>
<body style="overflow: hidden">

<canvas id="stage" height="800" width="800" style="position:absolute; left: 0px; top: 0px;"></canvas>


<script type="text/javascript" src="libs/jquery.js"></script>

<script src="Entities/Background.js"></script>
<script src="Entities/Player.js"></script>
<script src="Entities/GameState.js"></script>
<script src="Actions/InitAction.js"></script>
<script src="Actions/NewPlayerAction.js"></script>
<script src="Actions/PlayerMoveAction.js"></script>
<script src="Entities/Communication.js"></script>
<script src="libs/tweenjs.js"></script>
<script src="libs/preload.js"></script>
<script src="libs/virtualJoystick.js"></script>
<script src="libs/easeljs.js"></script>
<script src="Entities/Game.js"></script>

</body>

</html>