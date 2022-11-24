<template>
    <div class="container" id="container">
        <!-- <label id="switchThemeBox">
            <input type="checkbox" id="switch" onclick="switch_theme()">
            <span class="slider round"></span>
        </label> -->

        <div class="titleBox">
            <h1 id="title"><span>Marvel</span> characters<span>.</span></h1>
        </div>

        <div id="herosNameInputBox">
            <input type="text" id="herosName" placeholder="Hero's Name">
            <!-- <input type="button" value="Give Me My Hero" id="btnSearch" onclick="searchHero();" required> -->
        </div>

        <div id="charactersImgBox"></div>
    </div>
    <div id="counter">
        <p>loading</p>
        <h1 id="pourcentage"></h1>
        <hr id="hr">
    </div>
</template>