<div class="list-group">
        @forelse ($permissions as $permission)
                @include('permissions.components._item')
        @empty
                <p>No permissions</p>
        @endforelse
</div>