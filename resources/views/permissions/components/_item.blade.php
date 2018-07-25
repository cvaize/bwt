<div class="list-group-item list-group-item-action">
    <div class="row">
        <label class="col form-check-label d-flex align-items-center">
            @include('forms._checkbox',[
                'name' => 'permissions[]',
                'value' => $permission->getKey(),
                'label' => $permission->getDisplayName(),
                'checked' => false,
            ])
        </label>
        <p class="col mb-0 d-flex align-items-center">
            <a href="{{ route('permissions.show', $permission) }}">{{ $permission->getName() }}</a>
        </p>
        <div class="col btn-group">
            <a href="{{ route('permissions.edit', $permission) }}" class="btn btn-outline-primary ml-auto">Редактировать</a>
        </div>
    </div>
</div>