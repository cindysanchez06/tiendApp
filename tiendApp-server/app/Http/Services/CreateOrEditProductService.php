<?php


namespace App\Http\Services;


use App\Http\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;

class CreateOrEditProductService
{
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var ProductValidatorService
     */
    private $productValidatorService;

    public function __construct(ProductRepository $productRepository, ProductValidatorService $productValidatorService)
    {
        $this->productRepository = $productRepository;
        $this->productValidatorService = $productValidatorService;
    }

    public function createOrEdit(array $data, $product = null)
    {
        $this->productValidatorService->validate($data);
        DB::beginTransaction();
        try {
            $product = $this->productRepository->createOrEdit(
                $data['name'],
                $data['size'],
                $data['observation'],
                $data['boarding_date'],
                $data['quantity'],
                $data['mark_id'],
                $product
            );
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }
        return $product;
    }
}
