<div class="list-group-item list-group-item-action">
    <div class="row">
        <label class="col form-check-label d-flex align-items-center">
            @include('forms._checkbox',[
                'name' => 'users[]',
                'value' => $user->getKey(),
                'label' => $user->getFullName(),
                'checked' => false,
            ])
        </label>
        <p class="col mb-0 d-flex align-items-center">
            <a href="mailto:{{ $user->getEmail() }}">{{ $user->getEmail() }}</a>
        </p>
        <div class="col btn-group">
            <a href="{{ route('users.show', $user) }}" class="btn btn-primary ml-auto">Профиль</a>
            <a href="{{ route('users.edit', $user) }}" class="btn btn-outline-primary">Редактировать</a>
        </div>
    </div>
</div>