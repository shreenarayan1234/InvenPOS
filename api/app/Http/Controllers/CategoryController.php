<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Manager\ImageUploadManager;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $categories = Category::with('user')->paginate(10);
            return response()->json($categories, 200);
        } catch (\Exception $e) {
            Log::error('Category index error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch categories'], 500);
        }
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        try {
            $categoryData = $request->validated();
            $categoryData['slug'] = Str::slug($request->input('slug'));
            $categoryData['user_id'] = $request->user()->id;

            if ($request->hasFile('photo')) {
                $file = $request->file('photo')->get();
                $name = Str::slug($request->input('slug'));
                $path = 'images/uploads/category/';
                $path_thumb = 'images/uploads/category_thumb/';

                $categoryData['photo'] = ImageUploadManager::uploadImage(
                    $name,
                    800,
                    800,
                    $path,
                    $file
                );

                ImageUploadManager::uploadImage(
                    $name,
                    150,
                    150,
                    $path_thumb,
                    $file
                );
            }

            $category = Category::create($categoryData);

            return response()->json([
                'message' => 'Category created successfully',
                'data' => $category
            ], 201);

        } catch (\Exception $e) {
            Log::error('Category store error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to create category',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // ... keep other methods (show, update, destroy) the same ...
}