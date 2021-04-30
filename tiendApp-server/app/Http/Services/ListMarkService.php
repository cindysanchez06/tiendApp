<?php


namespace App\Http\Services;


use App\Http\Repositories\MarkRepository;

class ListMarkService
{
    /**
     * @var MarkRepository
     */
    protected $markRepository;

    public function __construct(MarkRepository $markRepository)
    {
        $this->markRepository = $markRepository;
    }

    public function list()
    {
        return $this->markRepository->allMarkActives();
    }
}
