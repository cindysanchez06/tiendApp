<?php


namespace App\Http\Services;


use App\Http\Repositories\ProductRepository;
use App\Models\Product;

class DeleteProductService
{
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function delete(Product $product)
    {
        $this->productRepository->delete($product);
    }
}
