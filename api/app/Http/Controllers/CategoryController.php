<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Manager\ImageUploadManager;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::paginate(10); // Pagination
        return response()->json($categories, 200);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
{
    try {
        $categoryData = $request->except('photo');
        $categoryData['slug'] = Str::slug($request->input('slug'));
        $categoryData['user_id'] = auth()->id;

        if ($request->has('photo')) {
            $file = $request->input('photo');
            $name = Str::slug($request->input('slug'));
            $path = 'images/uploads/category/';
            $path_thumb = 'images/uploads/category_thumb/';

            $categoryData['photo'] = ImageUploadManager::uploadImage($name, 800, 800, $path, $file);
            ImageUploadManager::uploadImage($name, 150, 150, $path_thumb, $file);
        }

        // Save category
        $category = Category::create($categoryData);

        return response()->json([
            'message' => 'Category created successfully.',
            'category' => $category,
        ], 201);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    public function show(Category $category): JsonResponse
    {
        return response()->json($category, 200);
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $categoryData = $request->validated();

        if ($request->has('photo')) {
            ImageUploadManager::deletePhoto('images/uploads/category/', $category->photo);
            ImageUploadManager::deletePhoto('images/uploads/category_thumb/', $category->photo);

            $file = $request->input('photo');
            $name = Str::slug($request->input('slug'));
            $path = 'images/uploads/category/';
            $path_thumb = 'images/uploads/category_thumb/';

            $categoryData['photo'] = ImageUploadManager::uploadImage($name, 800, 800, $path, $file);
            ImageUploadManager::uploadImage($name, 150, 150, $path_thumb, $file);
        }

        $category->update($categoryData);

        return response()->json([
            'message' => 'Category updated successfully.',
            'category' => $category,
        ], 200);
    }

    public function destroy(Category $category): JsonResponse
    {
        ImageUploadManager::deletePhoto('images/uploads/category/', $category->photo);
        ImageUploadManager::deletePhoto('images/uploads/category_thumb/', $category->photo);

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.',
        ], 200);
    }
}
