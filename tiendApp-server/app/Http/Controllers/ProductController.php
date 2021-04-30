<?php

namespace App\Http\Controllers;

use App\Http\Services\CreateOrEditProductService;
use App\Http\Services\DeleteProductService;
use App\Http\Services\ListProductService;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function create(Request $request, CreateOrEditProductService $createOrEditProductService)
    {
        $data = $request->only([
            'name',
            'size',
            'observation',
            'boarding_date',
            'quantity',
            'mark_id'
        ]);
        $result = ['status' => 200];
        try {
            $result['data'] = $createOrEditProductService->createOrEdit($data);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function list(ListProductService $listProductService)
    {
        $result = ['status' => 200];
        try {
            $result['data'] = $listProductService->list();
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function edit(Product $product,Request $request, CreateOrEditProductService $createOrEditProductService)
    {
        $data = $request->only([
            'name',
            'size',
            'observation',
            'boarding_date',
            'quantity',
            'mark_id'
        ]);
        $result = ['status' => 200];
        try {
            $result['data'] = $createOrEditProductService->createOrEdit($data, $product);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function delete(Product $product, DeleteProductService $deleteProductService)
    {
        $result = ['status' => 200];
        try {
            $deleteProductService->delete($product);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }
}
