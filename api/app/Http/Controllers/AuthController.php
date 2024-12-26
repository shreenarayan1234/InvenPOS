<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Handle user login and generate a token.
     *
     * @param \App\Http\Requests\AuthRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    final public function login(AuthRequest $request): JsonResponse
    {
        // Fetch user by email or phone
        $user = User::where('email', $request->input('email'))
            ->orWhere('phone', $request->input('phone'))
            ->first();

        // Validate credentials
        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user_data = [
                'token' => $user->createToken('AppToken')->plainTextToken, // Specify token name
                'id' => $user->id,  // Include the user ID
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'photo' => $user->photo,
                'role_id' => $user->role_id,
            ];

            return response()->json($user_data, 200);
        }

        // If credentials don't match, throw validation error
        throw ValidationException::withMessages([
            'credentials' => ['The provided credentials are incorrect.'],
        ]);
    }

    /**
     * Handle user logout by revoking all tokens.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $user = Auth::user();

        if ($user) {
            // Revoke all tokens
            $user->tokens->each(function ($token) {
                $token->delete();
            });

            return response()->json(['message' => 'Successfully logged out.'], 200);
        }

        return response()->json(['message' => 'No authenticated user found.'], 401);
    }
}
