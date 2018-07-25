<div class="list-group">
    @forelse ($users as $user)
        @include('users.components._item')
    @empty
        <p>No users</p>
    @endforelse
</div>