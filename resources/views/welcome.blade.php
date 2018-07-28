<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>BWT @Welcome@</title>
        <link rel="stylesheet" href="/css/all.css">
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="/css/welcome.css">

    </head>
    <body>

    {{--!!!!!!!!!!!!!ВНИМАНИЕ!!!!!!!!!!!!!--}}

    {{--ТЕКСТ ВСТАВЛЕТСЯ В БЛОКИ СЛЕДУЮЩИМ ОБРАЗОМ:--}}
    {{--1)Открываете картинку public/img/welcome/DEM.png в программе Affinity Photo;--}}
    {{--2)Вставляете текст, текстовая область должна быть по границам картинки;--}}
    {{--3)Пишите текст, оформляете его и экспортируете в svg с качеством 72;--}}
    {{--4)Далее вырезаете и вставляете текст с тегами, как указано ниже.--}}

    {{--!!!!!!!!!!!!!ВНИМАНИЕ!!!!!!!!!!!!!--}}



        <a href="#" class="logo">
            <h1 id="logo" class="logo">
                Eugene Batyukov Studio
            </h1>
        </a>
        <div id="menu">
            <ul>
                <li>
                    <a href="#">
                        Работы
                    </a>
                </li>
                <li>
                    <a href="#">
                        О нас
                    </a>
                </li>
                <li>
                    <a href="#">
                        Контакты
                    </a>
                </li>
            </ul>
        </div>
        <div id="border" class="border"></div>
        <div id="row">
                @include('welcome.components._block', ["index" => 1, "link" => "/", "img" => "/img/welcome/DEM.png",
                "text" => "<g transform=\"matrix(0.265706,0,0,0.265706,-62.4409,-53.9126)\"><text x=\"620.818px\" y=\"698.611px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Логотип школы</text><text x=\"446.239px\" y=\"823.517px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Концептуальной стрижки</text><text x=\"696.365px\" y=\"948.424px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Деметриус</text></g>"])
            @include('welcome.components._block', ["index" => 2, "link" => "/", "img" => "/img/welcome/SUN.png",
            "text" => "<g transform=\"matrix(0.24,0,0,0.24,2.16,-0.48)\"><text x=\"406.85px\" y=\"580.964px\" style=\"font-family:'SourceSansPro-Regular', 'Source Sans Pro', sans-serif;font-size:100px;fill:#fff;\">Сайт детского</text><text x=\"304.35px\" y=\"714.298px\" style=\"font-family:'SourceSansPro-Regular', 'Source Sans Pro', sans-serif;font-size:100px;fill:#fff;\">оздоровительного</text><text x=\"240.7px\" y=\"847.631px\" style=\"font-family:'SourceSansPro-Regular', 'Source Sans Pro', sans-serif;font-size:100px;fill:#fff;\">санатория Солнышко</text></g>"])
                @include('welcome.components._block', ["index" => 3, "link" => "/", "img" => "/img/welcome/MVP.png",
                "text" => "<g transform=\"matrix(0.265706,0,0,0.265706,-62.4409,-53.9126)\"><text x=\"620.818px\" y=\"698.611px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Логотип школы</text><text x=\"446.239px\" y=\"823.517px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Концептуальной стрижки</text><text x=\"696.365px\" y=\"948.424px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Деметриус</text></g>"])
                @include('welcome.components._block', ["index" => 4, "link" => "/", "img" => "/img/welcome/BONUS.png",
                "text" => "<g transform=\"matrix(0.265706,0,0,0.265706,-62.4409,-53.9126)\"><text x=\"620.818px\" y=\"698.611px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Логотип школы</text><text x=\"446.239px\" y=\"823.517px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Концептуальной стрижки</text><text x=\"696.365px\" y=\"948.424px\" style=\"font-family:'Source Sans Pro', sans-serif;font-size:75.271px;fill:#fff;\">Деметриус</text></g>"])
        </div>
    <script src="/js/welcome.js"></script>
    </body>
</html>
