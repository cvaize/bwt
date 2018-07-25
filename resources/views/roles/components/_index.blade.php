<div class="container pt-3">
    <div class="row justify-content-center">
        <div class="col-12">
            {!! Form::open(['route'=>'roles.index','method'=>'GET', 'class'=> 'form-inline']) !!}
            {{ Form::search('search',$frd['search'] ?? old('search') ?? null,[
                'data-source'=>'/', //route('roles.autocomplete')
                'aria-label'=>'Recipients rolename',
                'aria-describedby'=>'roles__search',
                'placeholder'=>"Поиск...",
                'class'=>'form-control grow-1 js-autocomplete js-on-change-submit mr-2 mb-2',
            ]) }}
            {!! Form::select('perPage', ['10' => '10', '25' => '25', '50' => '50', '100' => '100', '200' => '200'], $frd['perPage'] ?? old('perPage') ?? null, ['placeholder' => 'Кол-во', 'class' => 'form-control mr-2 mb-2']) !!}
            <div class="btn-group mr-2 mb-2" role="group">
                <a class="btn btn-outline-secondary " href="{{ route('roles.index') }}"
                   title="Очистить форму">Очистить</a>
            </div>
            <button class="btn btn-primary mb-2" type="submit">Вперед!</button>
            {!! Form::close() !!}
        </div>
    </div>
</div>
<div class="container pt-3 pb-5">
    <div class="row justify-content-center">
        <div class="col-12">
            {!! Form::open(['url' => route('roles.actions.destroy', $frd), 'method' => 'DELETE', 'class' => 'js-ajax']) !!}
            <div class="btn-group mb-2 mt-2">
                <a href="#" onclick="$('input[type=checkbox]').attr('checked','checked'); return false;"
                   class="btn btn-outline-secondary">+</a>

                <a href="#" onclick="$('input[type=checkbox]').removeAttr('checked'); return false;"
                   class="btn btn-outline-secondary">-</a>
                <button type="submit" class="btn btn-danger" onclick="return confirm(&quot;Подтвердите удаление?&quot;)">
                    Удалить выбранные
                </button>
            </div>
            @include('roles.components._list')
            {!! Form::close() !!}
        </div>
    </div>
</div>
{{ $roles->appends($frd)->links() }}