<?php

namespace App\Manager;

use Intervention\Image\Facades\Image;
use Exception;
use Illuminate\Support\Facades\Storage;

class ImageUploadManager
{
    public static function uploadImage(
        string $name,
        int $width,
        int $height,
        string $path,
        ?string $fileData
    ): ?string {
        if (!$fileData) {
            return null;
        }
        
        if (!extension_loaded('gd')) {
            // Save original file without processing if GD not available
            $fileName = $name . '.jpg';
            Storage::disk('public')->put($path . $fileName, base64_decode(explode(',', $fileData)[1]));
            return $path . $fileName;
        }
        try {
            // Create directory if it doesn't exist
            if (!Storage::disk('public')->exists($path)) {
                Storage::disk('public')->makeDirectory($path);
            }

            $imageName = $name . '.webp';
            $fullPath = $path . $imageName;

            // Handle both base64 and file paths
            $image = Image::make($fileData)
                ->fit($width, $height)
                ->encode('webp', 80);

            Storage::disk('public')->put($fullPath, $image);

            return $imageName;
        } catch (Exception $e) {
            throw new Exception('Image upload failed: ' . $e->getMessage());
        }
    }

    public static function deletePhoto(string $path, string $imageName): void
    {
        try {
            $fullPath = $path . $imageName;
            if (Storage::disk('public')->exists($fullPath)) {
                Storage::disk('public')->delete($fullPath);
            }
        } catch (Exception $e) {
            throw new Exception('Image deletion failed: ' . $e->getMessage());
        }
    }
}