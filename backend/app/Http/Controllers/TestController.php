<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index() {
        $arr = [1984, 1982, 1976, 1991, 1993, 1995, 1996, 1999, 2010, 2025, 2050];
        asort($arr);

        $current_year = 2024;

        $i = 0;
        $near = 0;
        while(!empty($arr[$i])){
            if($current_year <= $arr[$i]){
                break;
            }

            if($arr[$i] < $current_year){
                $near = $arr[$i];   
            }

            $i++;
        }

        echo $near;die;
    }
}
