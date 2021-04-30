<?php


namespace App\Http\Services;


use Illuminate\Support\Facades\Validator;

class ProductValidatorService
{
    public function validate($data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|max:50|min:2',
            'size' => 'required',
            'observation' => 'required',
            'boarding_date' => 'required',
            'quantity' => 'required|integer',
            'mark_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }
    }
}
