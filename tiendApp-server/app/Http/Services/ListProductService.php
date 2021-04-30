<?php


namespace App\Http\Services;


use App\Http\Repositories\ProductRepository;

class ListProductService
{
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function list()
    {
        return $this->productRepository->allProductsActives();
    }
}
