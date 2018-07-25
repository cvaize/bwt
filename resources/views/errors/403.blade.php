@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="form-group text-center">
            <h2 class="pt-3 pb-5">Ошибка №403<br><small>Доступ запрещен</small></h2>

            @if(auth()->check())
            <h2>
                У вас недостаточно прав для доступа к данному разделу
            </h2>
            @else
                <h2>
                    У вас недостаточно прав для доступа к данному разделу
                </h2>
            @endif

        </div>
    </div>





@stop
