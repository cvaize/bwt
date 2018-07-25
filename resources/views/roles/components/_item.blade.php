<div class="list-group-item list-group-item-action">
    <div class="row">
        <label class="col form-check-label d-flex align-items-center">
            @include('forms._checkbox',[
                'name' => 'roles[]',
                'value' => $role->getKey(),
                'label' => $role->getDisplayName(),
                'checked' => false,
            ])
        </label>
        <p class="col mb-0 d-flex align-items-center">
            <a href="{{ route('roles.show', $role) }}">{{ $role->getName() }}</a>
        </p>
        <div class="col btn-group">
            <a href="{{ route('roles.edit', $role) }}" class="btn btn-outline-primary ml-auto">Редактировать</a>
        </div>
    </div>
</div>