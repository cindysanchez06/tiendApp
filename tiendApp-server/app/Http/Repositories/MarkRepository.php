<?php


namespace App\Http\Repositories;


use App\Models\Mark;

class MarkRepository
{
    /**
     * @var Mark
     */
    protected $mark;

    public function __construct(Mark $mark)
    {
        $this->mark = $mark;
    }

    public function createOrEdit(string $name, string $reference, $mark)
    {
        if(is_null($mark))
        {
            $mark = new $this->mark;
            $mark->active = true;
        }
        $mark->name = $name;
        $mark->reference = $reference;
        $mark->save();
        return $mark;
    }

    public function allMarkActives()
    {
        return $this->mark::Where('active','=', true)->get();
    }

    public function delete($mark)
    {
        $mark->active = false;
        $mark->save();
    }
}
