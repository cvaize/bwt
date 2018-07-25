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
    {{--Отличный вариант на чистом css, но нам не подходит--}}
    {{--<div class="horizontal-scroll-wrapper  rectangles">--}}
        {{--@foreach(range(1, 20) as $item)--}}
        {{--<div class="embed-responsive embed-responsive-1by1">--}}
            {{--<div class="embed-responsive-item" >--}}
                {{--item {{$item}}--}}
            {{--</div>--}}
        {{--</div>--}}
        {{--@endforeach--}}
    {{--</div>--}}
    <div id="welcome">
        <h1 id="logo">
            Eugene Batyukov Studio
        </h1>
        <div id="row">
            @foreach(range(1, 5) as $item)
                <div>
                    <a href="/" class="img-blur__link">
                        <div class="img-cover w-100 h-100 img-blur" data-blur='10' style="background-image: url(/img/welcome/DEM.png);"></div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
    <script src="/js/welcome.js"></script>
    </body>
</html>
