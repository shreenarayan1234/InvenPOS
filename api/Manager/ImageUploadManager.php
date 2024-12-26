<?php

namespace App\Manager;

use Intervention\Image\Facades\Image;
use Exception;

class ImageUploadManager
{
    final public static function uploadImage(
        string $name,
        int $width,
        int $height,
        string $path,
        string $file
    ): string {
        $image_file_name = $name . '.webp';

        try {
            Image::make($file)
                ->fit($width, $height)
                ->save(public_path($path) . $image_file_name, 50, 'webp');
        } catch (Exception $e) {
            // Log the error or handle it as needed
            throw new Exception('Image upload failed: ' . $e->getMessage());
        }

        return $image_file_name;
    }

    final public static function deletePhoto(string $path, string $img): void
    {
        $full_path = public_path($path) . $img;

        if ($img !== '' && file_exists($full_path)) {
            try {
                unlink($full_path);
            } catch (Exception $e) {
                // Log the error or handle it as needed
                throw new Exception('Failed to delete image: ' . $e->getMessage());
            }
        }
    }
}
