<?php

namespace App\Http\Controllers;

use App\Exports\BounceRateExport;
use App\Exports\DurationExport;
use App\Exports\PageVisitExport;
use App\Exports\UserTypeExport;
use App\Exports\VisitExport;
use App\Models\Report;
use Exception;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Maatwebsite\Excel\Excel;
use Spatie\Analytics\Period;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
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
    public function index()
    {
        $reports = Report::withTrashed()->orderBy('id', 'DESC')->with('user')->get();

        return $reports;
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
            $user = auth()->user();

            $fields = $request->validate([
                'format' => 'required|string',
                'period' => 'required',
                'type' => 'required|string',
            ]);
    
            $format = $fields['format'];
            $period = $fields['period'];
            $type = $fields['type'];
            $date = Carbon::now()->getTimestamp();
    
            $filename = str_replace('-', '_', $type) . '_report_'.$date.'.'.$format;

            switch($type)
            {
                case 'bounce-rate':
                    if($format == 'xlsx'){
                        $this->excel->store(new BounceRateExport($period), $filename, null, Excel::XLSX);
                    }elseif($format == 'csv'){
                        $this->excel->store(new BounceRateExport($period), $filename, null, Excel::CSV);
                    }elseif($format == 'pdf'){
                        $this->excel->store(new BounceRateExport($period), $filename, null, Excel::MPDF);
                    }elseif($format == 'html'){
                        $this->excel->store(new BounceRateExport($period), $filename, null, Excel::HTML);
                    }
                    break;
                case 'duration':
                    if($format == 'xlsx'){
                        $this->excel->store(new DurationExport($period), $filename, null, Excel::XLSX);
                    }elseif($format == 'csv'){
                        $this->excel->store(new DurationExport($period), $filename, null, Excel::CSV);
                    }elseif($format == 'pdf'){
                        $this->excel->store(new DurationExport($period), $filename, null, Excel::MPDF);
                    }elseif($format == 'html'){
                        $this->excel->store(new DurationExport($period), $filename, null, Excel::HTML);
                    }
                    break;
                case 'page-visit':
                    if($format == 'xlsx'){
                        $this->excel->store(new PageVisitExport($period), $filename, null, Excel::XLSX);
                    }elseif($format == 'csv'){
                        $this->excel->store(new PageVisitExport($period), $filename, null, Excel::CSV);
                    }elseif($format == 'pdf'){
                        $this->excel->store(new PageVisitExport($period), $filename, null, Excel::MPDF);
                    }elseif($format == 'html'){
                        $this->excel->store(new PageVisitExport($period), $filename, null, Excel::HTML);
                    }
                    break;
                case 'location':
                    if($format == 'xlsx'){
                        $this->excel->store(new UserTypeExport($period), $filename, null, Excel::XLSX);
                    }elseif($format == 'csv'){
                        $this->excel->store(new UserTypeExport($period), $filename, null, Excel::CSV);
                    }elseif($format == 'pdf'){
                        $this->excel->store(new UserTypeExport($period), $filename, null, Excel::MPDF);
                    }elseif($format == 'html'){
                        $this->excel->store(new UserTypeExport($period), $filename, null, Excel::HTML);
                    }
                    break;
                case 'user-type':
                default:
                    if($format == 'xlsx'){
                        $this->excel->store(new VisitExport($period), $filename, null, Excel::XLSX);
                    }elseif($format == 'csv'){
                        $this->excel->store(new VisitExport($period), $filename, null, Excel::CSV);
                    }elseif($format == 'pdf'){
                        $this->excel->store(new VisitExport($period), $filename, null, Excel::MPDF);
                    }elseif($format == 'html'){
                        $this->excel->store(new VisitExport($period), $filename, null, Excel::HTML);
                    }
                    break;
            }
    
            $report = $user->reports()->create([
                'name' => $filename,
                'file_extension' => $format,
                'file_url' => Storage::url($filename)
            ]);

            $report->refresh()->load(['user']);

            return $report;
            
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
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
        return Report::withTrashed()->find($id)->load(['user']);
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
        //
    }

    public function archived($id)
    {
        //
        $report = Report::find($id);

        $report->update([
            'is_archive' => 1
        ]);

        return ['message' => "Report archived successfully"];
    }

    public function trashed ($id)
    {
        $report = Report::withTrashed()->find($id);
      
        $report->delete();

        return response([
            'message' => 'Report had been trashed successfuly'
        ]);
    }

    public function restored ($id)
    {
        $report = Report::withTrashed()->find($id);
      
        $report->restore();

        $report->update([
            'is_archive' => 0
        ]);

        return response([
            'message' => 'Report had been restored successfuly'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $report = Report::withTrashed()->find($id);

        $report->forceDelete();

        return response([
            'message' => 'Report had been deleted successfuly'
        ]);
    }

    private function storeReport($period, $filename)
    {

    }
}
