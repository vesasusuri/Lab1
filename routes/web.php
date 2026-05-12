<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomePageContentController;
use App\Http\Controllers\HomePageSectionItemController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/hire-dashboard', 'welcome');
Route::view('/hire-dashboard/interviews', 'welcome');
Route::view('/hire-dashboard/hires', 'welcome');
Route::view('/hire-dashboard/analytics', 'welcome');
Route::view('/hire-dashboard/settings', 'welcome');
Route::view('/hire-dashboard/applications', 'welcome');
Route::view('/hire-dashboard/listings', 'welcome');
Route::view('/hire-dashboard/messages', 'welcome');
Route::view('/hire-dashboard/team', 'welcome');
Route::view('/admin-dashboard', 'welcome');
Route::view('/admin-dashboard/content', 'welcome');
Route::view('/admin-dashboard/users', 'welcome');
Route::view('/admin-dashboard/reports', 'welcome');
Route::view('/admin-dashboard/logs', 'welcome');
Route::view('/admin-dashboard/settings', 'welcome');
Route::view('/about-us', 'welcome');
Route::view('/companies', 'welcome');
Route::view('/companies/{any}', 'welcome')->where('any', '.*');
Route::view('/jobs', 'welcome');
Route::view('/contact-us', 'welcome');
Route::view('/pricing', 'welcome');
Route::view('/login', 'welcome')->name('login');
Route::view('/signup', 'welcome')->name('signup');
Route::view('/jobs/{any}', 'welcome');
Route::view('/dashboard', 'welcome');
Route::view('/profile', 'welcome');
Route::view('/applied-jobs', 'welcome');
Route::view('/unfinished-jobs', 'welcome');
Route::view('/saved-jobs', 'welcome');
Route::view('/interviews', 'welcome');
Route::view('/interviews/{roomName}', 'welcome');
Route::view('/messages', 'welcome');
Route::view('/resume', 'welcome');

Route::get('/api/home-page-content', [HomePageContentController::class, 'show']);
Route::get('/api/home-page-sections/media/{path}', [HomePageContentController::class, 'media'])->where('path', '.*');
Route::put('/api/admin/home-page-content', [HomePageContentController::class, 'update']);
Route::put('/api/admin/home-page-sections', [HomePageContentController::class, 'updateSections']);
Route::post('/api/admin/home-page-sections/upload-image', [HomePageContentController::class, 'uploadImage']);
Route::post('/api/admin/home-page-sections/{sectionKey}/items', [HomePageSectionItemController::class, 'store']);
Route::put('/api/admin/home-page-section-items/{item}', [HomePageSectionItemController::class, 'update']);
Route::delete('/api/admin/home-page-section-items/{item}', [HomePageSectionItemController::class, 'destroy']);

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth');
