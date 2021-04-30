<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarkRequest;
use App\Http\Services\CreateOrEditMarkService;
use App\Http\Services\DeleteMarkService;
use App\Http\Services\DeleteProductService;
use App\Http\Services\ListMarkService;
use App\Models\Mark;
use Symfony\Component\HttpFoundation\Request;


class MarkController extends Controller
{
    public function register(Request $request, CreateOrEditMarkService $createOrEditMarkService): \Illuminate\Http\JsonResponse
    {
        $data = $request->only([
            'name',
            'reference'
        ]);
        $result = ['status' => 200];
        try {
            $result['data'] = $createOrEditMarkService->createOrEdit($data);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function list(ListMarkService $listMarkService)
    {
        $result = ['status' => 200];
        try {
            $result['data'] = $listMarkService->list();
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function edit(Mark $mark, Request $request, CreateOrEditMarkService $createOrEditMarkService): \Illuminate\Http\JsonResponse
    {
        $data = $request->only([
            'name',
            'reference'
        ]);
        $result = ['status' => 200];
        try {
            $result['data'] = $createOrEditMarkService->createOrEdit($data, $mark);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function delete(Mark $mark, DeleteMarkService $deleteMarkService)
    {
        $result = ['status' => 200];
        try {
            $deleteMarkService->delete($mark);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }
}
