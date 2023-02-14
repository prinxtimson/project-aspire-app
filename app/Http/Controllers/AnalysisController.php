<?php

namespace App\Http\Controllers;

use Analytics;
use App\Exports\ReportsExport;
use App\Mail\AnalyticsReport;
use App\Models\Report;
use App\Models\User;
use App\Notifications\ReportShare;
use Carbon\Carbon;
use Maatwebsite\Excel\Excel;
use Spatie\Analytics\Period;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class AnalysisController extends Controller
{
    private $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($days)
    {
        $analyticsData = Analytics::fetchVisitorsAndPageViews(Period::days($days));

        return $analyticsData;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function bounce($days)
    {
        //
        $analyticsData = Analytics::performQuery(Period::days($days), 'ga:sessions',[
                'metrics' => 'ga:sessions,ga:bounces',
                'dimensions' => 'ga:date'
            ]);

        return response()->json($analyticsData);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function session_time($days)
    {
        $analyticsData = Analytics::performQuery(Period::days($days), 'ga:sessions', [
            'dimensions'=>'ga:date',
            'metrics' => 'ga:sessions,ga:sessionDuration'
        ]);

        return response()->json($analyticsData);
    }

    public function session_country($days)
    {
        $analyticsData = Analytics::performQuery(Period::days($days), 'ga:sessions', [
            'dimensions'=>'ga:country',
            'metrics'=>'ga:sessions',
            'sort'=>'-ga:sessions'
        ]);

        return response()->json($analyticsData);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($days)
    {
        $analyticsData = Analytics::fetchMostVisitedPages(Period::days($days), 20);

        return $analyticsData;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function user_type($days)
    {
        return Analytics::fetchUserTypes(Period::days($days));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function browser($days)
    {
        return Analytics::fetchTopBrowsers(Period::days($days), 20);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function download(Request $request) {
        $period = $request->period;
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new ReportsExport($period))->download('elintx_report_'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new ReportsExport($period))->download('elintx_report_'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new ReportsExport($period))->download('elintx_report_'.$date.'.'.$type, Excel::MPDF);
        }elseif($type == 'html'){
            return (new ReportsExport($period))->download('elintx_report_'.$date.'.'.$type, Excel::HTML);
        }          

    }

    public function email(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'report_id' => 'required|integer',
        ]);

        $email = $fields['email'];
        $report_id = $fields['report_id'];

        $report = Report::find($report_id);

        if($report){
            try{
                Mail::to($email)->send(new AnalyticsReport($report->name));

                $users = User::role('admin')->get();

                //Notification::send($users, new ReportShare($email));

                return ['msg' => 'Email had been sent'];
            }
            catch(\Exception $e){
                error_log($e);
                return response(['msg' => 'An error occur.'], 400);
            }

        }
        return response(['msg' => 'An error occur.'], 400);
        
    }
}