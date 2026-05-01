<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/about-us', 'welcome');
Route::view('/companies', 'welcome');
Route::view('/jobs', 'welcome');
Route::view('/pricing', 'welcome');
Route::view('/login', 'welcome')->name('login');
Route::view('/signup', 'welcome')->name('signup');
Route::view('/jobs/{any}', 'welcome');
Route::view('/hire-dashboard', 'welcome');
Route::view('/hire-dashboard/interviews', 'welcome');
Route::view('/hire-dashboard/hires', 'welcome');
Route::view('/hire-dashboard/analytics', 'welcome');
Route::view('/hire-dashboard/settings', 'welcome');
Route::view('/hire-dashboard/applications', 'welcome');
Route::view('/hire-dashboard/listings', 'welcome');