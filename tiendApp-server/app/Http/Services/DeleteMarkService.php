<?php


namespace App\Http\Services;


use App\Http\Repositories\MarkRepository;
use App\Http\Repositories\ProductRepository;
use App\Models\Mark;

class DeleteMarkService
{
    /**
     * @var MarkRepository
     */
    private $markRepository;
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function __construct(MarkRepository $markRepository, ProductRepository $productRepository)
    {
        $this->markRepository = $markRepository;
        $this->productRepository = $productRepository;
    }

    public function delete(Mark $mark)
    {
        $products = $this->productRepository->allProductsByMark($mark);
        if (count($products) == 0) {
            $this->markRepository->delete($mark);
        } else {
            throw new \InvalidArgumentException('La marca no se puede eliminar por que tiene productos asociados');
        }
    }
}
