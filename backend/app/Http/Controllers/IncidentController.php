<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Enums\StatusEnum;
use App\Enums\IncidentTypeEnum;
use App\Enums\PriorityEnum;
use App\Models\Incident;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Exception;
use Helper;

class IncidentController extends Controller
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

            $incidents = Incident::orderBy($request['sort_by'][0],$request['sort_by'][1]);

            if(!empty($request['search'])){
                $incidents = $incidents->where(function ($query) use ($request) {
                    $query->whereRaw("LOWER(incident_id) LIKE ?",[strtolower($request['search'])."%"]);
                });
            }

            $incidents = $incidents->where("reporter_id",auth()->user()->id);

            if (empty($incidents->count())) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Incidents not found'], 404);
            }

            $incidents = $incidents->with(['reporter'])->paginate(20);

            $incidents = $incidents->toArray();

            return response()->json([
                'status'=>'success',
                'message'=>'Incident found successfully',
                'data' => $incidents["data"],
                'meta'=>[
                    "current_page" => $incidents["current_page"],
                    "last_page" => $incidents["last_page"],
                    "total" => $incidents["total"],
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
            $incident_type = IncidentTypeEnum::getOptions();
            $priority = PriorityEnum::getOptions();

            return response()->json([
                'status'=>'success',
                'message'=>'Data found successfully',
                'data' => [
                    "status" => $status,
                    "status_options" => array_values($status),
                    "incident_type" => $incident_type,
                    "incident_type_options" => array_values($incident_type),
                    "priority" => $priority,
                    "priority_options" => array_values($priority),
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
                'incident_details' => ['required'],
                'incident_type' => ['required'],
                'priority' => ['required'],
                'status' => ['required'],
                'reported_date' => ['required'],
            ]);

            if ($validator->fails()) {
                return response()->json(['status'=>'error','error'=>'validation_errors','message'=>'Validation failed', 'validation_errors' => $validator->errors()], 400);
            }

            
            $data["incident_id"] = $this->generateId();
            $data["reporter_id"] = auth()->user()->id;
            $incident = Incident::create($data);

            if (empty($incident)) {
                return response()->json(['status'=>'error','error'=>'500','message' => 'Something went wrong, Server not responding'], 500);
            }

            return response()->json(['status'=>'success','message'=>'Incident created successfully','data' => $incident], 200);

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
            $incident = Incident::where("reporter_id",auth()->user()->id)->where('id',$id)->first();

            if (empty($incident)) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Incident not found'], 404);
            }

            return response()->json(['status'=>'success','message'=>'Incident found successfully','data' => $incident], 200);
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
            $incident = Incident::where("reporter_id",auth()->user()->id)->where('id',$id)->first();
            
            if (!$incident) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Incident not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'incident_details' => ['required'],
                'incident_type' => ['required'],
                'priority' => ['required'],
                'status' => ['required'],
                'reported_date' => ['required'],
            ]);

            if ($validator->fails()) {
                return response()->json(['status'=>'error','error'=>'validation_errors','message'=>'Validation failed', 'validation_errors' => $validator->errors()], 400);
            }

            $result = $incident->update($request->all());

            if (empty($result)) {
                return response()->json(['status'=>'error','error'=>'500','message' => 'Something went wrong, Server not responding'], 500);
            }

            return response()->json(['status'=>'success','message'=>'Incident updated successfully','data' => $incident], 200);
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
            $incident = Incident::where("reporter_id",auth()->user()->id)->where('id',$id)->first();

            if (!$incident) {
                return response()->json(['status'=>'error','error'=>'404','message' => 'Incident not found'], 404);
            }

            $result = $incident->delete();

            if (empty($result)) {
                return response()->json(['status'=>'error','error'=>'500','message' => 'Something went wrong, Server not responding'], 500);
            }

            return response()->json(['status'=>'success','message'=>'Incident deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>'error','error'=>'500','message' => $e->getMessage()], 500);
        }   
    }

    private function generateId(){
        $sufix = "RMG";
        $year = date("Y");
        $checkExist = 1;

        while(!empty($checkExist)){
            $random = rand(10000,99999);
            $id = $sufix.$random.$year;
            $checkExist = Incident::where('incident_id',$id);
            $checkExist = $checkExist->count();
        }

        return $id;
    }
}
