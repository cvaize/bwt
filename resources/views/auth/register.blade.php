@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center pt-3">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    {!! Form::open(['route' => 'register', 'method' => 'POST']) !!}

                        <div class="form-group row">
                            <label for="input_text_f-name" class="col-md-4 col-form-label text-md-right">Имя</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'text', 'name' => 'f_name', 'required' => true, 'autofocus' => true, 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="input_text_l-name" class="col-md-4 col-form-label text-md-right">Фамилия</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'text', 'name' => 'l_name', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="input_text_m-name" class="col-md-4 col-form-label text-md-right">Отчество</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'text', 'name' => 'm_name', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="sex" class="col-md-4 col-form-label text-md-right">Пол</label>

                            <div class="col-md-6">
                                @include('forms._select', ['name' => 'sex', 'formClass'=> 'mb-0', 'required' => true, 'list' => ['male' => 'Мужчина', 'female' => 'Женщина'], 'attributes'=> [ 'placeholder' => 'Выберите пол']])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="input_tel_phone" class="col-md-4 col-form-label text-md-right">Телефон</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'tel', 'class'=>'js-mask-phone', 'name' => 'phone', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="input_email_email" class="col-md-4 col-form-label text-md-right">Email</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'email', 'class'=>'', 'required' => true, 'name' => 'email', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="input_password_password" class="col-md-4 col-form-label text-md-right">Пароль</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'password', 'class'=>'', 'required' => true, 'name' => 'password', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="input_password_password-confirmation" class="col-md-4 col-form-label text-md-right">Повторите пароль</label>

                            <div class="col-md-6">
                                @include('forms._input', [ 'type' => 'password', 'class'=>'', 'required' => true, 'name' => 'password_confirmation', 'formClass' => 'mb-0' ])
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
