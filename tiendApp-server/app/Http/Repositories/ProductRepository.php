<?php


namespace App\Http\Repositories;


use App\Models\Product;

class ProductRepository
{
    /**
     * @var Product
     */
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function createOrEdit(string $name, string $size, string $observation, $boardingDate, int $quantity, int $mark, $product)
    {
        if(is_null($product)){
            $product = new $this->product;
            $product->active = true;
        }
        $product->name = $name;
        $product->size = $size;
        $product->observation = $observation;
        $product->boarding_date = $boardingDate;
        $product->quantity = $quantity;
        $product->mark_id = $mark;
        $product->save();
        return $product;
    }

    public function allProductsActives(){
        return $this->product::Select('products.*','marks.name as mark')->join('marks','products.mark_id','=', 'marks.id')->where('products.active','=', true)->get();
    }

    public function delete($product)
    {
        $product->active = false;
        $product->save();
    }

    public function allProductsByMark($mark)
    {
        return $this->product::Where('mark_id','=', $mark->id)->join('')->get();
    }
}
