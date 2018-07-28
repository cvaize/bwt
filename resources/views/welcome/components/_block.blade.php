<div>
    <a href="{!! $link ?? null !!}" class="img-blur__link">
        <div class="w-100 h-100 img-blur">
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg width="100%" height="100%" viewBox="0 0 346 346" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
                 style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                                <clipPath id="_clip1{{$index}}"><rect id="Фон" x="0" y="0" width="345.6" height="345.6"/></clipPath>
                <g clip-path="url(#_clip1{{$index}})">
                    <use xlink:href="#_Image2{{$index}}" x="0" y="0" width="345.6px" height="345.6px" transform="matrix(0.998844,0,0,0.998844,0,0)"/>
                </g>

                    {!! $text ?? null !!}

                <defs class="defs">
                    <filter id="f{{$index}}" x="0" y="0">
                        <feGaussianBlur id="f{{$index}}-s" class="feGaussianBlur" in="SourceGraphic" stdDeviation="0" />
                    </filter>
                </defs>
                <defs>
                    <image transition="filter 2s" filter="url(#f{{$index}})" id="_Image2{{$index}}" width="346px" height="346px" xlink:href="{!! $img ?? null !!}"/>
                </defs>
                            </svg>
        </div>
    </a>
</div>