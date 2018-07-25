<div class="list-group">
        @forelse ($roles as $role)
                @include('roles.components._item')
        @empty
                <p>No roles</p>
        @endforelse
</div>