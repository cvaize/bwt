@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">

                <div class="card">
                    <div class="card-header">Test</div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Word</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>@lang('administrator.search')</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>@lang('administrator.hi')</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>@lang('administrator.man')</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>@lang('administrator.woman')</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>@lang('administrator.translator')</td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>@lang('administrator.house')</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
@endsection
