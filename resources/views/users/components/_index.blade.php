<div class="container pt-3">
    <div class="row justify-content-center">
        <div class="col-12">
            {!! Form::open(['route'=>'users.index','method'=>'GET', 'class'=> 'form-inline']) !!}
            {{ Form::search('search',$frd['search'] ?? old('search') ?? null,[
                'data-source'=>'/', //route('users.autocomplete')
                'aria-label'=>'Recipients username',
                'aria-describedby'=>'users__search',
                'placeholder'=>"Поиск...",
                'class'=>'form-control js-autocomplete js-on-change-submit grow-1 mr-2 mb-2',
            ]) }}
            {!! Form::select('sex', ['male' => 'Мужчина', 'female' => 'Женщина'], $frd['sex'] ?? old('sex') ?? null, ['placeholder' => 'Пол', 'class' => 'form-control mr-2 mb-2']) !!}
            {!! Form::select('perPage', ['10' => '10', '25' => '25', '50' => '50', '100' => '100', '200' => '200'], $frd['perPage'] ?? old('perPage') ?? null, ['placeholder' => 'Кол-во', 'class' => 'form-control mr-2 mb-2']) !!}
            <div class="btn-group mr-2 mb-2" role="group">
                <a class="btn btn-outline-secondary " href="{{ route('users.index') }}"
                   title="Очистить форму">Очистить</a>
            </div>
            <button class="btn btn-primary mb-2" type="submit">@lang('administrator.search')</button>
            {!! Form::close() !!}
        </div>
    </div>
</div>
<div class="container pt-3 pb-5">
    <div class="row justify-content-center">
        <div class="col-12">
            {!! Form::open(['url' => route('users.actions.destroy', $frd), 'method' => 'DELETE', 'class' => 'js-ajax']) !!}
            <div class="btn-group mb-2 mt-2">
                <a href="#" onclick="$('input[type=checkbox]').attr('checked','checked'); return false;"
                   class="btn btn-outline-secondary">+</a>

                <a href="#" onclick="$('input[type=checkbox]').removeAttr('checked'); return false;"
                   class="btn btn-outline-secondary">-</a>
                <button type="submit" class="btn btn-danger" onclick="return confirm(&quot;Подтвердите удаление?&quot;)">
                    Удалить выбранные
                </button>
            </div>
            @include('users.components._list')
            {!! Form::close() !!}
        </div>
    </div>
</div>
{{ $users->appends($frd)->links() }}