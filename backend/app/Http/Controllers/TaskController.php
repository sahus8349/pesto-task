<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Enums\StatusEnum;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Exception;
use Helper;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        try {

            $request['sort_by'] = !empty($request['sort_by'])?explode(",",$request['sort_by']):['id','ASC'];

            $tasks = Task::orderBy($request['sort_by'][0],$request['sort_by'][1]);

            if(!empty($request['search'])){
                $tasks = $tasks->where(function ($query) use ($request) {
                    $query->whereRaw("LOWER(title) LIKE ?",[strtolower($request['search'])."%"]);
                });
            }

            if (empty($tasks->count())) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Tasks not found'], 404);
            }

            $tasks = $tasks->with(['user'])->paginate(20);

            $tasks = $tasks->toArray();

            return response()->json([
                'status'=>'success',
                'message'=>'Task found successfully',
                'data' => $tasks["data"],
                'meta'=>[
                    "current_page" => $tasks["current_page"],
                    "last_page" => $tasks["last_page"],
                    "total" => $tasks["total"],
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function enums()
    {   
        try {
            $status = StatusEnum::getOptions();

            return response()->json([
                'status'=>'success',
                'message'=>'Data found successfully',
                'data' => [
                    "status" => $status,
                    "status_options" => array_values($status),
                ],
            ], 200);

        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
        try {
            $data=$request->all();

            $validator = Validator::make($request->all(), [
                'title' => ['required'],
                'description' => ['required'],
                'status' => ['required'],
            ]);

            if ($validator->fails()) {
                return response()->json(['status'=>'error','error'=>'validation_errors','message'=>'Validation failed', 'validation_errors' => $validator->errors()], 400);
            }

            $data["created_by_id"] = auth()->user()->id;
            $task = Task::create($data);

            if (empty($task)) {
                return response()->json(['status'=>'error','error'=>'500','message' => 'Something went wrong, Server not responding'], 500);
            }

            return response()->json(['status'=>'success','message'=>'Task created successfully','data' => $task], 200);

        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
        try {
            $task = Task::find($id);

            if (empty($task)) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Task not found'], 404);
            }

            return response()->json(['status'=>'success','message'=>'Task found successfully','data' => $task], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {      
        try {
            $task = Task::find($id);
            
            if (!$task) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Task not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'title' => ['required'],
                'description' => ['required'],
                'status' => ['required'],
            ]);

            if ($validator->fails()) {
                return response()->json(['status'=>'error','error'=>'validation_errors','message'=>'Validation failed', 'validation_errors' => $validator->errors()], 400);
            }

            $result = $task->update($request->all());

            if (empty($result)) {
                return response()->json(['status'=>'error','error'=>'500','message' => 'Something went wrong, Server not responding'], 500);
            }

            return response()->json(['status'=>'success','message'=>'Task updated successfully','data' => $task], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Task not found'], 404);
            }

            $result = $task->delete();

            if (empty($result)) {
                return response()->json(['status'=>'error','error'=>'500','message' => 'Something went wrong, Server not responding'], 500);
            }

            return response()->json(['status'=>'success','message'=>'Task deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }   
    }
}
