<?php


namespace App\Http\Services;


use App\Http\Repositories\MarkRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CreateOrEditMarkService
{
    /**
     * @var MarkRepository
     */
    private $markRepository;

    public function __construct(MarkRepository $markRepository)
    {
        $this->markRepository = $markRepository;
    }

    /**
     * @throws \Exception
     */
    public function createOrEdit(array $data, $mark = null)
    {
        if (is_null($mark)) {
            $rule = Rule::unique('marks');
        } else {
            $rule = Rule::unique('marks')->ignore($mark->id);
        }
        $validator = Validator::make($data, [
            'name' => 'required|max:50|min:2',
            'reference' => [
                'required',
                $rule,
                'max:50',
                'min:2']
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $mark = $this->markRepository->createOrEdit($data['name'], $data['reference'], $mark);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }
        return $mark;
    }
}

