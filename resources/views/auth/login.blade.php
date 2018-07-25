@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center pt-3">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    {!! Form::open(['route' => 'login', 'method' => 'POST']) !!}

                        <div class="form-group row">
                            <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'email', 'class'=>'', 'required' => true, 'autofocus' => true, 'name' => 'email', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Пароль</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'password', 'class'=>'', 'required' => true, 'name' => 'password', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                @include('forms._checkbox', [ 'label'=> 'Запомнить меня', 'class'=>'', 'name' => 'remember', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Войти
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Забыли пароль?
                                </a>
                            </div>
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
